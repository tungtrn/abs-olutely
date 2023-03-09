import firebase_admin
from firebase_admin import firestore
from firebase_admin import credentials
from firebase_admin import auth

auth_key = {
    "apiKey": "AIzaSyCbOqjIlay6AS9qzwUgLZqD8k3BaQ8VP9c",
    "authDomain": "video-note-338718.firebaseapp.com",
    "projectId": "video-note-338718",
    "storageBucket": "video-note-338718.appspot.com",
    "messagingSenderId": "40997510190",
    "appId": "1:40997510190:web:e4f81d0a3c63a7242313bf",
}

storage_key = {
    "apiKey": "AIzaSyCbOqjIlay6AS9qzwUgLZqD8k3BaQ8VP9c",
    "authDomain": "video-note-338718.firebaseapp.com",
    "projectId": "video-note-338718",
    "storageBucket": "video-note-338718.appspot.com",
    "messagingSenderId": "40997510190",
    "appId": "1:40997510190:web:e4f81d0a3c63a7242313bf",
}


# Initialize firestore
cred = credentials.Certificate("credentials.json")
print(cred)
firebase_app = firebase_admin.initialize_app(cred)
db = firestore.client()

print(db)