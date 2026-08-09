# AI Code Reviewer

An AI-powered code review application built with React, Express, and Gemini.

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
