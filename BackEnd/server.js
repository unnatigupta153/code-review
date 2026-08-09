require('dotenv').config()
const app = require('./src/app')



const port = Number(process.env.PORT) || 3000;

const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})

function shutdown(signal) {
    console.log(`${signal} received. Closing server...`)
    server.close(() => process.exit(0))
}

process.on('SIGINT', () => shutdown('SIGINT'))
process.on('SIGTERM', () => shutdown('SIGTERM'))
