from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
import re

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


def is_valid_email(email):
    regex = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
    return re.match(regex, email) is not None


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200


@api.route('/token', methods=['POST'])
def handle_token():
    email = request.json.get('email')
    password = request.json.get('password')

    if email is None:
        return jsonify({"msg": "Email is required"}), 400
    if password is None:
        return jsonify({"msg": "Password is required"}), 400

    user = User.query.filter_by(email=email, password=password).first()
    if not user:
        return jsonify({"msg": "User not found"}), 404

    user = user.serialize()  # Asumiendo que esto devuelve un diccionario

    # Asegurar que solo el ID se use como identity
    token = create_access_token(identity=str(user["id"]))

    return jsonify({'token': token, "user": user}), 200


@api.route('/register', methods=['POST'])
def handle_register():
    email = request.json.get('email')
    password = request.json.get('password')
    is_active = request.json.get('is_active', True)

    if email is None or not is_valid_email(email):
        return jsonify({"msg": "Invalid email"}), 400
    if password is None or len(password) < 8:
        return jsonify({"msg": "Password must be at least 8 characters long"}), 400
    if not isinstance(is_active, bool):
        return jsonify({"msg": "'is_active' must be a boolean."}), 400

    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({"msg": "User already exists"}), 409

    user = User(email=email, password=password, is_active=is_active)
    db.session.add(user)
    db.session.commit()

    user_serialized = user.serialize()
    return jsonify({"user": user_serialized}), 200


@api.route('/user', methods=['GET'])
@jwt_required()
def handle_user():
    id_user = get_jwt_identity()

    # Verificar qué valor tiene id_user
    print(f"ID del usuario extraído del token: {id_user}")

    # Asegurar que sea una cadena antes de consultar la DB
    if not isinstance(id_user, str):
        return jsonify({"error": "Subject must be a string"}), 400

    user = User.query.get(id_user)
    if not user:
        return jsonify({"msg": "User not found"}), 404

    return jsonify({"user": user.serialize()}), 200


@api.errorhandler(Exception)
def handle_exception(e):
    return jsonify({"msg": "An error occurred", "error": str(e)}), 500
