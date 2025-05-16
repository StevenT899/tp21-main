# tests/api/test_auth.py
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
