# Agent Team Builder - Backend Architecture Specification

## Project Overview

**Project Name:** Agent Team Builder SaaS  
**Tech Stack:** Node.js + Express + SQLite  
**Purpose:** Multi-step form wizard that helps users build custom AI agent ecosystems, exportable to GitHub

---

## 1. Database Schema

### 1.1 Users Table

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT,
  github_token TEXT,           -- User provides this for export (30-day token they create)
  github_username TEXT,
  plan TEXT DEFAULT 'trial',   -- 'trial', 'paid'
  trial_expires_at DATETIME,  -- 30 days from signup
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### 1.2 Projects/Ecosystems Table

```sql
CREATE TABLE projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'in_progress',  -- in_progress, paid, exported
  current_step INTEGER DEFAULT 1,
  total_steps INTEGER DEFAULT 5,
  payment_id INTEGER,
  amount_paid REAL DEFAULT 0,
  paid_at DATETIME,
  github_repo_url TEXT,
  github_repo_name TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (payment_id) REFERENCES payments(id)
);
```

### 1.3 Questions Table

```sql
CREATE TABLE questions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  step_number INTEGER NOT NULL,
  question_key TEXT UNIQUE NOT NULL,  -- e.g., "industry", "team_size"
  question_text TEXT NOT NULL,
  question_type TEXT NOT NULL,        -- select, multi_select, text
  options TEXT,                       -- JSON array of options
  is_required INTEGER DEFAULT 1,
  order_index INTEGER DEFAULT 0
);
```

### 1.4 Answers Table

```sql
CREATE TABLE answers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id INTEGER NOT NULL,
  question_id INTEGER NOT NULL,
  answer_value TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id),
  FOREIGN KEY (question_id) REFERENCES questions(id),
  UNIQUE(project_id, question_id)
);
```

### 1.5 Selected Agents Table

```sql
CREATE TABLE selected_agents (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id INTEGER NOT NULL,
  agent_id TEXT NOT NULL,              -- e.g., "researcher-v1", "writer-v1"
  agent_name TEXT NOT NULL,
  agent_role TEXT,                     -- e.g., "Research", "Writing", "Analysis"
  config JSON,                          -- Custom config for this agent
  is_required INTEGER DEFAULT 0,       -- User explicitly selected
  is_recommended INTEGER DEFAULT 1,    -- System recommended
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id)
);
```

### 1.6 Payments Table

```sql
CREATE TABLE payments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  project_id INTEGER,
  stripe_payment_intent_id TEXT UNIQUE,
  stripe_customer_id TEXT,
  amount INTEGER NOT NULL,             -- In cents
  currency TEXT DEFAULT 'usd',
  status TEXT DEFAULT 'pending',       -- pending, succeeded, failed, refunded
  payment_method TEXT,
  receipt_url TEXT,
  metadata JSON,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  completed_at DATETIME,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (project_id) REFERENCES projects(id)
);
```

---

## 2. API Endpoints

### 2.0 Authentication Endpoints

### 2.0.1 POST /api/auth/register - User Registration (30-day Trial)

**Purpose:** Create new user account with 30-day trial

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "plan": "trial",
    "trialExpiresAt": "2024-02-15T10:00:00Z"
  },
  "message": "Account created! You have 30 days to export your agent team."
}
```

### 2.0.2 POST /api/auth/login - User Login

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "plan": "trial",
    "trialExpiresAt": "2024-02-15T10:00:00Z",
    "daysRemaining": 25
  },
  "token": "jwt-token-here"
}
```

### 2.0.3 POST /api/github/token - Add GitHub Token

**Purpose:** User provides their GitHub token (30-day expiry) for export

**Request Body:**
```json
{
  "githubToken": "ghp_xxxxxxxxxxxxx"
}
```

**Response:**
```json
{
  "success": true,
  "message": "GitHub token saved. You can now export your agent team."
}
```

**Instructions shown to user:**
> To create a GitHub token with 30-day expiry:
> 1. Go to GitHub.com → Settings → Developer settings
> 2. Click "Personal access tokens" → "Tokens (classic)"
> 3. Click "Generate new token"
> 4. Select scopes: `repo` and `workflow`
> 5. Set expiration to 30 days
> 6. Copy and paste the token above

### 2.1 POST /api/start - Create New Project

**Purpose:** Initialize a new project/ecosystem

**Request Body:**
```json
{
  "userId": 1,
  "name": "My AI Team",
  "description": "Marketing automation agents"
}
```

**Response:**
```json
{
  "success": true,
  "project": {
    "id": 1,
    "name": "My AI Team",
    "description": "Marketing automation agents",
    "status": "in_progress",
    "currentStep": 1,
    "totalSteps": 5,
    "createdAt": "2024-01-15T10:00:00Z"
  }
}
```

### 2.2 POST /api/answer - Save Answer

**Purpose:** Store user's answer to a question

**Request Body:**
```json
{
  "projectId": 1,
  "questionId": 1,
  "answerValue": "marketing"
}
```

**Response:**
```json
{
  "success": true,
  "answer": {
    "id": 1,
    "projectId": 1,
    "questionId": 1,
    "answerValue": "marketing"
  },
  "nextStep": 2
}
```

### 2.3 GET /api/preview - Get Recommended Agents

**Purpose:** Get AI agent recommendations based on answers

**Query Parameters:**
- `projectId` (required)

**Response:**
```json
{
  "success": true,
  "agents": [
    {
      "agentId": "researcher-v1",
      "agentName": "Market Researcher",
      "agentRole": "Research",
      "description": "Gathers market data and competitor intelligence",
      "isRecommended": true,
      "reason": "Based on your marketing focus"
    },
    {
      "agentId": "writer-v1",
      "agentName": "Content Writer",
      "agentRole": "Writing",
      "description": "Creates compelling marketing copy",
      "isRecommended": true,
      "reason": "Matches your content creation needs"
    }
  ],
  "allAvailableAgents": 68
}
```

### 2.4 POST /api/checkout - Create Payment

**Purpose:** Initialize Stripe checkout for $99 payment

**Request Body:**
```json
{
  "projectId": 1,
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "checkoutUrl": "https://checkout.stripe.com/...",
  "paymentIntentId": "pi_xxx",
  "expiresAt": "2024-01-15T11:00:00Z"
}
```

**Post-Payment Webhook:**
```sql
-- Updates project status after successful payment
UPDATE projects 
SET status = 'paid', 
    payment_id = ?,
    amount_paid = 9900,
    paid_at = CURRENT_TIMESTAMP 
WHERE id = ?;
```

### 2.5 POST /api/export - Generate GitHub Repo

**Purpose:** Generate and push GitHub repository with agent ecosystem

**Request Body:**
```json
{
  "projectId": 1,
  "repoName": "my-ai-marketing-team",
  "isPrivate": true,
  "selectedAgents": ["researcher-v1", "writer-v1", "analytics-v1"]
}
```

**Response:**
```json
{
  "success": true,
  "repoUrl": "https://github.com/user/my-ai-marketing-team",
  "repoName": "my-ai-marketing-team",
  "filesCreated": [
    "README.md",
    "main.py",
    "agents/researcher/agent.py",
    "agents/writer/agent.py",
    "agents/analytics/agent.py",
    "requirements.txt",
    "docker-compose.yml",
    ".env.example"
  ],
  "exportedAt": "2024-01-15T10:30:00Z"
}
```

### 2.6 GET /api/download - Download as ZIP

**Purpose:** Download the generated agent ecosystem as a ZIP file

**Query Parameters:**
- `projectId` (required)

**Response:** Binary ZIP file with headers:
```
Content-Type: application/zip
Content-Disposition: attachment; filename="my-ai-team.zip"
```

---

## 3. GitHub Export Logic

### 3.1 Exported Repository Structure

```
my-ai-team/
├── README.md                    # Generated documentation
├── main.py                      # Entry point / orchestration
├── requirements.txt             # Python dependencies
├── docker-compose.yml           # Container setup
├── .env.example                  # Environment variables template
├── config/
│   └── agents.yaml              # Agent configurations
├── agents/
│   ├── researcher-v1/
│   │   ├── __init__.py
│   │   ├── agent.py             # Main agent logic
│   │   ├── prompts.py           # System prompts
│   │   └── config.yaml          # Agent-specific config
│   ├── writer-v1/
│   │   ├── __init__.py
│   │   ├── agent.py
│   │   ├── prompts.py
│   │   └── config.yaml
│   └── [other selected agents]/
├── utils/
│   ├── __init__.py
│   ├── llm_client.py            # OpenAI/Anthropic wrapper
│   ├── memory.py                # Agent memory management
│   └── tools.py                 # Shared tools
└── tests/
    ├── test_agents.py
    └── test_integration.py
```

### 3.2 Files to Include (by Answer Type)

| Answer Value | Additional Files |
|--------------|------------------|
| `industry: marketing` | `agents/seo-specialist/`, `agents/social-media-manager/` |
| `industry: coding` | `agents/code-reviewer/`, `agents/debugger/` |
| `industry: finance` | `agents/analyst/`, `agents/report-generator/` |
| `needs: data_analysis` | `utils/data_processor.py`, `agents/data-analyst/` |
| `needs: research` | `agents/web-scraper/`, `utils/research_tools.py` |
| `team_size: large` | `utils/task_queue.py`, `config/worker_config.yaml` |

### 3.3 Customization Based on Answers

**In main.py:**
```python
# Customize based on user answers
TEAM_CONFIG = {
    "industry": answers.get("industry"),      # e.g., "marketing"
    "team_size": answers.get("team_size"),    # e.g., "small"
    "primary_goal": answers.get("goal"),      # e.g., "automation"
    "agents": selected_agents
}
```

**In agent prompts:**
```python
# Industry-specific prompt customization
SYSTEM_PROMPTS = {
    "marketing": "You are a marketing AI agent specializing in...",
    "finance": "You are a financial AI agent specializing in...",
    "coding": "You are a software development AI agent..."
}
```

**In config/agents.yaml:**
```yaml
agents:
  researcher-v1:
    model: gpt-4
    temperature: 0.7
    max_tokens: 2000
    # Customize based on user's budget preference
    budget_tier: {{answers.budget_tier}}  # "starter", "pro", "enterprise"
```

### 3.4 Agent Selection Logic

**Pre-built Agent Categories (68 agents):**

| Category | Count | Examples |
|----------|-------|----------|
| Research | 8 | Web Scraper, Competitor Analyst, Market Researcher |
| Writing | 12 | Content Writer, Copywriter, Technical Writer |
| Analysis | 10 | Data Analyst, Financial Analyst, SEO Analyst |
| Coding | 10 | Code Reviewer, Bug Hunter, Documentation Generator |
| Marketing | 8 | Social Media Manager, Email Marketer, SEO Specialist |
| Support | 6 | Customer Support, FAQ Generator, Ticket Classifier |
| Productivity | 8 | Calendar Manager, Task Prioritizer, Meeting Summarizer |
| Creative | 6 | Image Generator, Video Script Writer, Brand Designer |

**Recommendation Algorithm:**
1. Map answer values to agent tags
2. Score each agent based on tag matches
3. Return top N agents sorted by score
4. Include mandatory agents (always selected)

---

## 4. Integration Notes

### 4.1 Required Environment Variables

```bash
# Database
DATABASE_PATH=./data/agent-builder.db

# Stripe
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
STRIPE_PRICE_ID=price_xxx

# GitHub
GITHUB_APP_ID=xxx
GITHUB_APP_PRIVATE_KEY="-----BEGIN RSA..."

# App
PORT=3000
FRONTEND_URL=http://localhost:5173
```

### 4.2 Key Middleware

- `authMiddleware` - Validate user session
- `projectAccessMiddleware` - Ensure user owns the project
- `paymentRequiredMiddleware` - Block export unless paid

### 4.3 Webhook Handlers

- `POST /webhooks/stripe` - Payment confirmation
- `POST /webhooks/github` - Repo creation status (optional)

---

## 5. Sample Answer Flow

**Step 1:** Industry Selection
- Question: "What industry are you in?"
- Answer: "marketing"

**Step 2:** Team Size
- Question: "How large is your team?"
- Answer: "5-10"

**Step 3:** Primary Goals
- Question: "What are your main goals?" (multi-select)
- Answer: ["content_creation", "lead_generation", "analytics"]

**Step 4:** Budget Tier
- Question: "What's your budget tier?"
- Answer: "pro"

**Step 5:** Agent Selection
- Display recommended agents based on previous answers
- Allow user to add/remove agents

---

## 6. Payment Flow

```
User completes wizard
       ↓
POST /api/checkout → Stripe Checkout Session
       ↓
User pays $99 on Stripe
       ↓
Stripe Webhook → Update project status to "paid"
       ↓
User can now POST /api/export
       ↓
GitHub repo created → Update project with repo URL
```

---

## 7. Error Handling

| Status Code | Scenario |
|-------------|----------|
| 400 | Invalid input / missing fields |
| 401 | Unauthorized |
| 402 | Payment required |
| 403 | Access denied to resource |
| 404 | Project/agent not found |
| 429 | Rate limited |
| 500 | Internal server error |
