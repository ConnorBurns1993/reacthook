from flask import Blueprint, jsonify, request, session
from flask_login import login_required, current_user
from app.models import User, Post, Comment, db
from app.forms import PostForm
from app.api.auth_routes import validation_errors_to_error_messages
from app.aws import (
    upload_file_to_s3, allowed_file, get_unique_filename)

post_routes = Blueprint('posts', __name__)

@post_routes.route('/')
@login_required
def get_posts():

    all_posts = Post.query.all()

    return { 'posts': [post.to_dict() for post in all_posts] }

@post_routes.route('/', methods=['POST'])
@login_required
def create_posts():
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        new_post = Post(
            user_id=current_user.id,
            body=form.data['body'],
            image_url=form.data['image_url']
        )

        db.session.add(new_post)
        db.session.commit()

        return new_post.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@post_routes.route('/post-image', methods=['POST'])
@login_required
def create_post_image():
    if "image" not in request.files:

        return {"image": ''}

    image = request.files["image"]

    if not allowed_file(image.filename):

        return {"errors": "Only .jpg, .jpeg, .png and .gif files are accepted."}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    if "url" not in upload:

        return upload, 400


    url = upload["url"]

    return {"image": url}

@post_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_post(id):
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        to_edit = Post.query.get(id)
        to_edit.body = form.data['body']
        to_edit.image_url = form.data['image_url']

        db.session.commit()

        return to_edit.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@post_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_post(id):
    post = Post.query.get(id)

    db.session.delete(post)
    db.session.commit()

    return { "message": "Success!"}
