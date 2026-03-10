import { createClient } from '@supabase/supabase-js';

// Environment-aware database client
// Use SQLite for local development, Supabase for production

const isProduction = process.env.NODE_ENV === 'production';
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

// Supabase client (production)
export const supabase = (isProduction && supabaseUrl && supabaseKey)
  ? createClient(supabaseUrl, supabaseKey)
  : null;

// SQLite client (local development)
import Database from 'better-sqlite3';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';

let db = null;

function getDb() {
  if (!db) {
    db = new Database('./data/agent-builder.db');
    initDb();
  }
  return db;
}

function initDb() {
  const database = getDb();
  
  database.exec(`
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

    CREATE TABLE IF NOT EXISTS answers (
      id TEXT PRIMARY KEY,
      project_id TEXT NOT NULL,
      question_key TEXT NOT NULL,
      answer_value TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (project_id) REFERENCES projects(id)
    );

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
}

// Helper functions - work with both SQLite and Supabase
export function createUser(email, password, name) {
  if (supabase) {
    // Supabase: Use auth.users (handled by Supabase Auth)
    return { id: uuidv4(), email, name, plan: 'trial' };
  }
  
  // SQLite
  const id = uuidv4();
  const password_hash = bcrypt.hashSync(password, 10);
  const trial_expires_at = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
  
  const stmt = getDb().prepare(`
    INSERT INTO users (id, email, password_hash, name, trial_expires_at)
    VALUES (?, ?, ?, ?, ?)
  `);
  
  stmt.run(id, email, password_hash, name, trial_expires_at);
  return { id, email, name, plan: 'trial', trial_expires_at };
}

export function verifyUser(email, password) {
  if (supabase) {
    // Supabase: Auth handled separately
    return null;
  }
  
  const stmt = getDb().prepare('SELECT * FROM users WHERE email = ? AND is_active = 1');
  const user = stmt.get(email);
  
  if (!user) return null;
  
  const valid = bcrypt.compareSync(password, user.password_hash);
  if (!valid) return null;
  
  if (user.plan === 'trial' && new Date(user.trial_expires_at) < new Date()) {
    return { ...user, trialExpired: true };
  }
  
  return user;
}

export function createProject(userId, name, description = '') {
  const id = uuidv4();
  const stmt = getDb().prepare(`
    INSERT INTO projects (id, user_id, name, description)
    VALUES (?, ?, ?, ?)
  `);
  stmt.run(id, userId, name, description);
  return { id, user_id: userId, name, description, status: 'in_progress', current_step: 1 };
}

export function saveAnswer(projectId, questionKey, answerValue) {
  const id = uuidv4();
  const stmt = getDb().prepare(`
    INSERT OR REPLACE INTO answers (id, project_id, question_key, answer_value)
    VALUES (?, ?, ?, ?)
  `);
  stmt.run(id, projectId, questionKey, answerValue);
}

export function getAnswers(projectId) {
  const stmt = getDb().prepare('SELECT question_key, answer_value FROM answers WHERE project_id = ?');
  return stmt.all(projectId);
}

export function saveSelectedAgent(projectId, agentId, agentName, agentCategory, isRecommended = true) {
  const id = uuidv4();
  const stmt = getDb().prepare(`
    INSERT INTO selected_agents (id, project_id, agent_id, agent_name, agent_category, is_recommended)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  stmt.run(id, projectId, agentId, agentName, agentCategory, isRecommended ? 1 : 0);
}

export function getSelectedAgents(projectId) {
  const stmt = getDb().prepare('SELECT * FROM selected_agents WHERE project_id = ?');
  return stmt.all(projectId);
}

export function removeSelectedAgent(projectId, agentId) {
  const stmt = getDb().prepare('DELETE FROM selected_agents WHERE project_id = ? AND agent_id = ?');
  stmt.run(projectId, agentId);
}

export function updateProjectStatus(projectId, status, paymentId = null, amount = 0) {
  const paid_at = status === 'paid' ? new Date().toISOString() : null;
  const stmt = getDb().prepare(`
    UPDATE projects 
    SET status = ?, payment_id = ?, amount_paid = ?, paid_at = ?, updated_at = datetime('now')
    WHERE id = ?
  `);
  stmt.run(status, paymentId, amount, paid_at, projectId);
}

export function getProject(projectId, userId) {
  const stmt = getDb().prepare('SELECT * FROM projects WHERE id = ? AND user_id = ?');
  return stmt.get(projectId, userId);
}

export function getUserProjects(userId) {
  const stmt = getDb().prepare('SELECT * FROM projects WHERE user_id = ? ORDER BY created_at DESC');
  return stmt.all(userId);
}

export function updateGitHubToken(userId, token, username) {
  const stmt = getDb().prepare(`
    UPDATE users SET github_token = ?, github_username = ?, updated_at = datetime('now')
    WHERE id = ?
  `);
  stmt.run(token, username, userId);
}

export function createPayment(userId, projectId, amount) {
  const id = uuidv4();
  const stmt = getDb().prepare(`
    INSERT INTO payments (id, user_id, project_id, amount, status)
    VALUES (?, ?, ?, ?, 'completed')
  `);
  stmt.run(id, userId, projectId, amount);
  return id;
}

export function getUser(userId) {
  const stmt = getDb().prepare('SELECT id, email, name, plan, trial_expires_at FROM users WHERE id = ?');
  return stmt.get(userId);
}

export default { getDb };
