"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


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

    # Asegúrate de que `password` sea una cadena de texto
    password = str(password)

    user = User.query.filter_by(email=email, password=password).first()
    user = user.serialize()
    token = create_access_token(identity=user)
    return jsonify({'token': token, "user": user}), 200



@api.route('/register', methods=['POST'])
def handle_register():
    email = request.json.get('email')
    password = request.json.get('password')
    is_active = request.json.get('is_active', True)  # Por defecto será `True` si no se proporciona.

    # Verificación básica
    if email is None:
        return jsonify({"msg": "Email is required"}), 400
    if password is None:
        return jsonify({"msg": "Password is required"}), 400

    # Asegúrate de que el valor de `is_active` sea un booleano
    if not isinstance(is_active, bool):
        return jsonify({"msg": "'is_active' must be a boolean."}), 400

    # Crear un nuevo usuario o autenticar uno existente
    user = User.query.filter_by(email=email, password=password).first()
    
    if not user:
        # Si no existe un usuario con el email y la contraseña, crear uno nuevo.
        user = User(email=email, password=password, is_active=is_active)
        db.session.add(user)
        db.session.commit()

    # Serializar el usuario
    user_serialized = user.serialize()


    # Responder con el token y los datos del usuario
    return jsonify({ "user": user_serialized}), 200


