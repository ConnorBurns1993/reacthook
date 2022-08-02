"""empty message

Revision ID: a025d62cdff3
Revises: 3e54d899411a
Create Date: 2022-08-02 13:13:45.280957

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a025d62cdff3'
down_revision = '3e54d899411a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('first_name', sa.String(length=30), nullable=False),
    sa.Column('last_name', sa.String(length=30), nullable=False),
    sa.Column('birthday', sa.DateTime(), nullable=False),
    sa.Column('gender', sa.String(length=10), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('bio', sa.String(length=300), nullable=True),
    sa.Column('location', sa.String(length=100), nullable=True),
    sa.Column('hometown', sa.String(length=100), nullable=True),
    sa.Column('relationship_status', sa.String(length=100), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('users')
    # ### end Alembic commands ###
