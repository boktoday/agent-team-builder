# Agent Team Builder

**$99 SaaS** — Build custom AI agent ecosystems and export to GitHub

---

## 🚀 Quick Deploy

### Option 1: Vercel (Frontend + Supabase)

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create free project
   - Run `backend/supabase-schema.sql` in SQL Editor

2. **Deploy Frontend to Vercel**
   ```bash
   npm i -g vercel
   vercel
   ```

3. **Set Environment Variables**
   ```
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

### Option 2: Local Development

```bash
# Frontend
cd agent-team-builder
npm install
npm run dev

# Backend (separate terminal)
cd backend
npm install
mkdir -p data
npm start
```

---

## 📦 What's Included

| Directory | Purpose |
|-----------|---------|
| `src/` | React frontend |
| `backend/` | Express + SQLite (local) |
| `api/` | Vercel API routes |
| `logic/` | Agent recommendation engine |

---

## 🔧 Configuration

### Supabase (Production)

```bash
# Environment variables
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=eyJxxx
```

### SQLite (Local Dev)

No configuration needed — database auto-creates at `backend/data/agent-builder.db`

---

## 💰 Payment

- **$99 one-time** — Stripe integration ready
- Simulated payment for testing
- Replace with real Stripe in production

---

## 🔐 GitHub Export

Users provide their own GitHub token (30-day expiry):

1. Settings → Developer settings
2. Personal access tokens → Tokens (classic)
3. Generate with `repo` scope
4. Set expiration to 30 days

---

## 📝 Tech Stack

- **Frontend:** React + TypeScript + Tailwind + Vite
- **Backend:** Express + SQLite (local) / Supabase (production)
- **Database:** SQLite (dev) / Supabase (prod)
- **Deploy:** Vercel

---

## API Endpoints (Backend)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/register` | POST | Sign up (30-day trial) |
| `/api/auth/login` | POST | Login |
| `/api/projects` | GET/POST | List/Create projects |
| `/api/answers` | POST | Save answers |
| `/api/agents/select` | POST | Select agent |
| `/api/checkout` | POST | Process payment |
| `/api/export` | POST | Export to GitHub |

---

Made with ❤️ for AI-powered teams
