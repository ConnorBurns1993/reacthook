from .db import db

class Friend(db.Model):
    __tablename__ = 'friends'

    id = db.Column(db.Integer, primary_key=True)
    user_a_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user_b_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    #relationships
    user = db.relationship('User', back_populates='posts')
    user_a = db.relationship('User', back_populates='first_friend', foreign_keys=[user_a_id])
    user_b = db.relationship('User', back_populates='second_friend', foreign_keys=[user_b_id])
    comments = db.relationship('Comment', back_populates='post')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'body': self.body,
            'image_url': self.image_url,
        }
