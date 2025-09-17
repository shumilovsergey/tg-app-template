# Telegram App Template

Production-ready template for Telegram Web Apps with Flask backend, Redis storage, and auto-generated infrastructure.

## 🚀 Quick Start

1. **Setup Backend**:
   ```bash
   cp back/.env.example back/.env
   # Edit back/.env - set 6 required values:
   # PROJECT_NAME, FLASK_PORT, SECRET_KEY, BOT_TOKEN, FRONTEND_URL, BACKEND_URL
   cd back && docker-compose up -d --build
   ```

2. **Setup Frontend**:
   ```bash
   # Edit front/config.js line 11:
   # Replace 'https://your-backend-domain.com/api' with your backend URL
   # Serve front/ folder with any static server or deploy to hosting
   ```

## 📝 Environment Configuration

### Backend (`back/.env`)
```bash
PROJECT_NAME=myapp              # Your project name
FLASK_PORT=5001                 # Unique port
SECRET_KEY=your-secret-key      # Generate with: python -c "import secrets; print(secrets.token_hex(32))"
BOT_TOKEN=123456:ABC...         # From @BotFather
FRONTEND_URL=https://...        # Your frontend URL
BACKEND_URL=https://...         # Your backend domain
```

### Frontend (`front/config.js`)
```javascript
// Line 11 - Update with your backend URL:
: 'https://your-backend-domain.com/api'
```

## 📡 API Endpoints

### WebApp API (requires Telegram auth)
- `GET /api/user` - Get or create user data
- `POST /api/user` - Update user data
- `GET /api/health` - API health check

### Bot API
- `POST /api/webhook` - Telegram bot webhook (auto-configured)

### General
- `GET /health` - Basic health check

**Authentication**: WebApp endpoints require `X-Telegram-Init-Data` header

## 🏗️ Auto-Generated Infrastructure

From `PROJECT_NAME=myapp`:
- Containers: `myapp-flask`, `myapp-redis`
- Networks: `myapp-private-network`, `myapp-public-network`
- Data: `./redis_data/` folder
- Webhook: `${BACKEND_URL}/api/webhook`

## 📚 Documentation

See [CLAUDE.md](CLAUDE.md) for complete development guide and architecture details.

## 📋 Requirements

- Docker & Docker Compose
- Telegram Bot Token ([@BotFather](https://t.me/BotFather))