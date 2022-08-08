from app.models import db, Post

def seed_posts():
    demo_post = Post(
        user_id= 1, body='Welcome to Reacthook, a Facebook clone made by software developer Connor Burns! Connor Burns brought me to life to live here in Reacthook. Beep boop.', image_url='https://i.imgur.com/kzYYvN6.png')
    josh_post = Post(
        user_id=2, body='Hey friends, I just got a job as a software developer. Stoked!')
    ashley_post = Post(
        user_id=3, body="When you've been coding for 8 hours straight...", image_url='https://mir-s3-cdn-cf.behance.net/project_modules/disp/3e32de27214431.563617528d968.gif')

    db.session.add(demo_post)
    db.session.add(josh_post)
    db.session.add(ashley_post)

    db.session.commit()

def undo_posts():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
