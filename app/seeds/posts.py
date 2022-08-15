from app.models import db, Post

def seed_posts():
    demo_post = Post(
        user_id= 1, body='Welcome to Reacthook, a Facebook clone made by software developer Connor Burns! Connor Burns brought us to life to live here in Reacthook to help make your browsing experience flawless! Beep boop bzzzzt.', image_url='https://img.freepik.com/free-vector/cute-robots-set_74855-6353.jpg?w=900&t=st=1660072685~exp=1660073285~hmac=1c93b345e4cb81ac492bc5e1e625f900fa1468e969d8316c1e99e62d83f549bb')
    josh_post = Post(
        user_id=2, body='Hey friends, I just got a job as a software developer. Stoked!')
    ashley_post = Post(
        user_id=3, body="When you've been coding for 8 hours straight...", image_url='https://64.media.tumblr.com/5646a401136bbeb25c0a153b26fabf0d/a03505f439776f69-d4/s1280x1920/1d585a2b63423174e9d3490ed7c84e7333e8898c.gifv')

    db.session.add(demo_post)
    db.session.add(josh_post)
    db.session.add(ashley_post)

    db.session.commit()

def undo_posts():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
