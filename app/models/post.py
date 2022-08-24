from .db import db

class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    body = db.Column(db.String(300), nullable=False)
    image_url = db.Column(db.String(250), nullable= True)

    #relationships
    user = db.relationship('User', back_populates='posts')
    comments = db.relationship('Comment', back_populates='post', cascade='all, delete-orphan')
    post_likes = db.relationship('PostLike', back_populates='post')

    def to_dict(self):

        return {
            'id': self.id,
            'user_id': self.user_id,
            'body': self.body,
            'image_url': self.image_url,
            'user': self.user.to_dict(),
            'comments': [comment.to_dict() for comment in self.comments],
            'post_likes': [likes.to_dict() for likes in self.post_likes]
        }
