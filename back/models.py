from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from .utils import convert_image_base64
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


class IdentityCard(db.Model, SerializerMixin):
    __tablename__ = "identity_cards"

    serialize_only = ('id', 'name', 'dob', 'citizen_id', 'due_date', 'ethnicity', 
                      'gender', 'nationality','country', 'hometown', 'address', 'img_url',
                      'card_type', 'passport_id')

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100, convert_unicode=True))
    dob = db.Column(db.String(20))
    passport_id = db.Column(db.String(20))
    citizen_id = db.Column(db.String(20))
    gender = db.Column(db.String(5))
    nationality = db.Column(db.String(30))
    country = db.Column(db.String(50))
    ethnicity = db.Column(db.String(30))
    due_date = db.Column(db.String(20))
    hometown = db.Column(db.Text(convert_unicode=True))
    address = db.Column(db.Text(convert_unicode=True))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    img_url = db.Column(db.String(100), nullable=False)
    card_type = db.Column(db.Integer, db.ForeignKey('document_types.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())

    def __init__(self, user_id, img_url, card_type,
                    passport_id=None, name=None, dob=None, country=None,
                    citizen_id=None, gender=None, nationality=None,
                    hometown=None, address=None, ethnicity=None, due_date=None):
        self.user_id = user_id
        self.img_url = img_url
        self.card_type = card_type

        self.name = name
        self.dob = dob
        self.citizen_id = citizen_id
        self.gender = gender
        self.nationality = nationality
        self.hometown = hometown
        self.address = address
        self.due_date = due_date
        self.ethnicity = ethnicity
        self.passport_id = passport_id
        self.country = country

    @classmethod
    def get_card_by_id(cls, user, card_id):
        card = cls.query.filter_by(user_id=user.id, id=card_id).first()
        if not card:
            return None
        card = card.to_dict()
        card["img"] = convert_image_base64(card.pop("img_url"))
        return card

    @classmethod
    def get_card_by_citizen_id(cls, user, citizen_id, card_type_id):
        if not citizen_id:
            return None
        card = cls.query.filter_by(user_id=user.id, citizen_id=citizen_id, card_type=card_type_id).first()
        return card

    @classmethod
    def get_cards_by_time(cls, str_date, cards_id_list, card_type_id):
        # Format of the date must be "DD-MM-YYYY"
        time_components = str_date.split("-")
        day = int(time_components[0])
        month = int(time_components[1])
        year = int(time_components[2])

        start = datetime.datetime(year, month, day, 0, 0, 0)
        end = datetime.datetime(year, month, day, 23, 59, 59)

        filtered_cards = cls.query.filter(
            cls.id.in_(cards_id_list),
            cls.created_at >= start,
            cls.created_at <= end,
            cls.card_type == card_type_id).order_by(cls.id.desc()).all()
        cards_json = list()
        for filtered_card in filtered_cards:
            card = filtered_card.to_dict()
            card["img"] = convert_image_base64(card.pop("img_url"))
            cards_json.append(card)
        return cards_json

    @classmethod
    def get_cards_by_name_or_citizen(cls, name_citizen, cards_id_list, card_type_id):
        filter_cards = cls.query.filter(
            cls.id.in_(cards_id_list),
            cls.card_type == card_type_id,
            (
                (cls.name.contains(name_citizen)) | (cls.citizen_id.contains(name_citizen))
            )
        ).order_by(cls.id.desc()).all()
        cards_json = list()
        for filter_card in filter_cards:
            card = filter_card.to_dict()
            card["img"] = convert_image_base64(card.pop("img_url"))
            cards_json.append(card)
        return cards_json

    @classmethod
    def get_all_cards(cls, user, card_type_id):
        cards = cls.query.filter_by(user_id=user.id).order_by(cls.id.desc()).all()
        cards_json = list()
        for card in cards:
            card = card.to_dict()
            card["img"] = convert_image_base64(card.pop("img_url"))
            cards_json.append(card)
        return cards_json

    def save_infor_identity_card(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def update_one_identity_card(cls, user, card_id, update_infor):
        card = cls.query.filter_by(user_id=user.id, id=card_id).first()
        if not card:
            return Config.no_identity_card, Config.HTTP_400_BAD_REQUEST
        card_list = cls.query.filter_by(id=card_id)
        card_list.update(update_infor)
        db.session.commit()
        return Config.update_success, Config.HTTP_200_OK

    @classmethod
    def delete_one_identity_card(cls, user, card_id):
        card = cls.query.filter_by(user_id=user.id, id=card_id).first()
        if not card:
            return Config.no_identity_card, Config.HTTP_400_BAD_REQUEST
        db.session.delete(card)
        db.session.commit()
        img_url = card.img_url
        os.remove(img_url)
        return Config.delete_success, Config.HTTP_200_OK


class Price(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(200), nullable=False)
    price = db.Column(db.Float, nullable=False)

    def __init__(self, category, price):
        self.category = category
        self.price = price

class DocumentType(db.Model):
    __tablename__ = "document_types"

    id = db.Column(db.Integer, primary_key=True)
    document_type = db.Column(db.String(50), nullable=False)
    name_type = db.Column(db.String(20), nullable=False)
    identity_cards = db.relationship('IdentityCard', backref='document_type', lazy=True)

    def __init__(self, document_type):
        self.document_type = document_type

    @classmethod
    def get_document_type_by_type(cls, document_type):
        document = cls.query.filter_by(document_type=document_type).first()
        return document

    @classmethod
    def get_document_type_by_id(cls, card_type_id):
        document = cls.query.filter_by(id=card_type_id).first()
        return document

    @classmethod
    def update_document_type(cls, document_type, new_doc_type):
        document = cls.query.filter_by(document_type=document_type).first()
        document.document_type = new_doc_type
        db.session.commit()
        return

class UserRequest(db.Model):
    __tablename__ = "requests"
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    requests = db.Column(db.Integer, default=500)

    def __init__(self, user_id, requests=None, money=None):
        self.user_id = user_id

    def save_new_request(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def get_num_requests(cls, user_id):
        num_requests = cls.query.filter_by(user_id=user_id).first().requests
        return num_requests

    @classmethod
    def minus_request(cls, user_id, num_request):
        request = cls.query.filter_by(user_id=user_id).first()
        if not request:
            return None
        request.requests -= num_request
        db.session.commit()