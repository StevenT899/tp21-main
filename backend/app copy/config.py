# app/config.py
import configparser
cfg = configparser.ConfigParser()
cfg.read('config.ini')

DB = {
    'host':     cfg.get('mysql', 'host'),
    'user':     cfg.get('mysql', 'user'),
    'password': cfg.get('mysql', 'password'),
    'database': cfg.get('mysql', 'database'),
}

VALID_USERNAME = cfg.get('login', 'username')
VALID_PASSWORD = cfg.get('login', 'password')
