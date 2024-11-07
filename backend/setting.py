import os
from pathlib import Path

# Obtenir le répertoire de base du projet (as-business)
BASE_DIR = Path(__file__).resolve(strict=True).parent.parent

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'music',  # Application pour la gestion de la musique
    'webpack_loader',  # Ajouter l'app webpack_loader
    'corsheaders',  # Ajouter corsheaders pour gérer les CORS
]

# Paramètres des templates
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'backend/templates'],  # Répertoire des templates
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

# Paramètres pour les fichiers statiques (JavaScript, CSS, etc.)
STATIC_URL = '/static/'

# Dossier des fichiers statiques générés par React
STATICFILES_DIRS = [
    BASE_DIR / "frontend/build/static",  # Dossier où Webpack place les fichiers compilés
]

# Configuration de Webpack
WEBPACK_LOADER = {
    'DEFAULT': {
        'BUNDLE_DIR_NAME': 'bundles/',  # Dossier où Webpack place les fichiers (nom des bundles)
        'STATS_FILE': BASE_DIR / 'frontend/build/webpack-stats.json',  # Chemin du fichier stats de Webpack
    }
}

# Paramètres pour les fichiers médias (images uploadées, etc.)
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# Sécurité (à ajuster selon ton environnement)
ALLOWED_HOSTS = ['*']  # Ajuste selon ton environnement (dev/production)
CSRF_COOKIE_SECURE = False  # À mettre à True en production si HTTPS est activé

# Ajouter CORS pour autoriser les demandes de React
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # Positionner en première place
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# Configuration de CORS pour autoriser toutes les origines en développement
CORS_ALLOW_ALL_ORIGINS = True  # Ou tu peux spécifier des origines spécifiques avec CORS_ALLOWED_ORIGINS
