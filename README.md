# AI Code Reviewer

An AI-powered code review application built with React, Express, and Gemini.

## Live demo

Live demo: [code-review-unnatigupta153-u-dc94.vercel.app](https://code-review-unnatigupta153-u-dc94.vercel.app)

The Vercel deployment currently has Vercel Deployment Protection enabled, so you
must be signed in to the Vercel account to open it. Disable Deployment Protection
in Vercel project settings if the demo should be public for everyone.

## Local URLs

After starting both applications, open:

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend health check: [http://localhost:3000](http://localhost:3000)

> These are localhost links. They work only on the computer where the application is running; GitHub cannot host or expose a localhost server.

## Run locally

Start the backend:

```powershell
cd BackEnd
Copy-Item .env.example .env
# Add your Gemini API key to BackEnd/.env
npm install
npm start
```

Start the frontend in a second terminal:

```powershell
cd Frontend
npm install
npm run dev
```

The frontend sends review requests to `http://localhost:3000` by default. Set `VITE_API_URL` in `Frontend/.env` when using a different backend URL.

## Vercel environment setup

For the deployed API, add `GEMINI_API_KEY` and `GEMINI_MODEL` to the Vercel project's Production Environment Variables, then redeploy. The local `BackEnd/.env` file is intentionally ignored and is never committed.
