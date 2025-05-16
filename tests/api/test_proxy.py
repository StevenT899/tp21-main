# tests/api/test_proxy.py

def test_place_autocomplete_vic(client):
    response = client.get('/api/proxy/place-autocomplete?input=Melb')
    assert response.status_code == 200
    data = response.get_json()
    assert 'predictions' in data
    for prediction in data['predictions']:
        assert 'VIC' in prediction['description']

def test_geocode_valid_address(client):
    response = client.get('/api/proxy/geocode?address=Melbourne VIC')
    assert response.status_code == 200
    data = response.get_json()
    assert 'results' in data
    if data['results']:
        assert 'geometry' in data['results'][0]
