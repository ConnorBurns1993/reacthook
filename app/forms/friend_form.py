from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired
from app.models import Friend

class FriendForm(FlaskForm):
    sender_id = IntegerField('sender_id', validators=[DataRequired()])
    reciever_id = IntegerField('recipient_id', validators=[DataRequired()])
    accepted = BooleanField('accepted')
