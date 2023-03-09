from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
import os
from sqlalchemy import desc
from config import Config
import datetime

db = SQLAlchemy()

class Token(db.Model):
    __tablename__ = "blacklist_token"

    id = db.Column(db.Integer, primary_key=True)
    token = db.Column(db.String(200), nullable=False)

    def __init__(self, token):
        self.token = token

    def blacklist_token(self):
        try:
            db.session.add(self)
            db.session.commit()
        except:
            return False
        return True

    @classmethod
    def check_token_blacklisted(cls, token):
        token = cls.query.filter_by(token=token).first()
        if token:
            return True
        return False


class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    serialize_only = ('email', 'password')

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    identity_cards = db.relationship("IdentityCard", backref="user", lazy=True)
    requests = db.relationship("UserRequest", backref="user", lazy=True)

    def __init__(self, email, password):
        self.email = email
        self.password = generate_password_hash(password, salt_length=10)

    def __repr__(self):
        return f"User: {self.email}"

    @classmethod
    def get_user_by_email(cls, email):
        user = cls.query.filter_by(email=email).first()
        return user

    @classmethod
    def get_user_by_id(cls, _id):
        user = cls.query.get(_id)
        return user        

    def save_user(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def update_password(cls, user, new_password):
        user.password = generate_password_hash(new_password)
        db.session.add(user)
        db.session.commit()

    @classmethod
    def check_password(cls, user, password):
        return check_password_hash(user.password, password)