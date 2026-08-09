const express = require('express');
const aiRoutes = require('./routes/ai.routes')
const cors = require('cors')

const app = express()
const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:5173')
    .split(',')
    .map(origin => origin.trim())
    .filter(Boolean)
const requestCounts = new Map()
const RATE_LIMIT = 30
const RATE_WINDOW_MS = 60 * 1000

app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
}))

app.use(express.json({ limit: '100kb' }))

app.use((req, res, next) => {
    const now = Date.now()
    const clientKey = req.ip
    const record = requestCounts.get(clientKey)

    if (!record || now - record.startedAt >= RATE_WINDOW_MS) {
        requestCounts.set(clientKey, { startedAt: now, count: 1 })
        return next()
    }

    record.count += 1
    if (record.count > RATE_LIMIT) {
        return res.status(429).json({ error: 'Too many requests. Please try again later.' })
    }

    next()
})

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.use('/ai', aiRoutes)

app.use((error, req, res, next) => {
    if (error.type === 'entity.too.large') {
        return res.status(413).json({ error: 'Request body is too large' })
    }
    if (error instanceof SyntaxError && error.status === 400 && error.body) {
        return res.status(400).json({ error: 'Invalid JSON body' })
    }
    next(error)
})

app.use((error, req, res, next) => {
    console.error('Unhandled server error:', error)
    res.status(500).json({ error: 'Internal server error' })
})

module.exports = app
