from .db import db

class Friend(db.Model):
    __tablename__ = 'friends'

    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    reciever_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    accepted = db.Column(db.Boolean, nullable=True)

    #relationships
    friend_requester = db.relationship('User', back_populates='sender', foreign_keys=[sender_id])
    request_reciever = db.relationship('User', back_populates='reciever', foreign_keys=[reciever_id])

    def to_dict(self):
        return {
            'id': self.id,
            'sender_id': self.sender_id,
            'reciever_id': self.reciever_id,
        }
