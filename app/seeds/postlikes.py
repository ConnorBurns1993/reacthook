from app.models import db, PostLike

def seed_postlikes():
    demo_postlike1 = PostLike(
        user_id = 1, post_id = 1)
    josh_postlike1 = PostLike(
        user_id= 2, post_id = 1)
    ashley_postlike1 = PostLike(
        user_id= 3, post_id = 1)
    demo_postlike2 = PostLike(
        user_id = 1, post_id = 2)
    josh_postlike2 = PostLike(
        user_id= 2, post_id = 3)
    ashley_postlike2 = PostLike(
        user_id= 3, post_id = 2)
    demo_postlike3 = PostLike(
        user_id = 1, post_id = 3)
    josh_postlike3 = PostLike(
        user_id= 2, post_id = 3)
    ashley_postlike3 = PostLike(
        user_id= 3, post_id = 3)

    db.session.add(demo_postlike1)
    db.session.add(demo_postlike2)
    db.session.add(demo_postlike3)
    db.session.add(josh_postlike1)
    db.session.add(josh_postlike2)
    db.session.add(josh_postlike3)
    db.session.add(ashley_postlike1)
    db.session.add(ashley_postlike2)
    db.session.add(ashley_postlike3)

    db.session.commit()

def undo_postlikes():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
