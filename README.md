# CA Monk Blog Application (Monorepo)

A modern blog application built as part of the CA Monk Frontend Internship assignment.
This project demonstrates clean React architecture, TypeScript usage, API integration,
and modern UI practices.

---

## Overview

This is a **Blog App** that connects to a **JSON Server** backend (`db.json`) and supports:

- **Get all blogs**: fetches and displays blog cards from `GET /blogs`
- **Get blog by id**: shows a single blog from `GET /blogs/:id`
- **Create blog**: creates a new blog via `POST /blogs` and refreshes the list (query invalidation)

Blog **content is plain text** (no HTML formatting required).

## Tech stack

- **React + TypeScript**
- **TanStack Query** for server state and caching
- **React Router** for routing
- **Tailwind CSS (v3)** for styling
- **shadcn-style UI primitives** (Button/Card/Input/Badge/Skeleton)

## Routes

- **`/blogs`**: blog list (left) + placeholder detail (right)
- **`/blogs/:id`**: blog list (left) + selected blog detail (right)
- **`/new`**: create new blog form

## API (JSON Server)

The backend runs on: **`http://localhost:3001`**

Endpoints:

- **GET `/blogs`**: get all blogs
- **GET `/blogs/:id`**: get a blog by id
- **POST `/blogs`**: create a blog

Sample blog shape:

```json
{
  "id": "1",
  "title": "Future of Fintech",
  "category": ["FINANCE", "TECH"],
  "description": "Exploring how AI and blockchain are reshaping financial services",
  "date": "2026-01-11T09:12:45.120Z",
  "coverImage": "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg",
  "content": "Full blog content..."
}
```

## How data fetching works (TanStack Query)

TanStack Query hooks are implemented in:

- `src/features/blogs/queries.ts`

Key behavior:

- **Blog list** uses a query key like `['blogs']`
- **Blog detail** uses a query key like `['blogs', id]`
- **Create blog** uses a mutation and on success:
  - **invalidates** `['blogs']` so the list refetches
  - **seeds** the detail cache for the created blog

## UI behavior

- **Loading states**: shows skeletons while fetching
- **Error states**: shows retry actions for failed requests
- **Responsive layout**:
  - On large screens, the app shows a split layout (list left, details right)
  - On small screens, content stacks vertically

## Scripts

- **`npm run dev`**: start the Vite dev server
- **`npm run server`**: start JSON Server on port 3001
- **`npm run build`**: typecheck + build
- **`npm run typecheck`**: TypeScript project build
- **`npm run lint`**: ESLint

## Running the app locally

Install deps:

```bash
npm install
```

Start the API (terminal 1):

```bash
npm run server
```

Start the frontend (terminal 2):

```bash
npm run dev
```

Open the URL printed by Vite (usually `http://localhost:5173`, or the next available port).

## Project structure

Key folders/files:

- **`db.json`**: JSON Server database (blogs data)
- **`src/api/`**: typed fetch helpers and blog API functions
- **`src/features/blogs/`**: blog feature (queries, pages, components)
- **`src/components/ui/`**: reusable UI primitives
- **`src/components/layout/`**: app shell layout (header/footer)

## 🧱 Monorepo Structure

