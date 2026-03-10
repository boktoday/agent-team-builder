# Agent Team Builder - Backend

Express + SQLite backend for the Agent Team Builder SaaS.

## Quick Start

```bash
cd backend
npm install
mkdir -p data
npm start
```

Server runs on `http://localhost:3001`

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Create account (30-day trial) |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/me` | Get current user |

### GitHub

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/github/token` | Save GitHub token for export |

### Projects

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/projects` | Create new project |
| GET | `/api/projects` | List user projects |
| GET | `/api/projects/:id` | Get project details |

### Answers

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/answers` | Save answer to question |

### Agents

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/agents/select` | Select an agent |
| DELETE | `/api/agents/:projectId/:agentId` | Remove agent |
| GET | `/api/agents/:projectId` | Get selected agents |

### Payment

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/checkout` | Process $99 payment |

## Database

SQLite database at `data/agent-builder.db` (auto-created on first run).

### Schema

- **users** - User accounts with trial expiry
- **projects** - Agent ecosystem projects
- **answers** - User responses to questions
- **selected_agents** - Chosen agents per project
- **payments** - Payment records

## Environment Variables

```bash
PORT=3001
JWT_SECRET=your-secret-key
```

## Payment Flow

1. User completes onboarding (free)
2. User clicks "Pay $99"
3. POST `/api/checkout` processes payment
4. Project status changes to "paid"
5. User can export to GitHub

## GitHub Export

Users provide their own GitHub token (30-day expiry). Instructions shown in-app:

1. Go to GitHub → Settings → Developer settings
2. Personal access tokens → Tokens (classic)
3. Generate new token with `repo` scope
4. Set expiration to 30 days
5. Paste token in app

## Production Notes

- Change `JWT_SECRET` to a secure random string
- Add Stripe integration for real payments
- Add HTTPS in production
- Consider rate limiting
- Add email verification
