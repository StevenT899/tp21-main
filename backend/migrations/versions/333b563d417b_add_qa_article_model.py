"""Add QA_Article model

Revision ID: 333b563d417b
Revises: b4837bc42716
Create Date: 2025-05-08 16:55:25.511965

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '333b563d417b'
down_revision = 'b4837bc42716'
branch_labels = None
depends_on = None


def upgrade():
    op.execute("""
        ALTER TABLE `QA_Article`
        MODIFY COLUMN `ID` INT(11) NOT NULL AUTO_INCREMENT,
        ADD PRIMARY KEY (`ID`);
    """)


def downgrade():
    op.execute("""
        ALTER TABLE `QA_Article`
        DROP PRIMARY KEY,
        MODIFY COLUMN `ID` INT(11) NULL;
    """)
