/**
 * Simple Hello API endpoint
 * Route: /api/hello
 * Method: GET
 */
export default function handler(req, res) {
  const { method, query } = req;
  
  // Only allow GET requests
  if (method !== 'GET') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      allowedMethods: ['GET']
    });
  }

  const name = query.name || 'Gurjas';
  const timestamp = new Date().toISOString();
  
  res.status(200).json({ 
    message: `Hello ${name} 👋! Vercel API is live.`,
    timestamp,
    endpoint: '/api/hello',
    method: method,
    serverless: true
  });
}
