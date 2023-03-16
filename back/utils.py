import jwt
from config import ConfigApp
import time
import uuid

def send_email():
    pass

def create_message(data, error, status_code):
    return {
        "data": data,
        "error": error,
        "status_code": status_code
    }

def create_jwt(user_id, email):
    payload = {
        "user_id": user_id,
        "email": email,
        "created_at": int(round(time.time() * 1000)),
        "expired": 3600
    }
    return jwt.encode(payload, ConfigApp.app_secret, algorithm="HS256")
    
def process_authorization(header):
    tokens = header.split(" ")
    if len(tokens) != 2:
        return None
    elif tokens[0] != "Bearer":
        return None
    
    token = tokens[1]
    try:
        payload = jwt.decode(token, ConfigApp.app_secret, algorithms="HS256")
    except Exception as exception:
        print(exception)
        return None
    current_time = int(round(time.time() * 1000))
    if payload["created_at"] + payload["expired"] > current_time:
        return None
    return payload

def generate_id():
    return uuid.uuid4().hex