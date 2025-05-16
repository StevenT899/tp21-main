# tests/api/test_schools.py
def test_get_school_by_id(client):
    # test existed school
    response = client.get('/school/743')
    assert response.status_code == 200
    assert response.json['School_Name'] == "Nunawading Christian College - Primary"

    # test not existed school
    response = client.get('/school/1')
    assert response.status_code == 404