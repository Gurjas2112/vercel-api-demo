# Vercel API Demo 🚀

A serverless API demonstration deployed on Vercel with GitHub integration. This project showcases how to build and deploy RESTful API endpoints using Vercel's serverless functions.

## 📋 Features

- **Serverless Architecture**: Built on Vercel's serverless platform
- **Multiple API Endpoints**: Demonstrates various API patterns
- **CORS Enabled**: Ready for cross-origin requests
- **GitHub Integration**: Automatic deployment on push
- **Error Handling**: Proper HTTP status codes and error responses
- **Query Parameters**: Support for dynamic queries

## 🌐 API Endpoints

### 1. Root/Documentation - `/api` or `/api/index`
Get API documentation and available endpoints.
```
GET /api
```

### 2. Hello Endpoint - `/api/hello`
Simple greeting endpoint with optional name parameter.
```
GET /api/hello?name=YourName
```

**Query Parameters:**
- `name` (optional) - Your name (default: "Gurjas")

**Example Response:**
```json
{
  "message": "Hello YourName 👋! Vercel API is live.",
  "timestamp": "2025-11-03T10:30:00.000Z",
  "endpoint": "/api/hello",
  "method": "GET",
  "serverless": true
}
```

### 3. Users Endpoint - `/api/users`
Retrieve users list with optional filtering.
```
GET /api/users
GET /api/users?id=1
GET /api/users?role=admin
```

**Query Parameters:**
- `id` (optional) - Get specific user by ID
- `role` (optional) - Filter users by role (admin, user, moderator)

**Example Response:**
```json
{
  "success": true,
  "count": 4,
  "users": [
    {
      "id": 1,
      "name": "Alice Johnson",
      "email": "alice@example.com",
      "role": "admin"
    }
  ]
}
```

### 4. Status Endpoint - `/api/status`
Health check and system information.
```
GET /api/status
```

**Example Response:**
```json
{
  "status": "healthy",
  "service": "Vercel API Demo",
  "timestamp": "2025-11-03T10:30:00.000Z",
  "uptime": "42.15 seconds",
  "environment": "production",
  "region": "iad1",
  "nodeVersion": "v18.0.0"
}
```

### 5. Time Endpoint - `/api/time`
Get current server time with optional timezone.
```
GET /api/time
GET /api/time?timezone=America/New_York
```

**Query Parameters:**
- `timezone` (optional) - IANA timezone name (default: "UTC")

**Example Response:**
```json
{
  "success": true,
  "timestamp": "2025-11-03T10:30:00.000Z",
  "unix": 1730632200,
  "timezone": "UTC",
  "year": 2025,
  "month": 11,
  "day": 3
}
```

## 🚀 Deployment on Vercel

### Prerequisites
- GitHub account
- Vercel account (free tier available)
- Git installed locally

### Step 1: Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: Vercel API setup"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/vercel-api-demo.git

# Push to GitHub
git push -u origin main
```

### Step 2: Connect to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository (`vercel-api-demo`)
4. Vercel will auto-detect the configuration from `vercel.json`
5. Click **"Deploy"**

### Step 3: Test Your Deployment

Once deployed, Vercel will provide a public URL like:
```
https://vercel-api-demo-xxxx.vercel.app
```

Test your endpoints:
```bash
# Test hello endpoint
curl https://YOUR-PROJECT.vercel.app/api/hello

# Test users endpoint
curl https://YOUR-PROJECT.vercel.app/api/users

# Test status endpoint
curl https://YOUR-PROJECT.vercel.app/api/status

# Test with query parameters
curl https://YOUR-PROJECT.vercel.app/api/hello?name=Gurjas
curl https://YOUR-PROJECT.vercel.app/api/users?role=admin
```

### Step 4: Automatic Deployments

Every push to your GitHub repository will trigger an automatic deployment:
```bash
# Make changes to your code
git add .
git commit -m "Update API endpoint"
git push origin main
```

Vercel will automatically:
- Build your project
- Deploy to a preview URL
- Promote to production (if on main branch)

## 🛠️ Local Development

### Install Dependencies
```bash
npm install
```

### Run Locally
```bash
npm run dev
```

This will start a local development server at `http://localhost:3000`

### Test Locally
```bash
# Test endpoints locally
curl http://localhost:3000/api/hello
curl http://localhost:3000/api/users
curl http://localhost:3000/api/status
curl http://localhost:3000/api/time
```

## 📁 Project Structure

```
vercel-api-demo/
├── api/
│   ├── hello.js       # Simple greeting endpoint
│   ├── users.js       # Users CRUD operations
│   ├── status.js      # Health check endpoint
│   ├── time.js        # Time/date endpoint
│   └── index.js       # API documentation
├── vercel.json        # Vercel configuration
├── package.json       # Node.js dependencies
├── README.md          # Documentation
└── LICENSE           # License file
```

## ⚙️ Configuration

### vercel.json
The `vercel.json` file configures:
- **Builds**: Specifies serverless function handlers
- **Routes**: Maps URL paths to functions
- **Headers**: CORS and security headers

```json
{
  "version": 2,
  "builds": [
    { "src": "api/**/*.js", "use": "@vercel/node" }
  ],
  "routes": [
    { "src": "/api/(.*)", "dest": "/api/$1" }
  ]
}
```

## 🔒 CORS Support

All API endpoints include CORS headers to allow cross-origin requests:
- `Access-Control-Allow-Origin: *`
- `Access-Control-Allow-Methods: GET,POST,PUT,DELETE,OPTIONS`
- `Access-Control-Allow-Headers: *`

## 📊 Traffic Testing

### Using cURL
```bash
# Basic request
curl https://YOUR-PROJECT.vercel.app/api/status

# With headers
curl -H "Content-Type: application/json" https://YOUR-PROJECT.vercel.app/api/users

# POST request (if implemented)
curl -X POST -H "Content-Type: application/json" -d '{"name":"Test"}' https://YOUR-PROJECT.vercel.app/api/users
```

### Using Browser
Simply visit:
```
https://YOUR-PROJECT.vercel.app/api
https://YOUR-PROJECT.vercel.app/api/hello
https://YOUR-PROJECT.vercel.app/api/users
https://YOUR-PROJECT.vercel.app/api/status
```

### Using Postman
1. Import endpoints into Postman
2. Set base URL to your Vercel deployment
3. Test different query parameters
4. Monitor response times and status codes

## 📈 Monitoring

Vercel provides built-in analytics:
1. Go to your project dashboard
2. Click on **"Analytics"** tab
3. View:
   - Request count
   - Response times
   - Error rates
   - Geographic distribution

## 🔑 Environment Variables (Optional)

For production deployments, you can add environment variables in Vercel:
1. Go to Project Settings
2. Navigate to "Environment Variables"
3. Add variables (e.g., API keys, database URLs)

Access in code:
```javascript
const apiKey = process.env.API_KEY;
```

## 📝 License

MIT License - feel free to use this project for learning and development.

## 👨‍💻 Author

**Gurjas**

## 🤝 Contributing

Feel free to fork this repository and submit pull requests!

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Serverless Functions](https://vercel.com/docs/serverless-functions/introduction)
- [GitHub Integration](https://vercel.com/docs/git/vercel-for-github)

---

**Happy Coding! 🎉**
