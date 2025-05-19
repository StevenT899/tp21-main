"""
app/extensions.py

Description:
    Initializes and exposes shared Flask extensions for use across the application.
    Currently includes the SQLAlchemy instance used for database operations.

Key Features:
    - Centralizes extension creation for cleaner application factory pattern
    - Exports `db` as the shared SQLAlchemy database object
"""

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()