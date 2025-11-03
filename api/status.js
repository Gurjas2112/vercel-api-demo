/**
 * Status/Health Check API endpoint
 * Route: /api/status
 * Method: GET
 */
export default function handler(req, res) {
  const { method } = req;
  
  if (method !== 'GET') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      allowedMethods: ['GET']
    });
  }

  const uptime = process.uptime();
  const timestamp = new Date().toISOString();
  
  res.status(200).json({
    status: 'healthy',
    service: 'Vercel API Demo',
    timestamp,
    uptime: `${uptime.toFixed(2)} seconds`,
    environment: process.env.VERCEL_ENV || 'development',
    region: process.env.VERCEL_REGION || 'local',
    nodeVersion: process.version,
    endpoints: [
      { path: '/api/hello', method: 'GET', description: 'Simple greeting endpoint' },
      { path: '/api/users', method: 'GET', description: 'Get all users or filter by id/role' },
      { path: '/api/status', method: 'GET', description: 'API health check' },
      { path: '/api/time', method: 'GET', description: 'Get current server time' }
    ]
  });
}
