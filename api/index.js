import { createClient } from '@supabase/supabase-js';

// Vercel serverless function
export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { method, query, body } = req;

  // Health check
  if (method === 'GET' && !query.slug) {
    return res.json({ status: 'ok', timestamp: new Date().toISOString() });
  }

  return res.status(404).json({ error: 'Not found' });
}
