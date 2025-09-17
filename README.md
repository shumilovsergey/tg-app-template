# Telegram App Template

A comprehensive template for building Telegram Web Apps with Flask backend, Redis storage, and device-adaptive frontend.

## Features

✅ **Device Detection** - Mobile/tablet/desktop with platform-specific styles
✅ **Telegram Integration** - Complete WebApp API with theme support and haptic feedback
✅ **Secure Authentication** - Telegram user validation with data isolation
✅ **Redis Storage** - Persistent user data in isolated network
✅ **Docker Deployment** - Production-ready multi-container setup
✅ **Development Mode** - Live reload and debugging support

## Quick Start

1. **Clone and configure**:
   ```bash
   git clone <this-repo>
   cd tg-app-template
   cp back/.env.example back/.env
   # ⚠️ IMPORTANT: Edit back/.env and set these 6 required values:
   # PROJECT_NAME, FLASK_PORT, SECRET_KEY, BOT_TOKEN, FRONTEND_URL, BACKEND_URL
   # Everything else is auto-generated!
   ```

2. **Start backend development**:
   ```bash
   cd back
   docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build
   ```

3. **Configure frontend API URL**:
   Update backend URL in one place only:
   - `front/config.js` (line 11)

   Replace `https://your-backend-domain.com/api` with your actual backend URL.

4. **Serve frontend**:
   - Serve `front/` folder with any static server
   - Deploy to any hosting platform (GitHub Pages, Netlify, Vercel, etc.) for production

5. **Access your app**:
   - Backend API: http://localhost:YOUR-CONFIGURED-PORT
   - Frontend: Wherever you serve the `front/` folder

## Structure

- `front/` - Frontend ready for any hosting platform deployment
- `back/` - Backend Flask API with Docker setup and Redis storage
- `back/docker-compose.yml` - Backend production deployment
- `back/docker-compose.dev.yml` - Development overrides

## Documentation

See [CLAUDE.md](CLAUDE.md) for complete development guide, API documentation, and architecture details.

## Requirements

- Docker and Docker Compose
- Telegram Bot Token (from @BotFather)

## License

MIT