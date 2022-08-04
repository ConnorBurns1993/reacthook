from flask import Blueprint, jsonify, request, session
from flask_login import login_required, current_user
from app.models import User, Post, Comment, db
from app.api.auth_routes import validation_errors_to_error_messages
from app.forms import CommentForm

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/<int:post_id>')
@login_required
def get_comments(post_id):
    all_comments = Comment.query.filter(Comment.post_id == post_id).all()
    return { 'comments': [comment.to_dict() for comment in all_comments] }

@comment_routes.route('/', methods=['GET','POST'])
@login_required
def create_comments():
    form = CommentForm()
    print('\n \n \n', form.data, '\n \n \n')
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        new_comment = Comment(
            user_id=current_user.id,
            post_id=form.data['post_id'],
            body=form.data['body'],
            image_url=form.data['image_url']
        )

        db.session.add(new_comment)
        db.session.commit()

        return new_comment.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# @post_routes.route('/<int:id>', methods=['PUT'])
# @login_required
# def edit_post(id):
#     form = PostForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         to_edit = Post.query.get(id)
#         to_edit.body = form.data['body']
#         to_edit.image_url = form.data['image_url']

#         db.session.commit()

#         return to_edit.to_dict()

#     return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# @post_routes.route('/<int:id>', methods=['DELETE'])
# @login_required
# def delete_post(id):
#     post = Post.query.get(id)

#     db.session.delete(post)
#     db.session.commit()

#     return { "message": "Success!"}
