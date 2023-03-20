from flask import Flask, request, Blueprint
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
import json
from datetime import datetime, date

import utils

app = Flask(__name__)

CORS(app, resources={r"*": {"origins": "*"}})
jwt = JWTManager(app=app)

cred = credentials.Certificate(ConfigApp.fb_cred_name)
firebase_admin.initialize_app(cred)
db = firestore.client()

openai.api_key = ConfigApp.chatgpt_secret

def create_dishes(questions, answers, ingredients):
    if len(ingredients) == 0:
        message = f"recommend me a list of 1 dishes based on list of questions and answers:"
    else:
        message = f"recommend me a list of 1 dishes based on list of questions and answers with the following ingredients {ingredients}."
    message = message + """
        Response must be in JSON format: 
        [ 
            {
                "dish_name": string,
                "recipes": [steps with string],
                "ingredients": [
                    {
                        "name": string,
                        "amount": int in gam,
                        "calories": int
                    }
                ]
            }
        ]
        """ + f"""
        with the following questions:
        {questions}
        corresponding to the answers:
        {answers}
        """
    trials = 3
    while trials > 0:
        try:
            print("Reach here")
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    # {"role": "system", "content": "You are a helpful assistant."},
                    {"role": "system", "content": message},
                    # {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
                    # {"role": "user", "content": "Where was it played?"}
                ]
            )
            raw_content = response["choices"][0]["message"]["content"]
            print(response)
            json_content = json.loads(raw_content)
            return json_content
        except Exception as exception:
            print(exception)
            trials -= 1

    return None

def generate_image_by_dish_name(dish_name):
    trials = 3
    while trials > 0:
        try:
            response = openai.Image.create(
                prompt=dish_name,
                n=1,
                size="256x256",
            )
            return response["data"][0]["url"]
        except Exception as exception:
            trials -= 1
    return None
    

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
        print(payload)
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
            print(exception.default_message)
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
        print(body)
        try:
            schema.load(body)
        except ValidationError as error:
            print(error.messages)
            message = utils.create_message(None, error.messages, 400)
            return message, message["status_code"]
        
        email = body["email"].strip()
        password = body["password"].strip()

        # Retrieve email and verify password
        try:
            user = auth.get_user_by_email(email)
            doc_ref = db.collection('users').document(user.uid)
            user_dict = doc_ref.get().to_dict()
            print(user_dict)
            hashed_pwd = user_dict["password"]
            if not bcrypt.checkpw(password.encode("utf-8"), hashed_pwd):
                message = utils.create_message(None, "password not matched", 401)
                return message, message["status_code"]
        except Exception as exception:
            print(exception)
            message = utils.create_message(None, "login failed", 400)
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
@authorize_decorator
def crud_dish():
    if request.method == "POST":
        user_id = request.payload["user_id"]
        pairs = request.json
        
        # Get latest pantry
        pantries = db.collection("users").document(user_id).collection("pantry").order_by("created_at", direction=firestore.Query.DESCENDING).get()
        if len(pantries) == 0:
            pantry = ["fish", "fish sauce"]
        else:
            pantry = pantries[0].to_dict()
            print(pantry)

        answers = []
        questions = []
        for pair in pairs:
            answers.append(pair["answer"])
            questions.append(pair["question"])
        
        # Create dishes
        dish = create_dishes(questions, answers, pantry)

        if not dish:
            dish = {        
                "dish_name": "Stir-Fried Chicken with Vegetables",        
                "recipes": [            
                    "1. Cut 1 chicken breast into bite-sized pieces.",            
                    "2. Marinate chicken in a mixture of 1 tablespoon soy sauce, 1 tablespoon rice wine, and 1/2 teaspoon cornstarch for 15 minutes.",            
                    "3. Heat 2 tablespoons of oil in a wok over high heat.",            
                    "4. Add 1 clove of minced garlic and 1/2 inch of minced ginger and stir-fry until fragrant.",            
                    "5. Add the marinated chicken and stir-fry until it is browned on all sides and cooked through.",            
                    "6. Add 1/2 cup of sliced carrots, 1/2 cup of sliced bell peppers, and 1/2 cup of sliced onions and stir-fry for 2-3 minutes.",            
                    "7. Season with salt and pepper to taste.",            
                    "8. Serve hot with rice."        
                ],
                "ingredients": [
                    {
                        "name": "Chicken breast",
                        "amount": "500 gam",
                        "calories": 100
                    },
                    {
                        "name": "Soy sauce",
                        "amount": "1 tablespoon",
                        "calories": 9
                    },
                    {
                        "name": "Rice wine",
                        "amount": "1 tablespoon",
                        "calories": 0
                    },
                    {
                        "name": "Cornstarch",
                        "amount": "1/2 teaspoon",
                        "calories": 15
                    },
                    {
                        "name": "Oil",
                        "amount": "2 tablespoons",
                        "calories": 120
                    },
                    {
                        "name": "Garlic",
                        "amount": "50 gam",
                        "calories": 74
                    },
                    {
                        "name": "Ginger",
                        "amount": "1/2 inch",
                        "calories": 9
                    },
                    {
                        "name": "Carrots",
                        "amount": "1/2 cup",
                        "calories": 45
                    },
                    {
                        "name": "Bell peppers",
                        "amount": "1/2 cup",
                        "calories": 9
                    },
                    {
                        "name": "Onions",
                        "amount": "1/2 cup",
                        "calories": 46
                    }
                ],
                "shopping_list": [
                    "Chicken breast",
                    "Soy sauce",
                    "Rice wine",
                    "Cornstarch",
                    "Oil",
                    "Garlic",
                    "Ginger",
                    "Carrots",
                    "Bell peppers",
                    "Onions",
                ]
            }
        else:
            ingredient_names = set([name for name in dish["ingredients"]])
            existing_ingredients = set(pantry)
            shopping_list = list(ingredient_names.intersection(existing_ingredients))
            dish["shopping_list"] = shopping_list

        # Generate photo
        dish_name = dish["dish_name"]
        dish["image_url"] = generate_image_by_dish_name(dish_name)

        # TODO: process a list of dishes and get shopping list.
        message = utils.create_message(dish, None, 200)

        return message, message["status_code"]


@dish_bp.route("/dish/calendar", methods=["GET", "POST"])
@authorize_decorator
def crud_calendar():
    today = date.today()

    # dd/mm/YY
    today_str = today.strftime("%Y-%m-%d")

    user_id = request.payload["user_id"]

    meal_ref = db.collection("users").document(user_id).collection("meal")

    if request.method == "GET":
        params = request.args

        from_date_str = params.get("from", today_str)
        to_date_str = params.get("to", today_str)

        print(from_date_str, to_date_str)

        from_date_obj = datetime.strptime(from_date_str, '%Y-%m-%d')
        to_date_obj = datetime.strptime(to_date_str, '%Y-%m-%d')

        from_milliseconds = int(from_date_obj.timestamp() * 1000)
        to_milliseconds = int(to_date_obj.timestamp()*1000)

        meals = meal_ref.where("date", ">=", from_milliseconds).where("date", "<=", to_milliseconds).stream()
        print(meals)
        meals_dict = list()

        for meal in meals:
            meals_dict.append(meal.to_dict())

        message = utils.create_message(meals_dict, None, 200)

        return message, message["status_code"]


    if request.method == "POST":
        body = request.json

        meal_date = body["date"]
        meal_type = body["meal"]
        dish = body["dish"]


        meal_date_obj = datetime.strptime(meal_date, '%Y-%m-%d')
        meal_milliseconds = int(meal_date_obj.timestamp() * 1000)
        meals = meal_ref.where("date", "==", meal_milliseconds).where("meal", "==", meal_type).get()

        if len(meals) > 0:
            meal_id = meals[0].uid
        else:
            meal_id = utils.generate_id()

        data = {
            "date": meal_milliseconds,
            "meal": meal_type,
            "dish": dish
        }

        # Get latest pantry
        db.collection("users").document(user_id).collection("meal").document(meal_id).set(data)

        # TODO: process a list of dishes and get shopping list.
        message = utils.create_message(None, None, 200)

        return message, message["status_code"]


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
app.register_blueprint(dish_bp, url_prefix="/api/v1")

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)