from .db import db
from datetime import datetime

class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id', ondelete='CASCADE'), nullable=False)
    parent_comment_id = db.Column(db.Integer, db.ForeignKey('comments.id'), nullable=True)
    body = db.Column(db.String(300), nullable=False)
    image_url = db.Column(db.String(250), nullable= True)
    created_on = db.Column(db.DateTime, server_default=db.func.current_timestamp())
    updated_on = db.Column(db.DateTime, server_default=db.func.current_timestamp(), server_onupdate=db.func.current_timestamp())

    #relationships
    user = db.relationship('User', back_populates='comments')
    post = db.relationship('Post', back_populates='comments')
    comment_likes = db.relationship('CommentLike', back_populates='comment')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'post_id': self.post_id,
            'parent_comment_id': self.parent_comment_id,
            'body': self.body,
            'image_url': self.image_url,
            'created_on': self.created_on,
            'updated_on': self.updated_on
        }
