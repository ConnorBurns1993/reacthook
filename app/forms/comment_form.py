from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length
from app.models import Comment

class CommentForm(FlaskForm):

    body = StringField('body', validators=[DataRequired(), Length(max=250)])
    image_url = StringField('image url')
