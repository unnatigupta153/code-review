import { useState } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios'
import './App.css'

function App() {
  const [ code, setCode ] = useState(` function sum() {
  return 1 + 1
}`)

  const [ review, setReview ] = useState(``)
  const [ loading, setLoading ] = useState(false)
  const [ error, setError ] = useState('')

  async function reviewCode() {
    if (!code.trim()) {
      setError('Please enter some code to review.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const apiUrl = import.meta.env.VITE_API_URL || '/api'
      const response = await axios.post(`${apiUrl}/ai/get-review`, { code })
      setReview(response.data.review || response.data)
    } catch (requestError) {
      setError(requestError.response?.data?.error || 'Unable to review code. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%"
              }}
            />
          </div>
          <button
            type="button"
            onClick={reviewCode}
            className="review"
            disabled={loading}
          >{loading ? 'Reviewing...' : 'Review'}</button>
        </div>
        <div className="right">
          {error && <p className="error" role="alert">{error}</p>}
          {!review && !error && <p className="placeholder">Your review will appear here.</p>}
          <Markdown

            rehypePlugins={[ rehypeHighlight ]}

          >{review}</Markdown>
        </div>
      </main>
    </>
  )
}



export default App
