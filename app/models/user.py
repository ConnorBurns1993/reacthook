from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    first_name = db.Column(db.String(30), nullable=False)
    last_name = db.Column(db.String(30), nullable=False)
    birthday = db.Column(db.DateTime, nullable=False)
    gender = db.Column(db.String(10), nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)
    bio = db.Column(db.String(300), nullable=True)
    location = db.Column(db.String(100), nullable=True)
    hometown = db.Column(db.String(100), nullable=True)
    relationship_status = db.Column(db.String(100), nullable=True)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'birthday': self.birthday,
            'gender' : self.gender
        }
