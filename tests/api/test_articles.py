"""
test_articles.py

Description:
    Unit tests for the /articles endpoints of the SchoolMate backend.
    These tests verify that article data can be retrieved correctly and
    that the system handles invalid IDs appropriately.

Test Cases:
    - test_list_articles: Ensures the /articles endpoint returns a list with expected fields
    - test_get_article_by_id_valid: Verifies valid article ID returns correct fields or 404
    - test_get_article_by_id_invalid: Verifies invalid ID returns 404 or error
"""

def test_list_articles(client):
    response = client.get('/articles')
    assert response.status_code == 200
    articles = response.get_json()
    assert isinstance(articles, list)
    if articles:
        assert 'ID' in articles[0]
        assert 'topic' in articles[0]
        assert 'content' in articles[0]

def test_get_article_by_id_valid(client):
    response = client.get('/articles/1')
    if response.status_code == 200:
        article = response.get_json()
        assert 'ID' in article
        assert 'topic' in article
        assert 'content' in article
    elif response.status_code == 404:
        assert response.get_json()['error'] == 'not found'

def test_get_article_by_id_invalid(client):
    response = client.get('/articles/999999')
    assert response.status_code in (404, 500)
