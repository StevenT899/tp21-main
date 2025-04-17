# app/__init__.py
from flask import Flask
from flask_cors import CORS
from .routes import bp
import configparser

config = configparser.ConfigParser()
config.read('config.ini')
url_prefix = config.get('app', 'url_prefix', fallback='/')

def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "*"}})
    app.register_blueprint(bp, url_prefix=url_prefix)
    return app
