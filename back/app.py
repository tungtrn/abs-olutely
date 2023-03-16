from flask import Flask, request, Blueprint, globals
from config import ConfigApp, Config
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from marshmallow import Schema, fields, ValidationError, validates
import re
import firebase_admin
from firebase_admin import auth, credentials, firestore
import bcrypt
import functools
import time
import openai

import utils

app = Flask(__name__)

cors = CORS(app)
jwt = JWTManager(app=app)

cred = credentials.Certificate(ConfigApp.fb_cred_name)
firebase_admin.initialize_app(cred)
db = firestore.client()

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config['CORS_HEADERS'] = ['Content-Type']
app.config['CORS_ORIGINS'] = ['*']
app.config['CORS_SUPPORTS_CREDENTIALS'] = True

prefix_url = "/api/v1"
# Config application
@app.errorhandler(500)
def internal_error(e):
    print(e)
    message = {"message": Config.internal_error}
    return message

auth_bp = Blueprint("api_auth", __name__)

def authorize_decorator(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        if not "Authorization" in request.headers:
            message = utils.create_message(None, "missing authorization header", 400)
            return message, message["status_code"]
        header = request.headers.get("Authorization")
        payload = utils.process_authorization(header)
        if not payload:
            message = utils.create_message(None, "invalid authorization header", 400)
            return message, message["status_code"]
        request.payload = payload
        return func(*args, **kwargs)
    return wrapper


class AuthSchema(Schema):
    email = fields.String(required=True)
    password = fields.String(required=True)

    @validates("email")
    def is_valid_email(self, email):
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not bool(re.match(pattern, email)):
            raise ValidationError("email not in the correct format")
    
    @validates("password")
    def is_valid_password(self, password):
        pattern = r"^(?=.*[A-Z])(?=.*[\W_]).{8,}$"
        # The pattern requires:
        #  - (?=.*[A-Z]) at least one uppercase letter
        #  - (?=.*[\W_]) at least one special character
        #  - .{8,} at least 8 characters
        if not bool(re.match(pattern, password)):
            raise ValidationError("password not in the correct format")


@auth_bp.route("/register", methods=["POST"])
def register():
    if request.method == "POST":
        body = request.json
        schema = AuthSchema()
        try:
            schema.load(body)
        except ValidationError as error:
            message = utils.create_message(None, error.messages, 400)
            return message, message["status_code"]
        
        email = body["email"].strip()
        password = body["password"].strip()

        hashed_pwd = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
        try:
            user = auth.create_user(email=email, password=password)
        except Exception as exception:
            message = utils.create_message(None, exception.default_message, 400)
            return message, message["status_code"]
        
        user_id = user.uid
        data = {
            "email": email,
            "password": hashed_pwd
        }
        db.collection('users').document(user_id).set(data)

        message = utils.create_message(None, None, 200)
        return message, message["status_code"]

@auth_bp.route("/login", methods=["POST"])
def login():
    if request.method == "POST":
        body = request.json
        schema = AuthSchema()

        try:
            schema.load(body)
        except ValidationError as error:
            message = utils.create_message(None, error.messages, 400)
            return message, message["status_code"]
        
        email = body["email"].strip()
        password = body["password"].strip()

        # Retrieve email and verify password
        user = auth.get_user_by_email(email)
        doc_ref = db.collection('users').document(user.uid)
        user_dict = doc_ref.get().to_dict()
        hashed_pwd = user_dict["password"]
        if not bcrypt.checkpw(password.encode("utf-8"), hashed_pwd):
            message = utils.create_message(None, "password not matched", 401)
            return message, message["status_code"]
        
        # Create JWT
        jwt_token = utils.create_jwt(user.uid, email)
        data = {
            "token": jwt_token
        }

        message = utils.create_message(data, None, 200)
        return message, 200

pantry_bp = Blueprint("api_pantry", __name__)

# Search by food name
@pantry_bp.route("/pantry/search")
@authorize_decorator
def search_pantry():
    food = request.args.get("food", None)
    limit = request.args.get("limit", 20)
    offset = request.args.get("offset", 0)
    if not search:
        message = utils.create_message([], None, 200)
        return message, message["status_code"]
    search = food.capitalize()
    ingredients = db.collection("ingredients").where("Name", ">", search).where("Name", "<=", search + '\uf8ff').offset(offset).limit(limit)

    ingredients_list = []
    for ingredient in ingredients.stream():
        ingredients_list.append(ingredient.to_dict())

    message = utils.create_message(ingredients_list, None, 200)
    return message, message["status_code"]


@pantry_bp.route("/pantry", methods = ["POST"])
@authorize_decorator
def crud_pantry():
    if request.method == "POST":
        user_id = request.payload["user_id"]
        body = request.json
        if "request" not in body:
            message = utils.create_message(None, "request not in request body", 400)
            return message, message["status_code"]
        pantry = body["request"]
        pantry = list(set(pantry))
        pantry_id = utils.generate_id()
        data = {
            "pantry": pantry,
            "created_at": int(round(time.time() * 1000))
        }

        # create a new pantry
        db.collection("users").document(user_id).collection("pantry").document(pantry_id).set(data)

        message = utils.create_message(None, None, 200)
        return message, message["status_code"]
    

dish_bp = Blueprint("api_dish", __name__)

@dish_bp.route("/dish", methods=["POST"])
def crud_dish():
    if request.method == "POST":
        user_id = request.payload["user_id"]
        body = request.json
        if "request" not in body:
                message = utils.create_message(None, "request not in request body", 400)
                return message, message["status_code"]
        
        # TODO: get latest pantry
        # TODO: get a list of dishes
        # TODO: process a list of dishes and get shopping list.
"""
TODO: Recommend dishes based on question/answer and latest pantry
    return {
        "data": [
            {
                "dish_name": string,
                "image_urls": [ string ],
                "recipes": [steps to make those recipes],
                "ingredients": [
                    {
                        "name: string,
                        "amount": int
                    }
                ],
                "shopping_list": [ingredients["name"] - pantry] // No save
            }
        ]
    }

TODO: Filter calendar based on day (from & to)
    return {
        "data": [
            {
                "date": int,
                "meal": string
            }
        ]
    }
"""
# Create new application
app.register_blueprint(auth_bp, url_prefix="/api/v1/auth")
app.register_blueprint(pantry_bp, url_prefix="/api/v1")

if __name__ == "__main__":
    app.run(debug=True)