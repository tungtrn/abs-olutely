from flask import Flask, jsonify
from config import ConfigApp, Config
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from werkzeug.exceptions import InternalServerError
import datetime
from .models import db, User, IdentityCard, Token

app = Flask(__name__)

cors = CORS(app)
jwt = JWTManager(app=app)
db.init_app(app=app)

app.config["SQLALCHEMY_DATABASE_URI"] = ConfigApp.connection
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["UPLOAD_FOLDER"] = ConfigApp.upload_folder
app.config["JWT_SECRET_KEY"] = ConfigApp.app_secret
app.config['JWT_BLACKLIST_ENABLED'] = True
app.config['JWT_BLACKLIST_TOKEN_CHECKS'] = ['access', 'refresh']
app.config['CORS_HEADERS'] = ['Content-Type']
app.config['CORS_ORIGINS'] = ['*']
app.config['CORS_SUPPORTS_CREDENTIALS'] = True

# Config application

@app.errorhandler(500)
def internal_error(e):
    print(e)
    message = {"message": Config.internal_error}
    return message

# Config JWT

@jwt.expired_token_loader
def my_expired_token_callback():
    message = jsonify({
        "message": Config.token_expired 
    })
    return message, Config.HTTP_401_UNAUTHORIZED

@jwt.unauthorized_loader
def unauthorized_jwt_header(expired_token):
    message = jsonify({
        "message": Config.token_not_found
    })

    return message, Config.HTTP_401_UNAUTHORIZED

@jwt.revoked_token_loader
def revoked_token_handler():
    message = jsonify({
        "message": Config.revoked_token
    })

    return message, Config.HTTP_401_UNAUTHORIZED

@jwt.token_in_blacklist_loader
def check_token_in_blacklist(decrypted_token):
    jti = decrypted_token["jti"]
    return Token.check_token_blacklisted(jti)

# Create new application

from .api.auth import auth_bp

app.register_error_handler(500, internal_error)

app.register_blueprint(auth_bp, url_prefix="/api/v1/auth")

if __name__ == "__main__":
    app.run(debug=True)