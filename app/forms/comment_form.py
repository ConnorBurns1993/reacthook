from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length
from app.models import Comment

class CommentForm(FlaskForm):
    user_id = IntegerField()
    post_id = IntegerField()
    body = StringField('body', validators=[DataRequired(), Length(max=255)])
    image_url = StringField('image url')
