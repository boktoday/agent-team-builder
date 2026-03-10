import express from 'express';
import jwt from 'jsonwebtoken';
import { 
  createUser, 
  verifyUser, 
  createProject, 
  saveAnswer, 
  getAnswers,
  saveSelectedAgent,
  getSelectedAgents,
  removeSelectedAgent,
  updateProjectStatus,
  getProject,
  getUserProjects,
  updateGitHubToken,
  createPayment,
  getUser
} from '../db/index.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Auth middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).json({ error: 'Access token required' });
  
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
}

// ============ AUTH ROUTES ============

// POST /api/auth/register
router.post('/auth/register', (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }
    
    const user = createUser(email, password, name || '');
    
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '30d' });
    
    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        plan: user.plan,
        trialExpiresAt: user.trial_expires_at
      },
      token,
      message: 'Account created! You have 30 days to export your agent team.'
    });
  } catch (error) {
    if (error.message.includes('UNIQUE constraint')) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: error.message });
  }
});

// POST /api/auth/login
router.post('/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }
    
    const user = verifyUser(email, password);
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    if (user.trialExpired) {
      return res.status(403).json({ error: 'Trial expired. Please upgrade to continue.' });
    }
    
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '30d' });
    
    const daysRemaining = Math.ceil((new Date(user.trial_expires_at) - new Date()) / (1000 * 60 * 60 * 24));
    
    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        plan: user.plan,
        trialExpiresAt: user.trial_expires_at,
        daysRemaining: Math.max(0, daysRemaining)
      },
      token
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/auth/me
router.get('/auth/me', authenticateToken, (req, res) => {
  const user = getUser(req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  
  const daysRemaining = Math.ceil((new Date(user.trial_expires_at) - new Date()) / (1000 * 60 * 60 * 24));
  
  res.json({
    success: true,
    user: {
      ...user,
      daysRemaining: Math.max(0, daysRemaining)
    }
  });
});

// ============ GITHUB ROUTES ============

// POST /api/github/token
router.post('/github/token', authenticateToken, (req, res) => {
  try {
    const { githubToken } = req.body;
    
    if (!githubToken) {
      return res.status(400).json({ error: 'GitHub token required' });
    }
    
    // Note: In production, you'd validate the token with GitHub API
    updateGitHubToken(req.user.id, githubToken, null);
    
    res.json({
      success: true,
      message: 'GitHub token saved. You can now export your agent team.'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============ PROJECT ROUTES ============

// POST /api/projects
router.post('/projects', authenticateToken, (req, res) => {
  try {
    const { name, description } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: 'Project name required' });
    }
    
    const project = createProject(req.user.id, name, description || '');
    
    res.json({
      success: true,
      project
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/projects
router.get('/projects', authenticateToken, (req, res) => {
  const projects = getUserProjects(req.user.id);
  res.json({ success: true, projects });
});

// GET /api/projects/:id
router.get('/projects/:id', authenticateToken, (req, res) => {
  const project = getProject(req.params.id, req.user.id);
  
  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }
  
  const answers = getAnswers(project.id);
  const agents = getSelectedAgents(project.id);
  
  res.json({
    success: true,
    project: {
      ...project,
      answers: answers.reduce((acc, { question_key, answer_value }) => {
        acc[question_key] = answer_value;
        return acc;
      }, {}),
      selectedAgents: agents
    }
  });
});

// ============ ANSWER ROUTES ============

// POST /api/answers
router.post('/answers', authenticateToken, (req, res) => {
  try {
    const { projectId, questionKey, answerValue } = req.body;
    
    if (!projectId || !questionKey) {
      return res.status(400).json({ error: 'Project ID and question key required' });
    }
    
    // Verify ownership
    const project = getProject(projectId, req.user.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    saveAnswer(projectId, questionKey, answerValue);
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============ AGENT ROUTES ============

// POST /api/agents/select
router.post('/agents/select', authenticateToken, (req, res) => {
  try {
    const { projectId, agentId, agentName, agentCategory } = req.body;
    
    if (!projectId || !agentId || !agentName) {
      return res.status(400).json({ error: 'Project ID, agent ID and name required' });
    }
    
    const project = getProject(projectId, req.user.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    saveSelectedAgent(projectId, agentId, agentName, agentCategory, false);
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/agents/:projectId/:agentId
router.delete('/agents/:projectId/:agentId', authenticateToken, (req, res) => {
  try {
    const { projectId, agentId } = req.params;
    
    const project = getProject(projectId, req.user.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    removeSelectedAgent(projectId, agentId);
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/agents/:projectId
router.get('/agents/:projectId', authenticateToken, (req, res) => {
  const project = getProject(req.params.projectId, req.user.id);
  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }
  
  const agents = getSelectedAgents(project.id);
  res.json({ success: true, agents });
});

// ============ PAYMENT ROUTES ============

// POST /api/checkout
router.post('/checkout', authenticateToken, (req, res) => {
  try {
    const { projectId } = req.body;
    
    if (!projectId) {
      return res.status(400).json({ error: 'Project ID required' });
    }
    
    const project = getProject(projectId, req.user.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    // In production: Create Stripe checkout session
    // For now: Simulate successful payment
    const paymentId = createPayment(req.user.id, projectId, 9900);
    updateProjectStatus(projectId, 'paid', paymentId, 99);
    
    res.json({
      success: true,
      message: 'Payment successful! You can now export your agent team.',
      projectId
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
