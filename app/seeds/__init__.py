from flask.cli import AppGroup
from .users import seed_users, undo_users
from .posts import seed_posts, undo_posts
from .postlikes import seed_postlikes, undo_postlikes
from .comments import seed_comments, undo_comments
from .commentlikes import seed_commentlikes, undo_commentlikes


# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():

    seed_users()
    seed_posts()
    seed_postlikes()
    seed_comments()
    seed_commentlikes()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():

    undo_commentlikes()
    undo_comments()
    undo_postlikes()
    undo_posts()
    undo_users()

    # Add other undo functions here
