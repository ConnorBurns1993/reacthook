from flask import Blueprint, jsonify, request, session
from flask_login import login_required, current_user
from app.api.auth_routes import validation_errors_to_error_messages
from app.models import Friend, User, db
from app.forms import FriendForm

friend_routes = Blueprint('friends', __name__)

@friend_routes.route('/')
@login_required
def get_friends():
    all_friends = Friend.query.all()

    return { 'friends' : [friend.to_dict() for friend in all_friends]}

@friend_routes.route('/', methods=['POST'])
@login_required
def request_friend():

    form = FriendForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        new_request = Friend(
            sender_id = current_user.id,
            reciever_id = form.data['reciever_id'],
            accepted = form.data['accepted'],
        )

        db.session.add(new_request)
        db.session.commit()

        return new_request.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@friend_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_request(id):
    request = Friend.query.get(id)
    print(request)


    db.session.delete(request)
    db.session.commit()

    return { 'message': 'Success' }
