# app/routes.py
from flask import Blueprint, jsonify, request
import requests
from .dao import fetch_all_schools, fetch_all_zone_schools, fetch_zone_schools_by_name, fetch_school_by_id,fetch_all_articles,fetch_article_by_id, fetch_search_result
from .config import VALID_USERNAME, VALID_PASSWORD, GOOGLE_API_KEY

bp = Blueprint('api', __name__)

@bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if data.get('username') == VALID_USERNAME and data.get('password') == VALID_PASSWORD:
        return jsonify(success=True, message='Login successful')
    return jsonify(success=False, message='Invalid credentials'), 401

@bp.route('/schools')
def get_schools():
    return jsonify(fetch_all_schools())

@bp.route('/zoneSchools')
def get_zone_schools():
    return jsonify(fetch_all_zone_schools())

@bp.route('/school/zone')
def get_zone_schools_by_name():
    name = request.args.get('name')
    if not name:
        return jsonify({"error": "Missing 'name' parameter"}), 400
    return jsonify(fetch_zone_schools_by_name(name))

@bp.route('/api/proxy/place-autocomplete', methods=['GET'])
def place_autocomplete():
    input_data = request.args.get('input')
    components = 'country:au'
    url = f'https://maps.googleapis.com/maps/api/place/autocomplete/json?input={input_data}&key={GOOGLE_API_KEY}&types=geocode&components={components}'
    response = requests.get(url)
    data = response.json()

    # filter only in VIC
    filtered_predictions = []
    if data.get('status') == 'OK':
        for prediction in data.get('predictions', []):
            if 'VIC' in prediction.get('description', ''):
                filtered_predictions.append(prediction)
        data['predictions'] = filtered_predictions

    return jsonify(data)

@bp.route('/api/proxy/geocode', methods=['GET'])
def geocode():
    address = request.args.get('address')
    url = f'https://maps.googleapis.com/maps/api/geocode/json?address={address}&key={GOOGLE_API_KEY}'
    response = requests.get(url)
    return jsonify(response.json())

@bp.route('/school/<int:sid>')
def get_school(sid):
    school = fetch_school_by_id(sid)
    if not school:
        return jsonify({'error':'not found'}), 404
    return jsonify(school)

@bp.route('/articles')
def list_articles():
    return jsonify(fetch_all_articles())

@bp.route('/articles/<int:article_id>')
def get_article(article_id):
    article = fetch_article_by_id(article_id)
    if not article:
        return jsonify({'error': 'not found'}), 404
    
    return jsonify({
        'ID':        article.ID,
        'topic':     article.topic,
        'content':   article.content,
        'reference': article.reference,
        'licence':   article.licence
    })

@bp.route('/return-articles', methods=['POST'])
def filter_articles():
    data = request.get_json()
    query = data.get('query', '').lower()
    articles = data.get('articles', [])
    result = fetch_search_result(query, articles)
    return jsonify(result), 200