# Cyberpunk Portfolio Frontend

A modern React + TypeScript portfolio frontend with a cyberpunk design system, animated UI, and Three.js scenes. It consumes the Django REST Framework API at `VITE_API_BASE_URL`.

## Screenshots

Add screenshots here after connecting live backend data.

## Tech Stack

- Vite
- React 18 + TypeScript strict mode
- Three.js, React Three Fiber, Drei, Postprocessing
- React Router v6
- TanStack React Query v5 + Axios
- React Hook Form + Zod
- Tailwind CSS v3
- Framer Motion
- Lucide React

## Setup

```bash
npm install
cp .env.example .env.development
npm run dev
```

The backend should be running at:

```bash
http://localhost:8000/api/v1
```

Update `.env.development` if your Django API runs elsewhere:

```bash
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

## Project Structure

```text
frontend/
├── public/
│   └── favicon.svg
├── src/
│   ├── lib/
│   │   ├── api/
│   │   ├── hooks/
│   │   └── utils/
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   └── three/
│   ├── features/
│   │   ├── home/
│   │   ├── about/
│   │   ├── projects/
│   │   ├── skills/
│   │   └── contact/
│   ├── routes/
│   └── styles/
└── vite.config.ts
```

## Build

```bash
npm run lint
npm run build
npm run preview
```

The production build outputs to `dist/`. Deploy `dist/` to any static host and configure `VITE_API_BASE_URL` for the target backend.

## Vercel Deployment

This frontend includes `vercel.json` for SPA route rewrites.

Set these environment variables in Vercel:

```bash
VITE_API_BASE_URL=https://your-backend-domain.onrender.com/api/v1
VITE_PORTFOLIO_USERNAME=aamir
```

See [`DEPLOYMENT.md`](../DEPLOYMENT.md) for the paired backend setup.
