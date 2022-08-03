from app.models import db, Comment

def seed_comments():
    demo_comment = Comment(
        user_id = 1, post_id = 2, body='Wow, congratulations! Do not forget me! Bzzzzt.')
    josh_comment = Comment(
        user_id= 2, post_id = 3, body='Haha, so true!')
    ashley_comment = Comment(
        user_id= 3, post_id = 2, body="Congrats!", image_url='https://images.unsplash.com/photo-1576481564650-61d2ed81f6d5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80')

    db.session.add(demo_comment)
    db.session.add(josh_comment)
    db.session.add(ashley_comment)

    db.session.commit()

def undo_comments():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
