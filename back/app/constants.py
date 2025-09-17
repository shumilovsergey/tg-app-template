"""
Application constants loaded from environment variables
NO DEFAULT VALUES - All values must be explicitly configured
"""

import os
import sys
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

def get_required_env(var_name: str) -> str:
    """Get required environment variable or exit with error"""
    value = os.getenv(var_name)
    if not value or value.startswith('CHANGE-ME'):
        print(f"❌ ERROR: Required environment variable '{var_name}' is not set or has placeholder value!")
        print(f"   Please configure '{var_name}' in your .env file")
        print(f"   Copy .env.example to .env and update all CHANGE-ME values")
        sys.exit(1)
    return value

def get_required_env_int(var_name: str) -> int:
    """Get required environment variable as integer or exit with error"""
    value = get_required_env(var_name)
    try:
        return int(value)
    except ValueError:
        print(f"❌ ERROR: Environment variable '{var_name}' must be a valid integer!")
        print(f"   Current value: '{value}'")
        sys.exit(1)

def validate_project_name(project_name: str) -> str:
    """Validate project name format"""
    if not project_name.replace('-', '').replace('_', '').isalnum():
        print(f"❌ ERROR: PROJECT_NAME '{project_name}' contains invalid characters!")
        print("   Use only lowercase letters, numbers, hyphens, and underscores")
        print("   Examples: myapp, telegram-shop, crypto_bot")
        sys.exit(1)
    return project_name.lower()

# Core Configuration (REQUIRED)
PROJECT_NAME = validate_project_name(get_required_env('PROJECT_NAME'))
SECRET_KEY = get_required_env('SECRET_KEY')
BOT_TOKEN = get_required_env('BOT_TOKEN')

# Flask Configuration
FLASK_HOST = '0.0.0.0'  # Hardcoded - no need to configure
FLASK_PORT = get_required_env_int('FLASK_PORT')
FLASK_DEBUG = os.getenv('FLASK_DEBUG', 'False').lower() == 'true'

# URL Configuration (REQUIRED)
FRONT_URL = get_required_env('FRONTEND_URL')
BACKEND_URL = get_required_env('BACKEND_URL')

# Auto-generated Docker Configuration
FLASK_CONTAINER_NAME = f"{PROJECT_NAME}-flask"
REDIS_CONTAINER_NAME = f"{PROJECT_NAME}-redis"
PRIVATE_NETWORK_NAME = f"{PROJECT_NAME}-private-network"
PUBLIC_NETWORK_NAME = f"{PROJECT_NAME}-public-network"
REDIS_VOLUME_NAME = f"{PROJECT_NAME}-redis-data"

# Auto-generated URLs and Ports
WEBHOOK_URL = f"{BACKEND_URL}/api/webhook"
REDIS_PORT = 6379  # Hardcoded - isolated in container, no conflicts possible
REDIS_URL = f"redis://{REDIS_CONTAINER_NAME}:{REDIS_PORT}/0"

# Optional Configuration
SHUMILOV_WEBSITE = os.getenv('SHUMILOV_WEBSITE', 'https://sh-development.ru')

# CORS Configuration
def parse_cors_origins() -> list:
    """Parse CORS origins from environment variable"""
    cors_origins = []

    # Always include the frontend URL (required)
    cors_origins.extend([
        FRONT_URL,
        FRONT_URL.rstrip('/'),  # Without trailing slash
    ])

    # Add default development origins
    cors_origins.extend([
        'http://localhost:8080',
        'http://127.0.0.1:8080',
        'https://localhost:8080',
        'http://localhost:3000',  # Common React dev server
        'http://127.0.0.1:3000',
        'http://localhost:5173',  # Vite dev server
        'http://127.0.0.1:5173'
    ])

    # Parse additional CORS origins from environment (optional)
    additional_origins = os.getenv('CORS_ORIGINS', '').strip()
    if additional_origins:
        # Split by comma and clean up whitespace
        extra_origins = [origin.strip() for origin in additional_origins.split(',') if origin.strip()]
        cors_origins.extend(extra_origins)
        print(f"📡 Additional CORS origins: {extra_origins}")

    # Remove duplicates while preserving order
    seen = set()
    unique_origins = []
    for origin in cors_origins:
        if origin not in seen:
            seen.add(origin)
            unique_origins.append(origin)

    return unique_origins

ALLOWED_ORIGINS = parse_cors_origins()

# Telegram API Base URL
TELEGRAM_API_BASE = f"https://api.telegram.org/bot{BOT_TOKEN}"

print("✅ All environment variables validated successfully!")
print(f"   Project: {PROJECT_NAME}")
print(f"   Flask container: {FLASK_CONTAINER_NAME} (exposed port: {FLASK_PORT})")
print(f"   Redis container: {REDIS_CONTAINER_NAME} (internal port: {REDIS_PORT})")
print(f"   Private network: {PRIVATE_NETWORK_NAME}")
print(f"   Public network: {PUBLIC_NETWORK_NAME}")
print(f"   Volume: {REDIS_VOLUME_NAME}")
print(f"   Frontend URL: {FRONT_URL}")
print(f"   Backend URL: {BACKEND_URL}")
print(f"   Webhook URL: {WEBHOOK_URL}")
print(f"📡 CORS allowed origins ({len(ALLOWED_ORIGINS)}):")
for i, origin in enumerate(ALLOWED_ORIGINS, 1):
    print(f"   {i}. {origin}")