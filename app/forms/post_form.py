from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length

class PostForm(FlaskForm):

    body = StringField('body', validators=[DataRequired(), Length(max=300), Length(min=1)])
    image_url = StringField('image url')
