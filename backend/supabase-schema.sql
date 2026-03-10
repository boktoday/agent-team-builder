-- Agent Team Builder - Supabase Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT,
  github_token TEXT,
  github_username TEXT,
  plan TEXT DEFAULT 'trial' CHECK (plan IN ('trial', 'paid')),
  trial_expires_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Projects table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'paid', 'exported')),
  current_step INTEGER DEFAULT 1,
  total_steps INTEGER DEFAULT 8,
  payment_id TEXT,
  amount_paid DECIMAL(10,2) DEFAULT 0,
  paid_at TIMESTAMPTZ,
  github_repo_url TEXT,
  github_repo_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Answers table
CREATE TABLE answers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  question_key TEXT NOT NULL,
  answer_value TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(project_id, question_key)
);

-- Selected Agents table
CREATE TABLE selected_agents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  agent_id TEXT NOT NULL,
  agent_name TEXT NOT NULL,
  agent_category TEXT,
  is_required BOOLEAN DEFAULT false,
  is_recommended BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Payments table
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'usd',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  payment_method TEXT,
  stripe_payment_intent_id TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE selected_agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Users: users can only see their own data
CREATE POLICY "Users can only see own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert own data" ON users
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Projects: users can only see their own projects
CREATE POLICY "Users can see own projects" ON projects
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create projects" ON projects
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own projects" ON projects
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can delete own projects" ON projects
  FOR DELETE USING (user_id = auth.uid());

-- Answers: users can only see answers for their projects
CREATE POLICY "Users can see own answers" ON answers
  FOR SELECT USING (
    project_id IN (SELECT id FROM projects WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can insert own answers" ON answers
  FOR INSERT WITH CHECK (
    project_id IN (SELECT id FROM projects WHERE user_id = auth.uid())
  );

-- Selected Agents: users can only see agents for their projects
CREATE POLICY "Users can see own agents" ON selected_agents
  FOR SELECT USING (
    project_id IN (SELECT id FROM projects WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can insert own agents" ON selected_agents
  FOR INSERT WITH CHECK (
    project_id IN (SELECT id FROM projects WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can delete own agents" ON selected_agents
  FOR DELETE USING (
    project_id IN (SELECT id FROM projects WHERE user_id = auth.uid())
  );

-- Payments: users can only see their own payments
CREATE POLICY "Users can see own payments" ON payments
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can insert payments" ON payments
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Auth helpers (create user trigger)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name, trial_expires_at)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'name',
    NOW() + INTERVAL '30 days'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Indexes for performance
CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_answers_project_id ON answers(project_id);
CREATE INDEX idx_selected_agents_project_id ON selected_agents(project_id);
CREATE INDEX idx_payments_user_id ON payments(user_id);
