# tests/api/test_articles.py
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
