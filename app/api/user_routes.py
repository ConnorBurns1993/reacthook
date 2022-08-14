from flask import Blueprint, jsonify, request, session
from flask_login import login_required
from app.api.auth_routes import validation_errors_to_error_messages
from app.models import User, db
from app.forms import UserForm

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_user(id):
    form = UserForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print('\n \n \n', form.data)
    if form.validate_on_submit():
        to_edit = User.query.get(id)
        to_edit.profile_pic = form.data['profile_pic']
        to_edit.cover_pic = form.data['cover_pic']

        db.session.commit()

        return to_edit.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
