from flask import Blueprint, request
from flask_jwt_extended import (jwt_required, create_access_token,
                                create_refresh_token, get_jwt_identity,
                                get_raw_jwt, jwt_refresh_token_required)
from ..models import User, Token, UserRequest
from config import Config
from ..utils import send_email
from datetime import timedelta
from flask_cors import cross_origin

auth_bp = Blueprint("api_auth", __name__, url_prefix="/auth")

# User Register
@auth_bp.route("/register", methods=["POST"])
def user_register():
    if request.method == "POST":
        data = request.form

        # Check if body required keys
        if "email" not in data:
            message = {"message": Config.no_email_param}
            return message, Config.HTTP_400_BAD_REQUEST
        if "password" not in data:
            message = {"message": Config.no_password_param}
            return message, Config.HTTP_400_BAD_REQUEST
        
        # Retrieve email and password request body
        email = data["email"]
        password = data["password"]

        # Check if email exists
        user = User.get_user_by_email(email)
        if user:
            message = {"message": Config.email_exist}
            return message, Config.HTTP_400_BAD_REQUEST
        
        # Create new user
        user = User(email=email, password=password)
        user.save_user()

        # Initialize 500 free requests for each user when register.
        user_request = UserRequest(user_id=user.id)
        user_request.save_new_request()

        message = {"message": Config.register_success}
        return message, Config.HTTP_200_OK

# User Login
@auth_bp.route("/login", methods=["POST"])
def user_login():
    if request.method == "POST":
        data = request.form

        # Check if body required keys
        if "email" not in data:
            message = {"message": Config.no_email_param}
            return message, Config.HTTP_400_BAD_REQUEST
        if "password" not in data:
            message = {"message": Config.no_password_param}
            return message, Config.HTTP_400_BAD_REQUEST
        
        # Retrieve email and password request body
        email = data["email"]
        password = data["password"]

        # Check if email exists
        user = User.get_user_by_email(email)
        if not user:
            message = {"message": Config.email_not_exist}
            return message, Config.HTTP_400_BAD_REQUEST
        
        if not User.check_password(user, password):
            message = {"message": Config.incorrect_password}
            return message, Config.HTTP_401_UNAUTHORIZED

        expired_time = timedelta(weeks=1)
        access_token = create_access_token(identity=user.email, expires_delta=expired_time)

        message = {
                "message": Config.login_success,
                "access_token": access_token
            }
            
        return message, Config.HTTP_200_OK

# User Change Password
@auth_bp.route("/change-password", methods=["POST"])
@cross_origin(headers=['Content-Type','Authorization'])
@jwt_required
def user_change_password():
    if request.method == "POST":
        data = request.form

        # Check if body required keys
        if "old_password" not in data:
            message = {"message": Config.no_old_password_param}
            return message, Config.HTTP_400_BAD_REQUEST
        if "new_password" not in data:
            message = {"message": Config.no_new_password_param}
            return message, Config.HTTP_400_BAD_REQUEST
        if "confirm_password" not in data:
            message = {"message": Config.no_confirm_password_param}
            return message, Config.HTTP_400_BAD_REQUEST
        
        # Retrieve email and password request body
        old_password = data["old_password"]
        new_password = data["new_password"]
        confirm_password = data["confirm_password"]

        # Check if Confirm Password equals to New Password
        if new_password != confirm_password:
            message = {"message": Config.new_pass_not_match}
            return message, Config.HTTP_400_BAD_REQUEST
        
        # Check if User exists
        user_email = get_jwt_identity()
        user = User.get_user_by_email(user_email)
        if not user:
            message = {"message": Config.user_not_found}
            return message, Config.HTTP_401_UNAUTHORIZED

        # Check if Old Password fit.
        if not User.check_password(user, old_password):
            message = {"message": Config.incorrect_password}
            return message, Config.HTTP_401_UNAUTHORIZED
        
        # Update Password
        if not User.update_password(user, new_password):
            message = {"message": Config.internal_error}
            return message, Config.HTTP_500_INTERNAL_ERROR
            
        message = {"message": Config.change_password_success}
        return message, Config.HTTP_200_OK

# User Verify Email
@auth_bp.route("/verify-email", methods=["GET", "POST"])
def user_verify_email():
    if request.method == "GET":
        data = request.args
        access_token = data["access_token"]
        message = {"reset_token": access_token}
        return message, Config.HTTP_200_OK
    
    if request.method == "POST":
        data = request.form
        
        # Check if body required keys
        if "email" not in data:
            message = {"message": Config.no_email_param}
            return message, Config.HTTP_400_BAD_REQUEST
        
        # Check if body required keys
        email = data["email"]
        send_email(email)
        message = {"message": Config.send_email_success}
        status_code = Config.HTTP_200_OK
        return message, status_code

# User Reset Password
@auth_bp.route("/reset-password", methods=["POST"])
@cross_origin(headers=['Content-Type','Authorization'])
@jwt_refresh_token_required
def user_reset_password():
    if request.method == "POST":
        data = request.form

        # Check if body required keys
        if "new_password" not in data:
            message = {"message": Config.no_new_password_param}
            return message, Config.HTTP_400_BAD_REQUEST

        if "confirm_password" not in data:
            message = {"message": Config.no_confirm_password_param}
            return message, Config.HTTP_400_BAD_REQUEST

        # Retrieve email and password request body
        new_password = data["new_password"]
        confirm_password = data["confirm_password"]

        # Check if Confirm Password equals to New Password
        if new_password != confirm_password:
            message = {"message": Config.new_pass_not_match}
            return message, Config.HTTP_400_BAD_REQUEST

        user_email = get_jwt_identity()
        user = User.get_user_by_email(user_email)

        if not user:
            message = {"message": Config.user_not_found}
            return message, Config.HTTP_401_UNAUTHORIZED

        User.update_password(user, new_password)
        message = {"message": Config.change_password_success}
        return message, Config.HTTP_200_OK

# User Logout
@auth_bp.route("/logout", methods=["DELETE"])
@cross_origin(headers=['Content-Type','Authorization'])
@jwt_required
def user_logout():
    jti = get_raw_jwt()["jti"]
    token = Token(jti)
    token.blacklist_token()
    message = {"message": Config.logout_success}
    return message, Config.HTTP_200_OK