"""
run.py

Description:
    Entry point for running the Flask application in development mode.
    This script creates the app instance using the factory pattern and
    runs it on host 0.0.0.0 to allow external access (e.g., from frontend or API testing tools).

Key Features:
    - Imports the Flask app from app/__init__.py via create_app()
    - Runs the server on port 5000, accessible from any IP (0.0.0.0)
    - Recommended only for local development and testing (use Gunicorn + Nginx in production)
"""

from app import create_app

app = create_app()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
