# Telegram Mini App Template

Quick start template for Telegram Mini App development with Docker-composed Python backend (Flask + Redis) and static frontend. Includes pre-configured backend with CORS, dev user for local testing, environment management, and GitHub Actions for automatic frontend deployment.


## Backend - Docker Compose

**Stack**: Flask + Redis
**Features**: CORS enabled, dev user for local testing, environment-based configuration

```bash
cd back
cp .env.example .env  # Configure your variables
docker-compose up -d --build
```

## Frontend - GitHub Actions

**Local**: Use 'dev' env + dev redis user (no CORS)
**Production**: Push to `main` branch -> auto-deploy to GitHub Pages ( auto change to 'prod' env)

**Setup**: Configure GitHub Pages source to "GitHub Actions" in repository settings.

## API Routes

### User Management (Production - requires Telegram auth)
- `POST /api/user/get_data` - Get/create user data
- `POST /api/user/up_data` - Update user data

### Development (Local - no auth required)
- `POST /api/dev/get_data` - Get/create dev user
- `POST /api/dev/up_data` - Update dev user data

### Health & Bot
- `GET /health` - Health check
- `GET /api/health` - API health + Redis status
- `POST /api/webhook` - Telegram bot webhook

## Quick Start

1. **Backend**: `cd back && cp .env.example .env` -> edit variables -> `docker-compose up -d --build`
2. **Frontend**: Push to main branch for auto-deployment to GitHub Pages
3. **GitHub Pages**: Set source to "GitHub Actions" in repo settings