/**
 * Root API endpoint - API Documentation
 * Route: /api or /api/index
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

  const baseUrl = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';

  res.status(200).json({
    message: 'Welcome to Vercel API Demo 🚀',
    version: '1.0.0',
    documentation: {
      endpoints: [
        {
          path: '/api/hello',
          method: 'GET',
          description: 'Simple greeting endpoint',
          example: `${baseUrl}/api/hello?name=YourName`,
          queryParams: {
            name: 'Optional - Your name (default: Gurjas)'
          }
        },
        {
          path: '/api/users',
          method: 'GET',
          description: 'Get users list with optional filtering',
          example: `${baseUrl}/api/users?role=admin`,
          queryParams: {
            id: 'Optional - Get user by ID',
            role: 'Optional - Filter users by role (admin, user, moderator)'
          }
        },
        {
          path: '/api/status',
          method: 'GET',
          description: 'API health check and system information',
          example: `${baseUrl}/api/status`
        },
        {
          path: '/api/time',
          method: 'GET',
          description: 'Get current server time',
          example: `${baseUrl}/api/time?timezone=America/New_York`,
          queryParams: {
            timezone: 'Optional - IANA timezone (default: UTC)'
          }
        }
      ]
    },
    deployment: {
      platform: 'Vercel',
      repository: 'Connected to GitHub',
      environment: process.env.VERCEL_ENV || 'development'
    }
  });
}
