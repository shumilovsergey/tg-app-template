# Development Mode Setup Guide

This template now supports **local development without Telegram authentication**, allowing you to develop your frontend using a test user account.

## 🚀 Quick Setup

### Backend Setup (1 minute)

1. **Enable dev mode** in your backend `.env` file:
```bash
# Add these lines to back/.env
ENABLE_DEV_USER=true
DEV_AUTH_HEADER=dev-user-bypass
```

2. **Restart your backend**:
```bash
cd back && docker-compose restart backend
```

### Frontend Setup (30 seconds)

1. **Enable dev mode** in `front/config.js`:
```javascript
app: {
    enableDevMode: true,  // Enable for local development
    devAuthHeader: 'dev-user-bypass',
}
```

2. **Serve frontend locally**:
```bash
cd front && python -m http.server 8000
```

3. **Open in browser**: http://localhost:8000

## ✅ What This Enables

- **No Telegram Required**: Develop in any browser, no Telegram app needed
- **Instant Authentication**: Uses a test user automatically
- **Full API Access**: All API endpoints work normally
- **Test Data Only**: Uses safe, non-sensitive test data (user ID: 999999999)
- **Easy Switching**: Just change config to go back to Telegram mode

## 🔧 How It Works

### Backend
- When `ENABLE_DEV_USER=true`, the backend accepts `X-Dev-Auth: dev-user-bypass` header
- Creates a test user with ID `999999999` (clearly identifiable as test data)
- All other authentication works normally

### Frontend
- When `enableDevMode=true` and not in Telegram, uses dev auth header
- When in Telegram, uses normal Telegram authentication
- Automatically switches based on environment

## 📝 Development User Details

```javascript
// Test user data
{
  id: 999999999,
  first_name: "Dev User",
  last_name: "Template",
  username: "dev_user",
  language_code: "en",
  is_dev_user: true  // Flag to identify dev user
}
```

## 🔄 Environment Configurations

### Local Development (with dev mode)
```javascript
// front/config.js
window.AppConfig = {
    api: {
        baseUrl: 'http://localhost:YOUR_FLASK_PORT/api'  // ⚠️ CHANGE: Use your backend FLASK_PORT
    },
    app: {
        enableDevMode: true,  // Enable dev user bypass
        devAuthHeader: 'dev-user-bypass',
    }
};
```

```bash
# back/.env
ENABLE_DEV_USER=true
DEV_AUTH_HEADER=dev-user-bypass
```

### Production (Telegram only)
```javascript
// front/config.js
window.AppConfig = {
    api: {
        baseUrl: 'https://your-backend.com/api'
    },
    app: {
        enableDevMode: false,  // Disable dev mode
    }
};
```

```bash
# back/.env
ENABLE_DEV_USER=false  # Or omit this variable
```

## 🛠 Development Workflow

### 1. Local Development
```bash
# Terminal 1: Start backend
cd back && docker-compose up --build

# Terminal 2: Start frontend
cd front && python -m http.server 8000

# Browser: http://localhost:8000
# ✅ Works immediately, no Telegram needed
```

### 2. Test in Telegram
```bash
# Deploy frontend to GitHub Pages/Netlify
# Set enableDevMode: false in config
# Open in Telegram bot
# ✅ Uses real Telegram authentication
```

### 3. Production Deployment
```bash
# Set ENABLE_DEV_USER=false in production backend
# Set enableDevMode: false in production frontend
# ✅ Only Telegram authentication works
```

## 🔍 Debugging

### Backend Logs
When dev mode is enabled, you'll see:
```
🚧 DEV USER BYPASS ENABLED - Local development mode
   Dev user ID: 999999999
   Dev auth header: X-Dev-Auth: dev-user-bypass
   ⚠️  WARNING: Only use for development/testing!
```

When dev user is used:
```
🚧 DEV USER BYPASS: Using development user
```

### Frontend Console
Check browser console for:
```
🌐 Backend URL configured: http://localhost:YOUR_PORT/api
[App] Configuration loaded: {enableDevMode: true, ...}
```

## ⚠️ Security Notes

### Safe for Development
- **Test data only**: Dev user ID `999999999` is clearly non-production
- **No sensitive info**: Dev user contains only basic test data
- **Easily identifiable**: All dev data is flagged and separate
- **No real users affected**: Completely isolated from real user data

### Production Safety
- **Disabled by default**: `ENABLE_DEV_USER=false` by default
- **Environment-specific**: Separate configs for dev/prod
- **Clear separation**: Dev mode logs are clearly marked
- **Easy to verify**: Check logs to confirm dev mode is disabled

## 🎯 Use Cases

### Perfect For:
- **Frontend development**: UI/UX work without Telegram setup
- **API testing**: Test API calls in browser
- **Demo purposes**: Show app functionality
- **Onboarding new developers**: Quick setup
- **Automated testing**: Consistent test user data

### Not Recommended For:
- **Production**: Always disable dev mode in production
- **Real user data**: Never test with real user information
- **Security testing**: Use proper Telegram auth for security tests

## 🚀 Quick Commands

```bash
# Enable dev mode quickly
echo "ENABLE_DEV_USER=true" >> back/.env
docker-compose restart backend

# Disable dev mode quickly
sed -i 's/ENABLE_DEV_USER=true/ENABLE_DEV_USER=false/' back/.env
docker-compose restart backend

# Check if dev mode is enabled (replace YOUR_PORT with your FLASK_PORT)
curl http://localhost:YOUR_PORT/health | grep -i dev

# Test dev auth
curl -X POST http://localhost:YOUR_PORT/api/user/get_data \
  -H "Content-Type: application/json" \
  -H "X-Dev-Auth: dev-user-bypass" \
  -d '{}'
```

## 📚 Next Steps

1. **Set up dev mode** using instructions above
2. **Start developing** your frontend features
3. **Test with real Telegram** when ready
4. **Deploy to production** with dev mode disabled

---

**Happy coding! 🎉** Now you can develop your Telegram Web App locally without needing the Telegram app running.