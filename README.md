# EventHire — Requirement Posting Flow

A full-stack multi-step form for posting event staffing requirements.

# Live Demo - https://event-hire-zeta.vercel.app/

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, React Hook Form
- **Backend**: Node.js, Express, MongoDB (Mongoose)

---

## Project Structure

```
event-hire/
├── backend/          # Express + MongoDB API
│   ├── models/       # Mongoose schemas
│   ├── routes/       # API route handlers
│   └── server.js     # Entry point
└── frontend/         # Next.js app
    └── src/
        ├── app/      # Pages (Next.js App Router)
        ├── components/
        │   ├── steps/   # Step 1–4 + Success screen
        │   └── ui/      # Reusable form controls
        ├── lib/      # API client
        └── types/    # TypeScript types
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB running locally (or a MongoDB Atlas URI)

---

### 1. Backend Setup

```bash
cd backend
npm install

# Copy and edit environment variables
cp .env.example .env
# Edit .env: set MONGODB_URI if needed

npm run dev   # starts on port 5000
```

The API will be available at `http://localhost:5000`.

**Endpoints:**

| Method | Path                    | Description                        |
|--------|-------------------------|------------------------------------|
| POST   | /api/requirements       | Create a new requirement           |
| GET    | /api/requirements       | List all (filter: ?category=planner\|performer\|crew) |
| GET    | /api/requirements/:id   | Get single requirement             |
| DELETE | /api/requirements/:id   | Delete a requirement               |
| GET    | /api/health             | Health check                       |

---

### 2. Frontend Setup

```bash
cd frontend
npm install

# Copy and edit environment variables
cp .env.local.example .env.local
# NEXT_PUBLIC_API_URL=http://localhost:5000

npm run dev   # starts on port 3000
```

Open `http://localhost:3000` in your browser.

---

## Flow Overview

| Step | Description |
|------|-------------|
| **Step 1** | Event basics: name, type, date/range, location, venue, and hiring category |
| **Step 2 & 3** | Category-specific fields (Planner / Performer / Crew) — dynamically rendered |
| **Step 4** | Review all details before final submission |
| **Success** | Confirmation screen with reference ID |

### Category-Specific Fields

**Planner** — Planner type, guest count, budget, services needed, urgency, contact preference

**Performer** — Performer type, genre, duration, headcount, equipment, budget, style

**Crew** — Crew type, headcount, shift duration, experience level, certifications, budget per person, uniform

---

## Data Model

All requirements are stored in a single MongoDB collection with a `category` field (`planner` | `performer` | `crew`) and nested sub-documents for `plannerDetails`, `performerDetails`, or `crewDetails`.

---

## Scripts

| Directory | Command | Description |
|-----------|---------|-------------|
| backend   | `npm run dev` | Start with nodemon (hot reload) |
| backend   | `npm start` | Production start |
| frontend  | `npm run dev` | Next.js dev server |
| frontend  | `npm run build` | Production build |
| frontend  | `npm start` | Serve production build |
