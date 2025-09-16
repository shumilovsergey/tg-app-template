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
   # Edit back/.env and add your BOT_TOKEN and FRONTEND_URL
   ```

2. **Start backend development**:
   ```bash
   cd back
   docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build
   ```

3. **Serve frontend**:
   - Serve `front/` folder with any static server
   - Deploy to any hosting platform (GitHub Pages, Netlify, Vercel, etc.) for production

4. **Access your app**:
   - Backend API: http://localhost:5000
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