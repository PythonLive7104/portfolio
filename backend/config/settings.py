import os
from pathlib import Path

from dotenv import load_dotenv

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Local dev: load repo root `.env` then `backend/.env` (backend wins).
# In Docker, env comes from Compose `env_file` — must NOT let `/app/.env` override=True stomp those vars
# (a copied `.env` in the image would replace DJANGO_ALLOWED_HOSTS and cause DisallowedHost).
_compose_parent = BASE_DIR.parent
if (_compose_parent / 'docker-compose.yml').exists() or (_compose_parent / 'compose.yml').exists():
    load_dotenv(_compose_parent / '.env')
_docker = Path('/.dockerenv').exists()
load_dotenv(BASE_DIR / '.env', override=not _docker)


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
# Django reads `SECRET_KEY` (not DJANGO_SECRET_KEY). Empty key breaks sessions, CSRF, admin → 500.
_env_secret = (os.environ.get('DJANGO_SECRET_KEY') or os.environ.get('SECRET_KEY') or '').strip()
SECRET_KEY = _env_secret or 'django-insecure-dev-only-change-me'

_debug_raw = (os.environ.get('DJANGO_DEBUG') or 'false').strip().lower()
DEBUG = _debug_raw in ('1', 'true', 'yes', 'on')

# Comma-separated. Must include every Host you use (domain, server IP). Missing host → DisallowedHost.
_allowed = os.environ.get('DJANGO_ALLOWED_HOSTS', 'localhost,127.0.0.1').strip()
ALLOWED_HOSTS = [h.strip() for h in _allowed.split(',') if h.strip()]

# Behind nginx / reverse proxy (correct Host, scheme for CSRF, admin)
USE_X_FORWARDED_HOST = True
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

# Admin login + CSRF when using a public host or IP (Django 4+)
_csrf_extra = os.environ.get('DJANGO_CSRF_TRUSTED_ORIGINS', '').strip()
CSRF_TRUSTED_ORIGINS = [o.strip() for o in _csrf_extra.split(',') if o.strip()]
if not CSRF_TRUSTED_ORIGINS:
    # Safe default for http://your-server-ip during first deploy; override via env for HTTPS domains
    CSRF_TRUSTED_ORIGINS = [f'http://{h}' for h in ALLOWED_HOSTS if h and not h.startswith('.')]

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'cms.apps.CmsConfig',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'


# Database — PostgreSQL only (configure POSTGRES_* in `.env`).
# https://docs.djangoproject.com/en/5.2/ref/settings/#databases
_pg_options = {
    'connect_timeout': int(os.environ.get('POSTGRES_CONNECT_TIMEOUT', '10')),
}
# libpq expects: disable, allow, prefer, require, verify-ca, verify-full.
# Linode / some UIs emit ENABLED or TRUE — map those to require.
_raw_ssl = (os.environ.get('POSTGRES_SSLMODE') or '').strip()
_ssl_norm = _raw_ssl.lower().replace('-', '_')
if _ssl_norm in ('enabled', 'true', 'yes', 'on', '1', 'ssl'):
    _postgres_sslmode = 'require'
elif _raw_ssl:
    _postgres_sslmode = _raw_ssl
else:
    _postgres_sslmode = ''
if _postgres_sslmode:
    _pg_options['sslmode'] = _postgres_sslmode

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('POSTGRES_DB', 'portfolio'),
        'USER': os.environ.get('POSTGRES_USER', 'portfolio'),
        'PASSWORD': os.environ.get('POSTGRES_PASSWORD', ''),
        'HOST': os.environ.get('POSTGRES_HOST', 'localhost'),
        'PORT': os.environ.get('POSTGRES_PORT', '5432'),
        'CONN_MAX_AGE': int(os.environ.get('POSTGRES_CONN_MAX_AGE', '0')),
        'OPTIONS': _pg_options,
    }
}


# Password validation
# https://docs.djangoproject.com/en/5.2/ref/settings/#auth-password-validators

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


# Internationalization
# https://docs.djangoproject.com/en/5.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.2/howto/static-files/

STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# Admin uploads (image + PDF). Django default is 2.5MB; nginx uses client_max_body_size 25M.
_data_upload_max = int(os.environ.get('DJANGO_DATA_UPLOAD_MAX_BYTES', str(26 * 1024 * 1024)))
DATA_UPLOAD_MAX_MEMORY_SIZE = _data_upload_max
FILE_UPLOAD_MAX_MEMORY_SIZE = min(10 * 1024 * 1024, _data_upload_max)

# API media URLs: if unset, serializers return path-only "/media/..." so the browser uses the same
# host as the SPA (nginx). That fixes images on the landing page when build_absolute_uri() would
# otherwise use an internal Docker hostname (e.g. http://backend:8000/media/...).
# Set to your public origin if needed, e.g. https://yourdomain.com (no trailing slash).
PUBLIC_BASE_URL = os.environ.get('DJANGO_PUBLIC_BASE_URL', '').strip().rstrip('/')
MEDIA_USE_RELATIVE_URLS = os.environ.get('DJANGO_MEDIA_USE_RELATIVE_URLS', 'true').strip().lower() in (
    '1',
    'true',
    'yes',
    'on',
)

_cors = os.environ.get('DJANGO_CORS_ORIGINS', '').strip()
if _cors:
    CORS_ALLOWED_ORIGINS = [o.strip() for o in _cors.split(',') if o.strip()]
else:
    CORS_ALLOWED_ORIGINS = [
        'http://127.0.0.1:5173',
        'http://localhost:5173',
    ]
CORS_ALLOW_CREDENTIALS = True

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 50,
}

# Default primary key field type
# https://docs.djangoproject.com/en/5.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Surface tracebacks in `docker compose logs backend` when DEBUG is False.
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '[{levelname}] {asctime} {name} {message}',
            'style': '{',
        },
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'verbose',
        },
    },
    'root': {'handlers': ['console'], 'level': 'INFO'},
    'loggers': {
        'django': {'handlers': ['console'], 'level': 'INFO', 'propagate': False},
        'django.request': {'handlers': ['console'], 'level': 'ERROR', 'propagate': False},
    },
}
