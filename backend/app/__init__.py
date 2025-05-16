# app/__init__.py
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
