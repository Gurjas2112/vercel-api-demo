/**
 * Users API endpoint
 * Route: /api/users
 * Methods: GET
 */

// Mock database
const usersDatabase = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "admin" },
  { id: 2, name: "Bob Singh", email: "bob@example.com", role: "user" },
  { id: 3, name: "Charlie Mehta", email: "charlie@example.com", role: "user" },
  { id: 4, name: "Diana Patel", email: "diana@example.com", role: "moderator" }
];

export default function handler(req, res) {
  const { method, query } = req;
  
  switch (method) {
    case 'GET':
      return handleGet(req, res, query);
    default:
      return res.status(405).json({ 
        error: 'Method not allowed',
        allowedMethods: ['GET']
      });
  }
}

function handleGet(req, res, query) {
  const { id, role } = query;
  
  // Get user by ID
  if (id) {
    const user = usersDatabase.find(u => u.id === parseInt(id));
    if (user) {
      return res.status(200).json({ 
        success: true,
        user 
      });
    } else {
      return res.status(404).json({ 
        success: false,
        error: 'User not found' 
      });
    }
  }
  
  // Filter by role
  if (role) {
    const filteredUsers = usersDatabase.filter(u => 
      u.role.toLowerCase() === role.toLowerCase()
    );
    return res.status(200).json({ 
      success: true,
      count: filteredUsers.length,
      users: filteredUsers 
    });
  }
  
  // Return all users
  res.status(200).json({ 
    success: true,
    count: usersDatabase.length,
    users: usersDatabase 
  });
}
