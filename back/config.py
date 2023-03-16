from dotenv import load_dotenv
import os
load_dotenv()

class ConfigApp(object):
    fb_cred_name = os.getenv("FIREBASE_CRED")

    # Application Config
    app_secret = os.getenv("APP_SECRET")


class Config:
    # Error Message
    email_exist = "Email has already existed. Please try another one!"
    email_not_exist = "Email does not exist. Please register!"
    incorrect_password = "Incorrect Password. Please try again!"
    token_expired = "Your token has expired. Please Login!"
    token_not_found = "Token cannot be found. Please attach your token to headers!"
    user_not_found = "User not found. Please try again!"
    card_not_found = "Card not found. Please try again!"
    new_pass_not_match = "Your confirm password does not match with the new password!"
    invalid_token_format = "Invalid Token format. Please try again!"
    send_email_fail = "Unable to send email. Please try again!"
    no_token_param = "Please attach token in params!"
    no_email_param = "Please attach email in request body!"
    no_password_param = "Please attach password in request body!"
    no_new_password_param = "Please attach new password in request body!"
    no_confirm_password_param = "Please attach confirm password in request body!"
    no_old_password_param = "Please attach old password in request body!"
    no_file_param = "Please attach file in the request body with key \"img\"!"
    revoked_token = "Your credentials to the account have been revoked. Please login again!"
    no_identity_card = "Identity Card cannot be found. Please try again!"
    cannot_register = "Cannot register at the momemnt. Please try again later!"
    cannot_update = "Cannot update data. Please check body request!"
    cannot_delete = "Cannot delete data at the moment. Please try again later!"
    cannot_add = "Cannot add data at the moment. Please try again later!"
    cannot_detect_type = "Cannot categorize the type of upload file. Please try again!"
    internal_error = "Internal Error. Please try again later!"
    out_of_requests = "You have used up all of your requests. Please upgrade your account or wait for new daily requests."

    # Success Message
    register_success = "Successfully registered!"
    login_success = "Successfully login!"
    change_password_success = "Successfully change password!"
    send_email_success = "Successfully send email!"
    logout_success = "Successfully Logout!"
    query_success = "Successfully Query!"
    update_success = "Successfully Update!"
    delete_success = "Successfully Delete!"
    add_success = "Successfully Add!"

    # Status Code
    HTTP_200_OK = 200
    HTTP_400_BAD_REQUEST = 400
    HTTP_401_UNAUTHORIZED = 401    
    HTTP_500_INTERNAL_ERROR = 500

    file_type = {
        "cv": ["pdf", "docx", "doc"],
        "image": ["jpg", "png", "jpeg", "raw", "jfif"]
    }