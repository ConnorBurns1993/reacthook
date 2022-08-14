from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length

class UserForm(FlaskForm):

    cover_pic = StringField('body')
    profile_pic = StringField('profile_pic')
