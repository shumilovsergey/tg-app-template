/**
 * Environment Configuration for Telegram Web App
 *
 * This file helps developers quickly set up environment variables for different deployment scenarios.
 * Copy the appropriate configuration section and update your config.js file.
 */

// ===== DEVELOPMENT CONFIGURATION =====
// Use this when developing locally with local backend
const DEVELOPMENT_CONFIG = {
    api: {
        baseUrl: 'http://localhost:9002/api',  // Change port to match your backend .env FLASK_PORT
        timeout: 10000,
        maxRetries: 3,
        retryDelay: 1000
    },
    app: {
        name: 'Your App Name - Dev',
        debug: true,
        debugConsole: true,  // Enable visual debug console
    },
    telegram: {
        autoExpand: true,
        hapticFeedback: true,
        showMainButton: false
    }
};

// ===== PRODUCTION CONFIGURATION =====
// Use this for production deployment
const PRODUCTION_CONFIG = {
    api: {
        baseUrl: 'https://your-backend-domain.com/api',  // CHANGE THIS to your actual backend URL
        timeout: 10000,
        maxRetries: 3,
        retryDelay: 1000
    },
    app: {
        name: 'Your App Name',
        debug: false,
        debugConsole: false,  // Disable debug console in production
    },
    telegram: {
        autoExpand: true,
        hapticFeedback: true,
        showMainButton: false
    }
};

// ===== STAGING CONFIGURATION =====
// Use this for testing with staging backend
const STAGING_CONFIG = {
    api: {
        baseUrl: 'https://staging-backend.your-domain.com/api',  // CHANGE THIS to your staging URL
        timeout: 10000,
        maxRetries: 3,
        retryDelay: 1000
    },
    app: {
        name: 'Your App Name - Staging',
        debug: true,
        debugConsole: true,  // Enable debug console for testing
    },
    telegram: {
        autoExpand: true,
        hapticFeedback: true,
        showMainButton: false
    }
};

// ===== EXAMPLE WORKING CONFIGURATIONS =====

// Example 1: Arena LoL configuration (working example)
const ARENA_EXAMPLE_CONFIG = {
    api: {
        baseUrl: window.location.hostname === 'localhost'
            ? 'http://localhost:9002/api'
            : 'https://arena-back.sh-development.ru/api',
        timeout: 10000,
        maxRetries: 3,
        retryDelay: 1000
    },
    app: {
        name: 'Arena LoL',
        debug: window.location.hostname === 'localhost',
        debugConsole: window.location.hostname === 'localhost',
    },
    telegram: {
        autoExpand: true,
        hapticFeedback: true,
        showMainButton: false
    }
};

// Example 2: GitHub Pages + Custom Backend
const GITHUB_PAGES_CONFIG = {
    api: {
        baseUrl: window.location.hostname === 'localhost'
            ? 'http://localhost:9002/api'
            : 'https://api.your-project.com/api',
        timeout: 10000,
        maxRetries: 3,
        retryDelay: 1000
    },
    app: {
        name: 'Your Project Name',
        debug: window.location.hostname === 'localhost',
        debugConsole: window.location.hostname === 'localhost',
    },
    telegram: {
        autoExpand: true,
        hapticFeedback: true,
        showMainButton: false
    }
};

// ===== SETUP INSTRUCTIONS =====

/*
STEP 1: Choose Your Configuration
- Copy one of the configurations above
- Or create your own based on the examples

STEP 2: Update config.js
Replace the content of front/config.js with:

```javascript
window.AppConfig = YOUR_CHOSEN_CONFIG;

// Add helper functions
window.AppConfig.getApiUrl = function(endpoint = '') {
    return `${this.api.baseUrl}${endpoint}`;
};

window.AppConfig.isDebug = function() {
    return this.app.debug;
};

window.AppConfig.log = function(...args) {
    if (this.isDebug()) {
        console.log('[App]', ...args);
    }
};

window.AppConfig.logError = function(...args) {
    if (this.isDebug()) {
        console.error('[App Error]', ...args);
    }
};

// Validation on load
(function validateConfig() {
    const config = window.AppConfig;

    if (config.api.baseUrl.includes('your-backend-domain.com') ||
        config.api.baseUrl.includes('your-domain.com') ||
        config.api.baseUrl.includes('your-project.com')) {
        console.warn('⚠️ Please update the backend URL in config.js');
    }

    console.log('🌐 Backend URL configured:', config.api.baseUrl);
    config.log('Configuration loaded:', config);
})();
```

STEP 3: Backend Configuration
Make sure your backend .env file has matching URLs:

For DEVELOPMENT:
- FRONTEND_URL=http://localhost:8000 (or your local frontend URL)
- BACKEND_URL=http://localhost:9002 (should match your FLASK_PORT)
- FLASK_PORT=9002 (port for backend service)

For PRODUCTION:
- FRONTEND_URL=https://yourusername.github.io/your-repo (your frontend deployment URL)
- BACKEND_URL=https://your-backend-domain.com (your backend deployment URL)
- FLASK_PORT=9002 (or whatever port your hosting platform uses)

STEP 4: Verify Setup
1. Check console for "🌐 Backend URL configured: ..." message
2. Look for any warnings about placeholder URLs
3. Test API calls in browser developer tools
4. Enable debug console (debugConsole: true) for visual debugging

STEP 5: Common Issues
- Make sure backend URL includes "/api" path
- Use HTTPS for production (required by Telegram)
- Verify CORS is properly configured on backend
- Check that backend is accessible from frontend domain

QUICK START EXAMPLES:

// For GitHub Pages + Railway backend:
baseUrl: 'https://your-app.railway.app/api'

// For GitHub Pages + Fly.io backend:
baseUrl: 'https://your-app.fly.dev/api'

// For Netlify + Heroku backend:
baseUrl: 'https://your-app.herokuapp.com/api'

// For custom domain setup:
baseUrl: 'https://api.yourdomain.com/api'

*/