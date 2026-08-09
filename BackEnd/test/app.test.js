const test = require('node:test')
const assert = require('node:assert/strict')
const app = require('../src/app')

let server
let baseUrl

test.before(() => {
    server = app.listen(0)
    const { port } = server.address()
    baseUrl = `http://127.0.0.1:${port}`
})

test.after(() => server.close())

test('health endpoint responds', async () => {
    const response = await fetch(`${baseUrl}/`)
    assert.equal(response.status, 200)
    assert.equal(await response.text(), 'Hello World')
})

test('rejects an empty code review request', async () => {
    const response = await fetch(`${baseUrl}/ai/get-review`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ code: '   ' })
    })
    assert.equal(response.status, 400)
    assert.deepEqual(await response.json(), { error: 'Code is required' })
})

test('rejects code larger than the supported limit', async () => {
    const response = await fetch(`${baseUrl}/ai/get-review`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ code: 'x'.repeat(50001) })
    })
    assert.equal(response.status, 413)
})

test('rejects malformed JSON', async () => {
    const response = await fetch(`${baseUrl}/ai/get-review`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: '{invalid'
    })
    assert.equal(response.status, 400)
    assert.deepEqual(await response.json(), { error: 'Invalid JSON body' })
})
