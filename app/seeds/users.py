from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name='Demo', last_name='Bot', email='demo@aa.io', password='password', birthday='0001-01-01', gender='Other', profile_pic='https://img.freepik.com/premium-vector/cute-robot-waving-hand-cartoon-character-science-technology-isolated_138676-3155.jpg', cover_pic='https://images.unsplash.com/photo-1524234107056-1c1f48f64ab8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80')
    josh = User(
        first_name='Josh', last_name='Thatcher', email='josh@aa.io', password='password', birthday='1993-08-02', gender='Male', profile_pic='https://i.imgur.com/UXUmFDK.jpg', cover_pic='https://images.unsplash.com/photo-1520116468816-95b69f847357?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80')
    ashley = User(
        first_name='Ashley', last_name='Fitch', email='ashley@aa.io', password='password', birthday='1996-08-16', gender='Female', profile_pic='https://i.imgur.com/TL7icZM.jpg', cover_pic='https://images.unsplash.com/photo-1501747315-124a0eaca060?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80')
    charles = User(
        first_name='Jon (Karate Master)', last_name='McMann', email='charles@aa.io', password='password', birthday='1973-08-16', gender='Male', profile_pic='https://images.unsplash.com/photo-1608583235545-8b9b39b454d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=747&q=80', cover_pic='https://images.unsplash.com/photo-1586343276471-c02138479e9e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')
    vanessa = User(
        first_name='Vanessa', last_name='Farley', email='vanessa@aa.io', password='password', birthday='1994-03-21', gender='Female', profile_pic='https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80', cover_pic='https://images.unsplash.com/photo-1506452305024-9d3f02d1c9b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')
    fredrick = User(
        first_name='Fredrick', last_name='Gillespie', email='fredrick@aa.io', password='password', birthday='1994-03-21', gender='Male', profile_pic='https://images.unsplash.com/photo-1555888997-03e986fc157b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', cover_pic='https://images.unsplash.com/photo-1419640303358-44f0d27f48e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1085&q=80')
    terrence = User(
        first_name='Terrence', last_name='Williams', email='terrence@aa.io', password='password', birthday='2008-10-01', gender='Male', profile_pic='https://images.unsplash.com/photo-1546525848-3ce03ca516f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', cover_pic='https://images.unsplash.com/photo-1623150502742-6a849aa94be4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')
    samantha = User(
        first_name='Samantha', last_name='Johnson', email='samantha@aa.io', password='password', birthday='2005-10-01', gender='Female', profile_pic='https://images.unsplash.com/photo-1589696485114-9e2f81d83484?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80', cover_pic='https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')


    db.session.add(demo)
    db.session.add(josh)
    db.session.add(ashley)
    db.session.add(charles)
    db.session.add(vanessa)
    db.session.add(fredrick)
    db.session.add(terrence)
    db.session.add(samantha)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
