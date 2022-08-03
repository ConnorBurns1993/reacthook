from flask import Blueprint, jsonify, request, session
from flask_login import login_required, current_user
from app.models import User, Post, db
# from app.forms import PostForm
from app.api.auth_routes import validation_errors_to_error_messages

post_routes = Blueprint('posts', __name__)

@post_routes.route('/')
@login_required
def get_posts():
    all_posts = Post.query.all()
    return { 'posts': [post.to_dict() for post in all_posts] }
