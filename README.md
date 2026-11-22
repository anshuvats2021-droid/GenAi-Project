# Downbot

Downbot is a full-stack authentication starter for an AI workspace. It currently includes account registration, sign-in, session restore, and sign-out.

## Stack

- React + Vite, Tailwind CSS, Redux Toolkit, and Axios
- Express 5 API in JavaScript
- SQLite user storage, bcrypt password hashes, and signed HttpOnly session cookies (pure-JavaScript SQLite runtime)
- Vite development proxy for `/api` (no CORS configuration needed)

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Run locally

```sh
npm install
Copy-Item .env.example .env
npm run dev
```

The client runs at `http://localhost:5173` and proxies API requests to `http://localhost:3001`. SQLite data is stored in `data/downbot.sqlite`.

For production, set `JWT_SECRET` to a unique random value of at least 32 characters, set `NODE_ENV=production`, and provide a persistent `DATABASE_PATH`. Build the frontend with `npm run build`; run the API with `npm start`.

## API

- `POST /api/auth/register` — create an account and sign in
- `POST /api/auth/login` — sign in
- `POST /api/auth/logout` — clear the session cookie
- `GET /api/auth/me` — restore the current session
- `GET /api/health` — health check

Each feature follows the frontend layers: `api` for Axios, `state` for Redux, `hooks` for feature state/actions, and `ui` for pages and components.

The authentication UI uses React Router (`react-router`) with separate `/login` and `/register` pages.
