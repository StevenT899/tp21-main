"""
test_proxy.py

Description:
    Unit tests for proxy endpoints that wrap external Google APIs.
    These tests ensure the backend correctly handles and filters responses
    from Google Places Autocomplete and Geocoding services.

Test Cases:
    - test_place_autocomplete_vic:
        Verifies that autocomplete results include only predictions containing 'VIC'
    - test_geocode_valid_address:
        Confirms that a valid address returns structured location data with geometry
"""

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
