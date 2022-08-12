from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SelectField, DateField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User
import datetime
import email_validator


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def validate_date(form, field):
    if field.data > datetime.date.today():
        raise ValidationError("Your birthday cannot be in the future!")


class SignUpForm(FlaskForm):
    first_name = StringField('First Name', validators=[DataRequired('First Name is required.'), Length(min=3, message=('First Name must be atleast 2 characters long.')), Length(max=25, message="First Name cannot be longer than 25 characters.")])
    last_name = StringField('Last Name', validators=[DataRequired('Last Name is required.'), Length(min=3, message=('Last Name must be atleast 2 characters long.')), Length(max=25, message="Last Name cannot be longer than 25 characters.")])
    email = StringField('Email', validators=[DataRequired('Email is required.'), user_exists, Email()])
    password = StringField('Password', validators=[DataRequired('Password is required.')])
    birthday = DateField('Birthday', format='%Y-%m-%d', validators=[DataRequired('Birthday is required.'), validate_date])
    gender = SelectField('Gender', validators=[DataRequired('Gender is required.')], choices=['Male', 'Female', 'Other'])
