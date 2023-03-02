from flask import Flask
from flask_cors import CORS
import firebase_admin
from firebase_admin import firestore
from firebase_admin import credentials

app = Flask(__name__)

CORS(app)

# Initialize firestore
cred = credentials.Certificate("credentials.json")
firebase_app = firebase_admin.initialize_app(cred)
db = firestore.client()


@app.route('/')
def hello():
    db.collection(u'cities').document(u'LA').set({
        u'name': u'Los Angles',
        u'state': u'CA',
        u'country': u'USA'
    })
    return "My flask API"

if __name__ == "__main__":
    app.run()