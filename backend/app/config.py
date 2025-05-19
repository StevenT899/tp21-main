"""
app/config.py

Description:
    Centralized configuration module for Flask application settings.
    This script loads environment variables and INI configuration to define
    database connection parameters, API credentials, and other constants.

Key Features:
    - Loads `.env` variables using python-dotenv
    - Parses values from config.ini (if needed)
    - Defines SQLAlchemy database URI for MariaDB/MySQL
    - Exposes login credentials and third-party API keys for global use

Exports:
    - SQLALCHEMY_DATABASE_URI: Database connection string used by SQLAlchemy
    - SQLALCHEMY_TRACK_MODIFICATIONS: Disable to optimize memory usage
    - VALID_USERNAME / VALID_PASSWORD: Credentials for login verification
    - GOOGLE_API_KEY: Used for Google API proxy endpoints
"""

import configparser
import os
from dotenv import load_dotenv

load_dotenv()
cfg = configparser.ConfigParser()
# cfg.read('config.ini')

config_path = os.path.join(os.path.dirname(__file__), '..', 'config.ini')
cfg.read(os.path.abspath(config_path))

DB = {
    'host':     os.getenv('MYSQL_HOST'),
    'user':     os.getenv('MYSQL_USER'),
    'password': os.getenv('MYSQL_PASSWORD'),
    'database': os.getenv('MYSQL_DATABASE'),
}

SQLALCHEMY_DATABASE_URI = f"mysql+mysqlconnector://{DB['user']}:{DB['password']}@{DB['host']}/{DB['database']}"
SQLALCHEMY_TRACK_MODIFICATIONS = False  # Disable object modification tracking to save memory.

VALID_USERNAME = os.getenv('LOGIN_USERNAME')
VALID_PASSWORD = os.getenv('LOGIN_PASSWORD')

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")