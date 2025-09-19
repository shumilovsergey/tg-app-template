/**
 * Centralized configuration for the Telegram App
 * Update this file to configure your backend URL and other settings
 */

window.AppConfig = {
    // API Configuration
    api: {
        baseUrl: window.location.hostname === 'localhost'
            ? 'http://localhost:YOUR_FLASK_PORT/api' // ← CHANGE THIS: Replace YOUR_FLASK_PORT with your actual backend port
            : 'https://your-backend-domain.com/api', // ← CHANGE THIS: Backend API URL with HTTPS and /api path

        // Request timeout in milliseconds
        timeout: 10000,

        // Retry configuration
        maxRetries: 3,
        retryDelay: 1000
    },

    // App Configuration
    app: {
        name: 'Telegram App Template',
        version: '1.0.0',

        // Debug mode (enables console logging and debug console)
        debug: window.location.hostname === 'localhost',

        // Enable visual debug console for Telegram WebApp (set to false for production)
        debugConsole: window.location.hostname === 'localhost',

        // Development mode - bypasses Telegram auth when not in Telegram
        enableDevMode: window.location.hostname === 'localhost',
        devAuthHeader: 'dev-user-bypass',

    },

    // Telegram WebApp Configuration
    telegram: {
        // Auto-expand webapp on startup
        autoExpand: true,

        // Enable haptic feedback
        hapticFeedback: true,

        // Show main button by default
        showMainButton: false
    },


    // UI Configuration
    ui: {
        // Loading animation duration
        loadingDuration: 500,

        // Error display duration
        errorDisplayDuration: 5000
    }
};

// Helper functions for configuration
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

    if (config.api.baseUrl.includes('your-backend-domain.com')) {
        console.warn('⚠️ Please update the backend URL in config.js');
    }

    if (config.api.baseUrl.includes('YOUR_FLASK_PORT')) {
        console.warn('⚠️ Please replace YOUR_FLASK_PORT with your actual backend port (e.g., 5001, 8080, 9002)');
    }

    // Log the configured backend URL for debugging
    console.log('🌐 Backend URL configured:', config.api.baseUrl);

    config.log('Configuration loaded:', config);
})();

// ⚠️ IMPORTANT: PORT CONFIGURATION REMINDER
// If you see "YOUR_FLASK_PORT" in the console log above:
// 1. Replace YOUR_FLASK_PORT with your actual backend port (e.g., 5001, 8080, 9002)
// 2. Make sure it matches the FLASK_PORT in your backend .env file
// 3. Choose an available port to avoid conflicts