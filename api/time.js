/**
 * Time API endpoint
 * Route: /api/time
 * Method: GET
 */
export default function handler(req, res) {
  const { method, query } = req;
  
  if (method !== 'GET') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      allowedMethods: ['GET']
    });
  }

  const now = new Date();
  const timezone = query.timezone || 'UTC';
  
  try {
    const localTime = timezone !== 'UTC' 
      ? now.toLocaleString('en-US', { timeZone: timezone })
      : now.toISOString();
    
    res.status(200).json({
      success: true,
      timestamp: now.toISOString(),
      unix: Math.floor(now.getTime() / 1000),
      timezone: timezone,
      localTime: localTime,
      date: now.toDateString(),
      time: now.toTimeString(),
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate(),
      hour: now.getHours(),
      minute: now.getMinutes(),
      second: now.getSeconds()
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: 'Invalid timezone',
      message: error.message
    });
  }
}
