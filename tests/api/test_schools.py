"""
test_schools.py

Description:
    Unit tests for the /school/<id> endpoint, which retrieves detailed information
    for a specific school by its AGE ID.

Test Cases:
    - test_get_school_by_id:
        Verifies that a known school ID returns correct data and
        that an unknown ID returns a 404 error.
"""

def test_get_school_by_id(client):
    # test existed school
    response = client.get('/school/743')
    assert response.status_code == 200
    assert response.json['School_Name'] == "Nunawading Christian College - Primary"

    # test not existed school
    response = client.get('/school/1')
    assert response.status_code == 404