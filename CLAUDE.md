# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is `tg-app-template`, a comprehensive Telegram Web App template with Flask backend, Redis storage, and device-adaptive frontend. The template provides secure user authentication, data management, and Docker deployment.

## Quick Start Commands

```bash
# Production backend deployment
cd back
docker-compose up -d --build

# Backend only (for API development without Docker)
cd back && python -m venv venv && source venv/bin/activate && pip install -r requirements.txt && python run.py

# View logs
cd back && docker-compose logs -f backend
cd back && docker-compose logs -f redis

# Stop all services
cd back && docker-compose down

# Clean everything (including volumes)
cd back && docker-compose down -v --remove-orphans
```

## Project Structure

```
├── front/                  # Frontend application
│   ├── index.html         # Main entry point with device detection
│   ├── style.css          # Responsive styles with Telegram theme support
│   ├── app.js             # Main application logic
│   ├── telegram.js        # Telegram WebApp initialization and utilities
│   ├── assets/            # Welcome page assets (logo, icons)
│   └── pages/             # Page templates
│       └── main/          # Example main page
│           ├── index.html
│           ├── style.css
│           └── app.js
├── back/                   # Backend Flask application
│   ├── run.py             # Application entry point
│   ├── requirements.txt   # Python dependencies
│   ├── Dockerfile         # Backend container
│   ├── .env.example       # Environment variables template
│   ├── docker-compose.yml # Backend Docker setup
│   ├── .dockerignore      # Docker ignore file
│   └── app/
│       ├── __init__.py    # Flask app factory
│       ├── routes.py      # API endpoints (WebApp + Bot webhook)
│       ├── database.py    # Redis connection and user management
│       ├── telegram_utils.py # Telegram auth, validation, and message parsing
│       └── bot_logic.py   # Telegram bot commands and message handling
```

## Architecture

### Frontend Features
- **Device Detection**: Automatically detects mobile/tablet/desktop and applies appropriate styles
- **Platform Support**: iOS, Android, macOS, Windows, Linux with platform-specific adjustments
- **Telegram Integration**: Complete WebApp API integration with theme support, haptic feedback, and navigation
- **Responsive Design**: Fullscreen on mobile, windowed on desktop with Telegram theme colors
- **Page System**: Modular page structure in `front/pages/` with template for easy expansion

### Backend Features
- **Flask API**: RESTful endpoints for user management and bot webhooks
- **Redis Storage**: Persistent user data with isolated network access
- **Telegram Auth**: Secure validation of Telegram WebApp init data
- **Bot Logic**: Complete Telegram bot with commands, callbacks, and media handling
- **Message Parsing**: User-friendly message structure from Telegram updates
- **User Management**: Create, read, update, delete operations with data isolation
- **Security**: Each user can only access their own data, input validation, sanitization

### Infrastructure
- **Docker Compose**: Backend-only multi-container setup with health checks
- **Redis Isolation**: Redis runs in isolated network, only backend can access
- **Persistent Storage**: Redis data persisted to Docker volume
- **Frontend Ready**: Frontend configured for any hosting platform (GitHub Pages, Netlify, Vercel, etc.)
- **CORS Configuration**: Supports frontend origins and development

## Environment Configuration

Copy `back/.env.example` to `back/.env` and configure:

```bash
# Required for production
BOT_TOKEN=your-telegram-bot-token-here
SECRET_KEY=your-secure-secret-key

# Frontend URL Configuration
FRONTEND_URL=https://yourusername.github.io

# Optional (has defaults)
FLASK_HOST=0.0.0.0
FLASK_PORT=5000
FLASK_DEBUG=false
REDIS_URL=redis://redis:6379/0
```

## API Endpoints

### WebApp API (requires Telegram WebApp auth)
- `GET /api/user` - Get or create user data
- `POST /api/user` - Update user data
- `GET /api/health` - API health check

### Bot Webhook API
- `POST /api/webhook` - Telegram bot webhook endpoint

WebApp endpoints require Telegram WebApp authentication via `X-Telegram-Init-Data` header.
Bot webhook endpoints are called directly by Telegram servers.

## Development Workflow

### Backend Development
1. **Setup**: Copy `back/.env.example` to `back/.env` and configure bot token
2. **Start Backend**: `cd back && docker-compose up --build`
3. **Backend Access**: Backend API: http://localhost:5000

### Frontend Development
1. **Serve Locally**: Use any static server (Live Server, Python SimpleHTTPServer, etc.)
2. **Deploy Frontend**: Push `front/` folder contents to your hosting platform (GitHub Pages, Netlify, Vercel, etc.)
3. **Update API URLs**: Set backend URL in `front/app.js` and `front/pages/*/app.js`
4. **Add Pages**: Create new page folders in `front/pages/` using the `main` page as template

### Integration Testing
1. **Test Locally**: Frontend on localhost + Backend on localhost:5000
2. **Test Production**: Deployed frontend + Deployed backend
3. **Telegram Testing**: Use Telegram WebApp test environment

## Security Features

- **User Data Isolation**: Each user can only access their own data
- **Input Validation**: All user inputs validated and sanitized
- **Telegram Auth**: Cryptographic validation of WebApp init data
- **Network Isolation**: Redis accessible only to backend
- **No Direct Access**: All database access goes through authenticated API

## Adding New Features

1. **New Frontend Page**: Copy `front/pages/main/` folder, modify content
2. **New WebApp API Endpoint**: Add route in `back/app/routes.py` with authentication
3. **New Bot Command**: Add handler in `back/app/bot_logic.py` `BotMessageHandler` class
4. **Database Changes**: Extend `UserManager` class in `back/app/database.py`
5. **Telegram Features**: Use utilities in `front/telegram.js` and `back/app/telegram_utils.py`

## Bot Setup

### Setting Up Webhook
Set webhook URL in your `.env` file and use Telegram Bot API directly or BotFather to configure webhook endpoint at `/api/webhook`.

### Bot Commands Available
- `/start` - Welcome message with web app button
- `/help` - Show available commands

### Bot Features
- **Message Parsing**: User-friendly `Message` class with all user/chat data
- **Clean Chat**: Automatic deletion of irrelevant messages, keeps chat clean
- **Command Protection**: Critical commands like `/start` are protected from deletion
- **Web App Integration**: Seamless transition between bot and web app
- **User Management**: Automatic user creation/retrieval from database

## Deployment

### Frontend (Any Hosting Platform)
1. Push `front/` folder contents to your hosting platform (GitHub Pages, Netlify, Vercel, etc.)
2. Configure your hosting platform settings
3. Update API URLs in JavaScript files to point to your backend

### Backend (Docker)
1. Deploy `back/` folder to your server
2. Set environment variables (especially `BOT_TOKEN` and `FRONTEND_URL`)
3. Run `docker-compose up -d --build`
4. Ensure port 5000 is accessible from frontend origin

## Important Notes

- **Bot Token Required**: Set `BOT_TOKEN` environment variable for authentication
- **CORS Configuration**: Set `FRONTEND_URL` to your frontend domain
- **API URLs**: Update frontend JavaScript files with your backend URL
- **Redis Persistence**: Data stored in Docker volume `tg-app-redis-data`
- **User Data**: Stored as JSON in Redis with `user_data` field for application-specific data
- **Docker Location**: All Docker files are in `back/` folder