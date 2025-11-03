# API Testing Commands

## PowerShell Commands for Windows

### Test All Endpoints

```powershell
# Set your Vercel URL (update after deployment)
$BASE_URL = "https://your-project-name.vercel.app"

# Test root/documentation endpoint
Invoke-RestMethod -Uri "$BASE_URL/api" -Method Get | ConvertTo-Json

# Test hello endpoint
Invoke-RestMethod -Uri "$BASE_URL/api/hello" -Method Get | ConvertTo-Json

# Test hello with name parameter
Invoke-RestMethod -Uri "$BASE_URL/api/hello?name=Gurjas" -Method Get | ConvertTo-Json

# Test all users
Invoke-RestMethod -Uri "$BASE_URL/api/users" -Method Get | ConvertTo-Json

# Test user by ID
Invoke-RestMethod -Uri "$BASE_URL/api/users?id=1" -Method Get | ConvertTo-Json

# Test users by role
Invoke-RestMethod -Uri "$BASE_URL/api/users?role=admin" -Method Get | ConvertTo-Json

# Test status endpoint
Invoke-RestMethod -Uri "$BASE_URL/api/status" -Method Get | ConvertTo-Json

# Test time endpoint
Invoke-RestMethod -Uri "$BASE_URL/api/time" -Method Get | ConvertTo-Json

# Test time with timezone
Invoke-RestMethod -Uri "$BASE_URL/api/time?timezone=America/New_York" -Method Get | ConvertTo-Json
```

### Quick Test Script

Save this as `test-api.ps1`:

```powershell
param(
    [string]$BaseUrl = "http://localhost:3000"
)

Write-Host "Testing API at: $BaseUrl" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan

# Test each endpoint
$endpoints = @(
    @{Name="Root/Docs"; Path="/api"},
    @{Name="Hello"; Path="/api/hello"},
    @{Name="Hello (with name)"; Path="/api/hello?name=Test"},
    @{Name="Users (all)"; Path="/api/users"},
    @{Name="Users (by ID)"; Path="/api/users?id=1"},
    @{Name="Users (by role)"; Path="/api/users?role=admin"},
    @{Name="Status"; Path="/api/status"},
    @{Name="Time"; Path="/api/time"},
    @{Name="Time (timezone)"; Path="/api/time?timezone=Asia/Kolkata"}
)

foreach ($endpoint in $endpoints) {
    Write-Host "`nTesting: $($endpoint.Name)" -ForegroundColor Yellow
    Write-Host "URL: $BaseUrl$($endpoint.Path)" -ForegroundColor Gray
    
    try {
        $response = Invoke-RestMethod -Uri "$BaseUrl$($endpoint.Path)" -Method Get
        Write-Host "✓ Success" -ForegroundColor Green
        $response | ConvertTo-Json -Depth 10
    }
    catch {
        Write-Host "✗ Failed: $($_.Exception.Message)" -ForegroundColor Red
    }
    
    Write-Host "--------------------------------" -ForegroundColor Gray
}

Write-Host "`nAll tests completed!" -ForegroundColor Cyan
```

Run with:
```powershell
# Test local development
.\test-api.ps1

# Test production deployment
.\test-api.ps1 -BaseUrl "https://your-project-name.vercel.app"
```

## cURL Commands (Git Bash or WSL)

```bash
# Set your base URL
BASE_URL="https://your-project-name.vercel.app"

# Test root endpoint
curl "$BASE_URL/api" | json_pp

# Test hello endpoint
curl "$BASE_URL/api/hello" | json_pp

# Test hello with parameter
curl "$BASE_URL/api/hello?name=Gurjas" | json_pp

# Test all users
curl "$BASE_URL/api/users" | json_pp

# Test user by ID
curl "$BASE_URL/api/users?id=1" | json_pp

# Test users by role
curl "$BASE_URL/api/users?role=admin" | json_pp

# Test status
curl "$BASE_URL/api/status" | json_pp

# Test time
curl "$BASE_URL/api/time" | json_pp

# Test time with timezone
curl "$BASE_URL/api/time?timezone=America/New_York" | json_pp
```

## Browser Testing

### Direct URLs

After deployment, visit these URLs in your browser:

```
https://your-project-name.vercel.app/api
https://your-project-name.vercel.app/api/hello
https://your-project-name.vercel.app/api/hello?name=YourName
https://your-project-name.vercel.app/api/users
https://your-project-name.vercel.app/api/users?id=1
https://your-project-name.vercel.app/api/users?role=admin
https://your-project-name.vercel.app/api/status
https://your-project-name.vercel.app/api/time
https://your-project-name.vercel.app/api/time?timezone=Asia/Kolkata
```

### Interactive Test Client

1. Open `test.html` in your browser
2. Update the `API_BASE_URL` constant with your Vercel URL
3. Test all endpoints interactively

## Performance Testing

### Using PowerShell

```powershell
# Measure response time
Measure-Command { Invoke-RestMethod -Uri "https://your-project-name.vercel.app/api/status" }

# Test multiple times
1..10 | ForEach-Object {
    $time = Measure-Command { Invoke-RestMethod -Uri "https://your-project-name.vercel.app/api/status" }
    Write-Host "Request $($_): $($time.TotalMilliseconds) ms"
}
```

### Load Testing (if you have Apache Bench)

```bash
# 100 requests, 10 concurrent connections
ab -n 100 -c 10 https://your-project-name.vercel.app/api/status

# With custom headers
ab -n 100 -c 10 -H "User-Agent: LoadTest" https://your-project-name.vercel.app/api/status
```

## Monitoring Commands

### Check Deployment Status

```powershell
# Install Vercel CLI (one-time setup)
npm install -g vercel

# Login to Vercel
vercel login

# Check deployment list
vercel list

# Check project details
vercel inspect

# View logs
vercel logs
```

## Expected Response Codes

- `200 OK` - Successful request
- `404 Not Found` - Endpoint doesn't exist
- `405 Method Not Allowed` - Wrong HTTP method
- `500 Internal Server Error` - Server error

## Traffic Validation Checklist

- [ ] All endpoints return 200 status
- [ ] Response times are under 1 second
- [ ] JSON responses are properly formatted
- [ ] Query parameters work correctly
- [ ] Error handling returns appropriate codes
- [ ] CORS headers are present
- [ ] Documentation endpoint lists all routes
- [ ] Status endpoint shows system info

## Notes

- First request (cold start) may take 100-500ms
- Subsequent requests should be under 100ms
- Test from different locations to check CDN
- Monitor Vercel dashboard for analytics
- Check logs for any errors or warnings

Happy Testing! 🎉
