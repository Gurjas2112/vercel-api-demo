# Vercel Deployment Guide 📝

## Quick Deployment Steps

### 1️⃣ Prepare Your Repository

Make sure all files are committed to your GitHub repository:

```bash
# Check status
git status

# Add all files
git add .

# Commit changes
git commit -m "Setup Vercel API with serverless functions"

# Push to GitHub (if not already done)
git push origin main
```

### 2️⃣ Connect GitHub to Vercel

1. **Go to Vercel**: https://vercel.com
2. **Sign in** with your GitHub account
3. **Import Project**:
   - Click "Add New..." → "Project"
   - Select your GitHub repository: `vercel-api-demo`
   - Click "Import"

### 3️⃣ Configure Deployment

Vercel will automatically detect the configuration from `vercel.json`:

- **Framework Preset**: Other
- **Build Command**: (leave empty)
- **Output Directory**: (leave empty)
- **Install Command**: npm install

Click **"Deploy"**

### 4️⃣ Wait for Deployment

Vercel will:
- Install dependencies
- Build serverless functions
- Deploy to production
- Generate a public URL

Expected time: 30-60 seconds

### 5️⃣ Get Your Public URL

After deployment completes, you'll receive a URL like:
```
https://vercel-api-demo-xxxx.vercel.app
```

Or with your custom domain:
```
https://your-project-name.vercel.app
```

### 6️⃣ Test Your Endpoints

Open your browser or use cURL to test:

```bash
# Test root documentation
curl https://your-project-name.vercel.app/api

# Test hello endpoint
curl https://your-project-name.vercel.app/api/hello?name=Gurjas

# Test users endpoint
curl https://your-project-name.vercel.app/api/users

# Test status endpoint
curl https://your-project-name.vercel.app/api/status

# Test time endpoint
curl https://your-project-name.vercel.app/api/time
```

Or visit in browser:
- https://your-project-name.vercel.app/api
- https://your-project-name.vercel.app/api/hello
- https://your-project-name.vercel.app/api/users
- https://your-project-name.vercel.app/api/status
- https://your-project-name.vercel.app/api/time

## 🔄 Continuous Deployment

Every time you push to GitHub:

```bash
# Make changes
git add .
git commit -m "Update API"
git push origin main
```

Vercel automatically:
1. Detects the push
2. Creates a new deployment
3. Runs tests
4. Deploys to production
5. Sends you a notification

## 📊 Monitor Traffic

### View Analytics in Vercel Dashboard

1. Go to your project in Vercel
2. Click **"Analytics"** tab
3. Monitor:
   - Request count
   - Response times
   - Error rates
   - Popular endpoints
   - Geographic distribution

### Real-time Logs

1. Click **"Logs"** tab in Vercel dashboard
2. See real-time function invocations
3. Debug errors and issues
4. Monitor API performance

## 🧪 Test Traffic Response

### Method 1: Browser Testing

1. Open `test.html` in your browser
2. Update the `API_BASE_URL` with your Vercel URL
3. Test all endpoints interactively

### Method 2: cURL Testing

```bash
# Test with query parameters
curl "https://your-project-name.vercel.app/api/hello?name=Test"

# Test with different roles
curl "https://your-project-name.vercel.app/api/users?role=admin"

# Test specific user
curl "https://your-project-name.vercel.app/api/users?id=1"

# Test timezone
curl "https://your-project-name.vercel.app/api/time?timezone=America/New_York"
```

### Method 3: Postman/Insomnia

1. Import endpoints
2. Set base URL to your Vercel deployment
3. Test different scenarios
4. Save responses
5. Create test collections

### Method 4: Load Testing

Use tools like Apache Bench or Artillery:

```bash
# Apache Bench - 100 requests, 10 concurrent
ab -n 100 -c 10 https://your-project-name.vercel.app/api/status

# Or use Artillery (npm install -g artillery)
artillery quick --count 100 --num 10 https://your-project-name.vercel.app/api/status
```

## 🎯 Expected Responses

### Success Response (200 OK)
```json
{
  "success": true,
  "data": { /* your data */ }
}
```

### Error Response (4xx/5xx)
```json
{
  "error": "Error message",
  "statusCode": 400
}
```

## 🔒 Security Considerations

1. **CORS**: Already configured for all origins (*)
2. **Rate Limiting**: Vercel has built-in DDoS protection
3. **HTTPS**: Automatic SSL/TLS encryption
4. **Environment Variables**: Use Vercel's environment variables for secrets

## 📈 Performance Tips

1. **Cold Starts**: First request may be slower (~100-500ms)
2. **Warm Functions**: Subsequent requests are fast (~10-50ms)
3. **Regions**: Vercel deploys to multiple global edge locations
4. **Caching**: Use caching headers for static responses

## 🐛 Troubleshooting

### Issue: 404 Not Found
- Check the endpoint URL
- Verify file exists in `/api` folder
- Check `vercel.json` routing configuration

### Issue: 500 Internal Server Error
- Check Vercel logs for error details
- Verify function syntax
- Check for missing dependencies

### Issue: Deployment Failed
- Check build logs in Vercel
- Verify `package.json` is valid
- Ensure all dependencies are listed

### Issue: CORS Errors
- Verify `vercel.json` headers configuration
- Check browser console for specific error
- Test with cURL to isolate issue

## 📞 Support

- Vercel Documentation: https://vercel.com/docs
- Vercel Discord: https://vercel.com/discord
- GitHub Issues: Create an issue in your repository

## ✅ Checklist

- [ ] Repository pushed to GitHub
- [ ] Connected GitHub to Vercel
- [ ] Deployed successfully
- [ ] Tested all API endpoints
- [ ] Verified public URL works
- [ ] Checked analytics dashboard
- [ ] Documented API endpoints
- [ ] Tested error handling
- [ ] Configured environment variables (if needed)
- [ ] Set up custom domain (optional)

## 🎉 You're Done!

Your serverless API is now live on Vercel with:
- ✅ Automatic deployments from GitHub
- ✅ Global CDN distribution
- ✅ HTTPS encryption
- ✅ Real-time analytics
- ✅ Zero server maintenance

**Share your API URL and start building! 🚀**
