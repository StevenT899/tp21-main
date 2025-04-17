from flask import Blueprint, jsonify, request
from .dao import fetch_all_schools, fetch_school_by_id
from .config import VALID_USERNAME, VALID_PASSWORD

bp = Blueprint('api', __name__)

@bp.route('/schools')
def get_schools():
    return jsonify(fetch_all_schools())

@bp.route('/school/<int:sid>')
def get_school(sid):
    school = fetch_school_by_id(sid)
    if not school:
        return jsonify({'error':'not found'}), 404
    return jsonify(school)

@bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if data.get('username') == VALID_USERNAME and data.get('password') == VALID_PASSWORD:
        return jsonify(success=True, message='Login successful')
    return jsonify(success=False, message='Invalid credentials'), 401
