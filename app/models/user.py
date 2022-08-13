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
    profile_pic = db.Column(db.String(300), nullable=True, default='https://doc.vortala.com/childsites/uploads/840/files/istockphoto-1223671392-612x612.jpg')
    cover_pic = db.Column(db.String(300), nullable=True, default='https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')
    location = db.Column(db.String(100), nullable=True)
    hometown = db.Column(db.String(100), nullable=True)
    relationship_status = db.Column(db.String(100), nullable=True)

    #relationships
    posts = db.relationship('Post', back_populates='user')
    post_likes = db.relationship('PostLike', back_populates='user')
    comments = db.relationship('Comment', back_populates='user')
    comment_likes = db.relationship('CommentLike', back_populates='user')
    first_friend = db.relationship('Friend', back_populates='user_a', foreign_keys='[Friend.user_a_id]')
    second_friend = db.relationship('Friend', back_populates='user_b', foreign_keys='[Friend.user_b_id]')

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
            'bio': self.bio,
            'gender': self.gender,
            'profile_pic': self.profile_pic,
            'cover_pic': self.cover_pic,
            'location': self.location,
            'hometown': self.hometown,
            'relationship_status': self.relationship_status
        }
