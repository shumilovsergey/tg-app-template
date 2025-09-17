# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is `tg-app-template`, a comprehensive Telegram Web App template with Flask backend, Redis storage, and device-adaptive frontend. The template provides secure user authentication, data management, and Docker deployment with **zero-configuration auto-generation** from a single PROJECT_NAME.

## Quick Start Commands

```bash
# Setup environment (REQUIRED)
cp back/.env.example back/.env
# ⚠️ CRITICAL: Edit back/.env and set 6 required values
# APPLICATION WILL NOT START WITH PLACEHOLDER VALUES

# Production backend deployment
cd back && docker-compose up -d --build

# Development with live reload (if docker-compose.dev.yml exists)
cd back && docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build

# Backend only (without Docker)
cd back && python -m venv venv && source venv/bin/activate && pip install -r requirements.txt && python run.py

# View logs (replace with your container names)
cd back && docker-compose logs -f backend
cd back && docker-compose logs -f redis

# Stop all services
cd back && docker-compose down

# Clean everything (including volumes)
cd back && docker-compose down -v --remove-orphans

# Health checks (replace PORT with your configured FLASK_PORT)
curl http://localhost:PORT/health  # Backend health check
curl http://localhost:PORT/api/health  # API health check
```

## Project Structure

```
├── front/                  # Frontend application
│   ├── index.html         # Main entry point with device detection
│   ├── style.css          # Responsive styles with Telegram theme support
│   ├── config.js          # Centralized configuration (API URLs, settings)
│   ├── app.js             # Main application logic with page loading system
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
│       ├── bot_logic.py   # Telegram bot commands and message handling
│       └── constants.py   # Application constants and configuration
```

## Architecture

### Frontend Features
- **Device Detection**: Automatically detects mobile/tablet/desktop and applies appropriate styles
- **Platform Support**: iOS, Android, macOS, Windows, Linux with platform-specific adjustments
- **Telegram Integration**: Complete WebApp API integration with theme support, haptic feedback, and navigation
- **Responsive Design**: Fullscreen on mobile, windowed on desktop with Telegram theme colors
- **Centralized Configuration**: Single `config.js` file for all settings, API URLs, and app configuration
- **Dynamic Page System**: Modular page loading with automatic HTML/CSS/JS injection
- **Page Management**: Easy navigation between pages with centralized state management

### Backend Features
- **Flask API**: RESTful endpoints for user management and bot webhooks
- **Redis Storage**: Persistent user data with bind-mounted storage outside container
- **Telegram Auth**: Secure validation of Telegram WebApp init data with comprehensive debug logging
- **Bot Logic**: Complete Telegram bot with commands, callbacks, and media handling
- **Message Parsing**: User-friendly message structure from Telegram updates
- **User Management**: Create, read, update, delete operations with data isolation
- **Security**: Each user can only access their own data, input validation, sanitization
- **Auto-Generation**: All Docker names, networks, and URLs auto-generated from PROJECT_NAME
- **Strict Validation**: Zero defaults - application won't start without proper configuration

### Infrastructure
- **Docker Compose**: Multi-container setup with health checks and proper networking
- **Dual Network Architecture**: Public network for Flask port exposure, private network for Flask-Redis communication
- **Redis Isolation**: Redis accessible only via private network with `expose` instead of `ports`
- **Bind Mount Storage**: Redis data stored in `./redis_data/` for safety (excluded from git)
- **Zero Configuration**: All container names, networks, volumes auto-generated from PROJECT_NAME
- **Frontend Ready**: Frontend configured for any hosting platform (GitHub Pages, Netlify, Vercel, etc.)
- **CORS Configuration**: Enhanced CORS with explicit headers and preflight support

## Environment Configuration

Copy `back/.env.example` to `back/.env` and configure **6 REQUIRED VALUES**:

⚠️ **CRITICAL: No Default Values** - The application will NOT start until you replace all `CHANGE-ME` values in `.env`

**Required Configuration (Only 6 values to set!):**
1. `PROJECT_NAME` - Your project identifier (e.g., myapp, telegram-shop)
2. `FLASK_PORT` - Unique port (e.g., 5001, 5002, 8080)
3. `SECRET_KEY` - Generate secure secret key
4. `BOT_TOKEN` - Get from @BotFather
5. `FRONTEND_URL` - Your frontend deployment URL
6. `BACKEND_URL` - Your backend domain

**Auto-Generated from PROJECT_NAME:**
- Container names: `${PROJECT_NAME}-flask`, `${PROJECT_NAME}-redis`
- Networks: `${PROJECT_NAME}-private-network`, `${PROJECT_NAME}-public-network`
- Redis data folder: `./redis_data/` (bind mount, excluded from git)
- Webhook URL: `${BACKEND_URL}/api/webhook` (automatic /api/webhook endpoint)
- Redis port: 6379 (hardcoded, exposed only internally via `expose`)

**Example Configuration:**
```bash
PROJECT_NAME=telegram-shop
FLASK_PORT=5001
SECRET_KEY=abc123...
BOT_TOKEN=123456:ABC...
FRONTEND_URL=https://user.github.io/telegram-shop
BACKEND_URL=https://api.telegram-shop.com
```

**Results in:**
- Containers: `telegram-shop-flask`, `telegram-shop-redis`
- Private network: `telegram-shop-private-network` (Flask↔Redis only, internal: true)
- Public network: `telegram-shop-public-network` (Flask port exposure)
- Redis data: `./redis_data/` directory (bind mount, safe from volume loss)
- Webhook: `https://api.telegram-shop.com/api/webhook` (auto-generated)
- Redis: Port 6379 exposed only internally (no external access possible)

## API Endpoints

### WebApp API (requires Telegram WebApp auth)
- `GET /api/user` - Get or create user data
- `POST /api/user` - Update user data
- `GET /api/health` - API health check

### Bot Webhook API
- `POST /api/webhook` - Telegram bot webhook endpoint

### General Endpoints
- `GET /health` - Basic health check (no auth required)

WebApp endpoints require Telegram WebApp authentication via `X-Telegram-Init-Data` header.
Bot webhook endpoints are called directly by Telegram servers.

## Development Workflow

### Initial Setup
1. **Environment**: Copy `back/.env.example` to `back/.env` and configure 6 required values
2. **Validation**: Application validates all required variables and auto-generates the rest
3. **Verify Setup**: Run `curl http://localhost:YOUR-PORT/health` after starting backend

### Backend Development
1. **Start Backend**: `cd back && docker-compose up --build`
2. **Development Mode**: Use `docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build` if dev compose exists
3. **Backend Access**: Backend API: http://localhost:YOUR-CONFIGURED-PORT
4. **Logs**: `cd back && docker-compose logs -f YOUR-CONTAINER-NAME`

### Configuration Validation
If you see errors like:
```
❌ ERROR: Required environment variable 'PROJECT_NAME' is not set or has placeholder value!
```
This means you need to update that value in your `.env` file.

**Success looks like:**
```
✅ All environment variables validated successfully!
   Project: telegram-shop
   Flask container: telegram-shop-flask (exposed port: 5001)
   Redis container: telegram-shop-redis (internal port: 6379)
   Private network: telegram-shop-private-network
   Public network: telegram-shop-public-network
   Redis data folder: ./redis_data/
   Frontend URL: https://user.github.io/telegram-shop
   Backend URL: https://api.telegram-shop.com
   Webhook URL: https://api.telegram-shop.com/api/webhook
```

### Frontend Development
1. **Configure API URL**: Update backend URL in `front/config.js` (one file only)
2. **Serve Locally**: Use any static server (Live Server, Python SimpleHTTPServer, etc.)
3. **Deploy Frontend**: Push `front/` folder contents to your hosting platform
4. **Add Pages**: Create new page folders in `front/pages/` using the `main` page as template
5. **Page Navigation**: Use `window.app.navigateToPage('pagename')` to switch between pages

### Testing
1. **Health Checks**: `curl http://localhost:YOUR-PORT/health` and `curl http://localhost:YOUR-PORT/api/health`
2. **API Testing**: Use Postman/curl with proper Telegram WebApp headers
3. **Container Status**: `docker ps` to verify your named containers are running

### Integration Testing
1. **Test Locally**: Frontend on localhost + Backend on localhost:YOUR-PORT
2. **Test Production**: Deployed frontend + Deployed backend
3. **Docker Cleanup**: Use your custom volume/network names for cleanup commands
3. **Telegram Testing**: Use Telegram WebApp test environment

## Security Features

- **User Data Isolation**: Each user can only access their own data
- **Input Validation**: All user inputs validated and sanitized
- **Telegram Auth**: Cryptographic validation of WebApp init data
- **Network Isolation**: Redis accessible only to backend
- **No Direct Access**: All database access goes through authenticated API

## Adding New Features

1. **New Frontend Page**:
   - Copy `front/pages/main/` folder to `front/pages/yourpage/`
   - Add page path to `front/config.js` in `pages.paths` object
   - Navigate with `window.app.navigateToPage('yourpage')`
2. **New WebApp API Endpoint**: Add route in `back/app/routes.py` with authentication
3. **New Bot Command**: Add handler in `back/app/bot_logic.py` `BotMessageHandler` class
4. **Database Changes**: Extend `UserManager` class in `back/app/database.py`
5. **Telegram Features**: Use utilities in `front/telegram.js` and `back/app/telegram_utils.py`
6. **Configuration Changes**: Update `front/config.js` for app-wide settings

## Data Management

### Redis Data Location
- **Development**: `./redis_data/` directory in project root
- **Excluded from Git**: Added to `.gitignore` for safety
- **Bind Mount**: Direct folder mapping, survives container recreation
- **Backup**: Simply copy `./redis_data/` folder

### Authentication Fixes Applied
- **Telegram WebApp Auth**: Fixed HMAC validation algorithm
- **CORS Enhancement**: Explicit headers, preflight support
- **Debug Logging**: Comprehensive authentication debugging
- **Error Handling**: Clear error messages for troubleshooting

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
- **Redis Persistence**: Data stored in `./redis_data/` bind mount for maximum safety
- **User Data**: Stored as JSON in Redis with `user_data` field for application-specific data
- **Docker Location**: All Docker files are in `back/` folder
- **Auto-Generation**: All infrastructure auto-generated from PROJECT_NAME
- **Zero Conflicts**: Each project gets unique namespaced resources