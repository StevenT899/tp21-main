"""
app/__init__.py

Description:
    Application factory module for initializing the Flask app instance.
    This script sets up the core backend services, including:
    - CORS support
    - Blueprint registration
    - Configuration loading from config.ini
    - Database initialization with SQLAlchemy
    - Migration setup with Flask-Migrate

Key Components:
    - create_app(): Factory function that returns a configured Flask app instance
    - CORS: Enables cross-origin requests for frontend-backend integration
    - config.ini: Externalized configuration for environment-specific settings
    - db (SQLAlchemy): Shared database instance initialized here
    - bp (Blueprint): API routing logic imported from app.routes
"""

from flask import Flask
from flask_cors import CORS
from .routes import bp
import configparser
from .extensions import db
from flask_migrate import Migrate
import os

# Load configuration settings from config.ini
config = configparser.ConfigParser()

config_path = os.path.join(os.path.dirname(__file__), '..', 'config.ini')
config.read(os.path.abspath(config_path))
# config.read('config.ini')

url_prefix = config.get('app', 'url_prefix', fallback='/')

# Initialize database and migration components
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config.from_object('app.config')  # Load application settings from the config module
    CORS(app, resources={r"/*": {"origins": "*"}})
    db.init_app(app)
    migrate.init_app(app, db)  # Initialize database migration capabilities
    app.register_blueprint(bp, url_prefix=url_prefix)
    return app
