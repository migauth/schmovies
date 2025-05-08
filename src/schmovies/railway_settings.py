"""
Simplified Django settings for Railway.app deployment.
"""

import os
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('SECRET_KEY', 'django-insecure-d%xu6!rp-8lq=7m9szn(b3d^4cx3$mdm!o8v0#kf3+@4yw%e=v')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.environ.get('DEBUG', 'False') == 'True'

ALLOWED_HOSTS = ['*']

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'movies',
    'rest_framework',
    'corsheaders',
    'quiz',
    'users'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'schmovies.middleware.SimpleMoviesMiddleware',  # Special middleware for movies endpoint
    'schmovies.middleware.CorsMiddleware',  # Custom CORS middleware as a fallback
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'schmovies.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'schmovies.wsgi.application'

# Database configuration for Railway
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('DB_NAME', 'postgres'),
        'USER': os.environ.get('DB_USER', 'postgres'),
        'PASSWORD': os.environ.get('DB_PASSWORD', 'postgres'),
        'HOST': os.environ.get('DB_HOST', 'localhost'),
        'PORT': os.environ.get('DB_PORT', '5432'),
    }
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# AUTH_USER_MODEL
AUTH_USER_MODEL = 'auth.User'

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Static files settings
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# Media settings
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# CORS Configuration
CORS_ALLOW_ALL_ORIGINS = True  # This will allow any origin
CORS_ALLOW_CREDENTIALS = True

# These specific origins are also explicitly allowed
# This is a backup in case CORS_ALLOW_ALL_ORIGINS is not working
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "https://schmovies.netlify.app",
    "https://schmovies-app.netlify.app",
    "https://schmovieslive.netlify.app",
]

# Additional CORS settings
CORS_ALLOW_METHODS = [
    "DELETE",
    "GET",
    "OPTIONS",
    "PATCH",
    "POST",
    "PUT",
]

CORS_ALLOW_HEADERS = [
    "accept",
    "accept-encoding",
    "authorization",
    "content-type",
    "dnt",
    "origin",
    "user-agent",
    "x-csrftoken",
    "x-requested-with",
]

# API Keys - for movie data
TMDB_API_KEY = os.environ.get('TMDB_API_KEY', '')
OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY', '')

# Database configuration - special handling for Railway
if os.environ.get('RAILWAY_ENVIRONMENT'):
    import dj_database_url
    DATABASES = {
        'default': dj_database_url.config(default='postgresql://postgres:postgres@localhost:5432/postgres')
    }
    
    # Log the database configuration (without password)
    db_config = dict(DATABASES['default'])
    if 'PASSWORD' in db_config:
        db_config['PASSWORD'] = '********'
    print(f"Database configuration on Railway: {db_config}")
    
    # Allow the Railway domain
    ALLOWED_HOSTS.append('.up.railway.app')
    
# Configure logging for better debugging
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '{levelname} {asctime} {module} {process:d} {thread:d} {message}',
            'style': '{',
        },
        'simple': {
            'format': '{levelname} {message}',
            'style': '{',
        },
    },
    'handlers': {
        'console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
            'formatter': 'verbose',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'level': 'INFO',
            'propagate': True,
        },
        'schmovies': {
            'handlers': ['console'],
            'level': 'DEBUG',
            'propagate': True,
        },
        'movies': {
            'handlers': ['console'],
            'level': 'DEBUG',
            'propagate': True,
        },
        'quiz': {
            'handlers': ['console'],
            'level': 'DEBUG',
            'propagate': True,
        },
        'users': {
            'handlers': ['console'],
            'level': 'DEBUG',
            'propagate': True,
        },
    },
}