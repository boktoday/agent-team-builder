import Database from 'better-sqlite3';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';

const db = new Database('./data/agent-builder.db');

// Initialize database tables
db.exec(`
  -- Users table
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT,
    github_token TEXT,
    github_username TEXT,
    plan TEXT DEFAULT 'trial',
    trial_expires_at TEXT,
    is_active INTEGER DEFAULT 1,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
  );

  -- Projects/Ecosystems table
  CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'in_progress',
    current_step INTEGER DEFAULT 1,
    total_steps INTEGER DEFAULT 8,
    payment_id TEXT,
    amount_paid REAL DEFAULT 0,
    paid_at TEXT,
    github_repo_url TEXT,
    github_repo_name TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  -- Answers table
  CREATE TABLE IF NOT EXISTS answers (
    id TEXT PRIMARY KEY,
    project_id TEXT NOT NULL,
    question_key TEXT NOT NULL,
    answer_value TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (project_id) REFERENCES projects(id)
  );

  -- Selected Agents table
  CREATE TABLE IF NOT EXISTS selected_agents (
    id TEXT PRIMARY KEY,
    project_id TEXT NOT NULL,
    agent_id TEXT NOT NULL,
    agent_name TEXT NOT NULL,
    agent_category TEXT,
    is_required INTEGER DEFAULT 0,
    is_recommended INTEGER DEFAULT 1,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (project_id) REFERENCES projects(id)
  );

  -- Payments table
  CREATE TABLE IF NOT EXISTS payments (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    project_id TEXT,
    amount INTEGER NOT NULL,
    currency TEXT DEFAULT 'usd',
    status TEXT DEFAULT 'pending',
    payment_method TEXT,
    stripe_payment_intent_id TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    completed_at TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (project_id) REFERENCES projects(id)
  );
`);

console.log('✅ Database initialized');

// Helper functions
export function createUser(email, password, name) {
  const id = uuidv4();
  const password_hash = bcrypt.hashSync(password, 10);
  const trial_expires_at = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
  
  const stmt = db.prepare(`
    INSERT INTO users (id, email, password_hash, name, trial_expires_at)
    VALUES (?, ?, ?, ?, ?)
  `);
  
  stmt.run(id, email, password_hash, name, trial_expires_at);
  return { id, email, name, plan: 'trial', trial_expires_at };
}

export function verifyUser(email, password) {
  const stmt = db.prepare('SELECT * FROM users WHERE email = ? AND is_active = 1');
  const user = stmt.get(email);
  
  if (!user) return null;
  
  const valid = bcrypt.compareSync(password, user.password_hash);
  if (!valid) return null;
  
  // Check trial expiry
  if (user.plan === 'trial' && new Date(user.trial_expires_at) < new Date()) {
    return { ...user, trialExpired: true };
  }
  
  return user;
}

export function createProject(userId, name, description = '') {
  const id = uuidv4();
  const stmt = db.prepare(`
    INSERT INTO projects (id, user_id, name, description)
    VALUES (?, ?, ?, ?)
  `);
  stmt.run(id, userId, name, description);
  return { id, user_id: userId, name, description, status: 'in_progress', current_step: 1 };
}

export function saveAnswer(projectId, questionKey, answerValue) {
  const id = uuidv4();
  const stmt = db.prepare(`
    INSERT OR REPLACE INTO answers (id, project_id, question_key, answer_value)
    VALUES (?, ?, ?, ?)
  `);
  stmt.run(id, projectId, questionKey, answerValue);
}

export function getAnswers(projectId) {
  const stmt = db.prepare('SELECT question_key, answer_value FROM answers WHERE project_id = ?');
  return stmt.all(projectId);
}

export function saveSelectedAgent(projectId, agentId, agentName, agentCategory, isRecommended = true) {
  const id = uuidv4();
  const stmt = db.prepare(`
    INSERT INTO selected_agents (id, project_id, agent_id, agent_name, agent_category, is_recommended)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  stmt.run(id, projectId, agentId, agentName, agentCategory, isRecommended ? 1 : 0);
}

export function getSelectedAgents(projectId) {
  const stmt = db.prepare('SELECT * FROM selected_agents WHERE project_id = ?');
  return stmt.all(projectId);
}

export function removeSelectedAgent(projectId, agentId) {
  const stmt = db.prepare('DELETE FROM selected_agents WHERE project_id = ? AND agent_id = ?');
  stmt.run(projectId, agentId);
}

export function updateProjectStatus(projectId, status, paymentId = null, amount = 0) {
  const paid_at = status === 'paid' ? new Date().toISOString() : null;
  const stmt = db.prepare(`
    UPDATE projects 
    SET status = ?, payment_id = ?, amount_paid = ?, paid_at = ?, updated_at = datetime('now')
    WHERE id = ?
  `);
  stmt.run(status, paymentId, amount, paid_at, projectId);
}

export function getProject(projectId, userId) {
  const stmt = db.prepare('SELECT * FROM projects WHERE id = ? AND user_id = ?');
  return stmt.get(projectId, userId);
}

export function getUserProjects(userId) {
  const stmt = db.prepare('SELECT * FROM projects WHERE user_id = ? ORDER BY created_at DESC');
  return stmt.all(userId);
}

export function updateGitHubToken(userId, token, username) {
  const stmt = db.prepare(`
    UPDATE users SET github_token = ?, github_username = ?, updated_at = datetime('now')
    WHERE id = ?
  `);
  stmt.run(token, username, userId);
}

export function createPayment(userId, projectId, amount) {
  const id = uuidv4();
  const stmt = db.prepare(`
    INSERT INTO payments (id, user_id, project_id, amount, status)
    VALUES (?, ?, ?, ?, 'completed')
  `);
  stmt.run(id, userId, projectId, amount);
  return id;
}

export function getUser(userId) {
  const stmt = db.prepare('SELECT id, email, name, plan, trial_expires_at FROM users WHERE id = ?');
  return stmt.get(userId);
}

export default db;
