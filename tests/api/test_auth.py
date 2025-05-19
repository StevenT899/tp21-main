"""
test_auth.py

Description:
    Unit tests for the /login endpoint of the SchoolMate backend.
    These tests verify authentication logic using correct and incorrect credentials.

Test Cases:
    - test_login_success: Simulates a successful login with valid username and password
    - test_login_failure: Simulates login attempt with incorrect credentials and expects a 401 response
"""

def test_login_success(client):
    response = client.post('/login', json={
        'username': 'user',
        'password': 'tp21-newbee'
    })
    assert response.status_code == 200
    data = response.get_json()
    assert data['success'] is True
    assert data['message'] == 'Login successful'


def test_login_failure(client):
    response = client.post('/login', json={
        'username': 'wrong',
        'password': 'wrong'
    })
    assert response.status_code == 401
    data = response.get_json()
    assert data['success'] is False
    assert data['message'] == 'Invalid credentials'
