"""
tests/api/conftest.py

Description:
    Defines reusable Pytest fixtures for initializing the Flask application in test mode.
    This file is automatically loaded by Pytest and makes the `client` fixture
    available to all test modules in the project.

Key Features:
    - Imports and initializes the app via create_app()
    - Enables test mode with `TESTING = True`
    - Yields a test client instance for simulating HTTP requests

Fixture Exports:
    - client: Flask test client, used for sending requests to API endpoints
"""

import pytest
import sys
import os

# import backend.app
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../backend')))
from app import create_app

@pytest.fixture
def client():
    app = create_app()
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client
