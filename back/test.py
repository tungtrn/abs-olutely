import unittest
import firebase_admin
from firebase_admin import credentials, firestore, auth
import requests

from config import ConfigApp
import bcrypt

cred = credentials.Certificate(ConfigApp.fb_cred_name)
firebase_admin.initialize_app(cred)
db = firestore.client()

def delete_data(email):
    user = auth.get_user_by_email(email)
    user_id = user.uid
    auth.delete_user(user_id)
    db.collection("users").document(user_id).delete()


class TestStringMethods(unittest.TestCase):
    def __init__(self, methodName: str = "runTest") -> None:
        super().__init__(methodName)
        self.user_id = None

    def setUp(self):
        self.email = "helloworld123@gmail.com"
        self.password = "Helloworld123@"
        hashed_pwd = bcrypt.hashpw(self.password.encode("utf-8"), bcrypt.gensalt())
        user = auth.create_user(email=self.email, password=self.password)
        user_id = user.uid
        data = {
            "email": self.email,
            "password": hashed_pwd
        }
        db.collection('users').document(user_id).set(data)


    def tearDown(self):
        delete_data(self.email)
        print("Teardown")


    def test_login(self):
        url = "http://127.0.0.1:5000/api/v1/auth/login"
        headers = {
            "Content-Type": "application/json"
        }
        
        data = {
            "email": self.email,
            "password": self.password
        }

        response = requests.post(url, headers=headers, json=data)
        response_json = response.json()

        self.assertEqual(response.status_code, 200, "Login success with status code 200")
        self.assertEqual(True, "token" in response_json["data"], "Login returns token")


    def test_login_with_non_existing_email(self):
        url = "http://127.0.0.1:5000/api/v1/auth/login"
        headers = {
            "Content-Type": "application/json"
        }
        
        data = {
            "email": "abc123@gmail.com",
            "password": "meomeo"
        }
        response = requests.post(url, headers=headers, json=data)

        self.assertEqual(response.status_code, 400, "Login failed with status code 400")
    

    def test_register(self):
        delete_data(self.email)
        url = "http://127.0.0.1:5000/api/v1/auth/register"
        headers = {
            "Content-Type": "application/json"
        }
        
        data = {
            "email": self.email,
            "password": self.password
        }

        response = requests.post(url, headers=headers, json=data)
        self.assertEqual(response.status_code, 200, "Register success with 200 status code")


    def test_register_with_an_existing_email(self):
        url = "http://127.0.0.1:5000/api/v1/auth/register"
        headers = {
            "Content-Type": "application/json"
        }
        
        data = {
            "email": self.email,
            "password": self.password
        }

        response = requests.post(url, headers=headers, json=data)
        self.assertEqual(response.status_code, 400, "Register fails with email exists")

    # def test_isupper(self):
    #     self.assertTrue('FOO'.isupper())
    #     self.assertFalse('Foo'.isupper())

    # def test_split(self):
    #     s = 'hello world'
    #     self.assertEqual(s.split(), ['hello', 'world'])
    #     # check that s.split fails when the separator is not a string
    #     with self.assertRaises(TypeError):
    #         s.split(2)

if __name__ == '__main__':
    unittest.main()