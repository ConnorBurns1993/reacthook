from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name='Demo', last_name='Bot', email='demo@aa.io', password='password', birthday='0001-01-01', gender='Other', profile_pic='https://img.freepik.com/premium-vector/cute-robot-waving-hand-cartoon-character-science-technology-isolated_138676-3155.jpg', cover_pic='https://images.unsplash.com/photo-1524234107056-1c1f48f64ab8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80')
    josh = User(
        first_name='Josh', last_name='Thatcher', email='josh@aa.io', password='password', birthday='1993-08-02', gender='Male', profile_pic='https://i.imgur.com/UXUmFDK.jpg', cover_pic='https://images.unsplash.com/photo-1520116468816-95b69f847357?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80')
    ashley = User(
        first_name='Ashley', last_name='Fitch', email='ashley@aa.io', password='password', birthday='1996-08-16', gender='Female', profile_pic='https://i.imgur.com/TL7icZM.jpg', cover_pic='https://images.unsplash.com/photo-1501747315-124a0eaca060?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80')

    db.session.add(demo)
    db.session.add(josh)
    db.session.add(ashley)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
