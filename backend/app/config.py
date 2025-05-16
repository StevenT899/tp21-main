# app/config.py
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