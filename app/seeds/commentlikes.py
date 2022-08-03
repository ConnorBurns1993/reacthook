from app.models import db, CommentLike

def seed_commentlikes():
    demo_commentlike1 = CommentLike(
        user_id = 1, comment_id = 1)
    josh_commentlike1 = CommentLike(
        user_id= 2, comment_id = 1)
    ashley_commentlike1 = CommentLike(
        user_id= 3, comment_id = 1)
    demo_commentlike2 = CommentLike(
        user_id = 1, comment_id = 2)
    josh_commentlike2 = CommentLike(
        user_id= 2, comment_id = 2)
    ashley_commentlike2 = CommentLike(
        user_id= 3, comment_id = 2)
    demo_commentlike3 = CommentLike(
        user_id = 1, comment_id = 3)
    josh_commentlike3 = CommentLike(
        user_id= 2, comment_id = 3)
    ashley_commentlike3 = CommentLike(
        user_id= 3, comment_id = 3)

    db.session.add(demo_commentlike1)
    db.session.add(demo_commentlike2)
    db.session.add(demo_commentlike3)
    db.session.add(josh_commentlike1)
    db.session.add(josh_commentlike2)
    db.session.add(josh_commentlike3)
    db.session.add(ashley_commentlike1)
    db.session.add(ashley_commentlike2)
    db.session.add(ashley_commentlike3)

    db.session.commit()

def undo_commentlikes():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
