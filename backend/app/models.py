"""
app/models.py

Description:
    Defines SQLAlchemy ORM models for core database tables used in the SchoolMate application.
    These models represent schools, languages, language programs, and Q&A articles,
    and are mapped directly to their respective database tables.

Key Models:
    - School: Stores detailed metadata for each school, including enrolment stats, location,
              ICSEA scores, and language flags.
    - Language: Represents supported languages across schools.
    - LanguageProgram: Association table linking schools to their offered languages (many-to-many).
    - Article: Represents educational support articles shown in the Q&A module.

Relationships:
    - School <-> Language: Many-to-many via LanguageProgram
"""

from .extensions import db

class School(db.Model):
    """School model"""
    __tablename__ = 'schools'
    
    School_AGE_ID = db.Column(db.Integer, primary_key=True)
    School_Name = db.Column(db.String(255))
    Suburb = db.Column(db.String(255))
    Postcode = db.Column(db.String(20))
    School_Sector = db.Column(db.String(25))
    School_URL = db.Column(db.String(255))
    Year_Range = db.Column(db.String(50))
    ICSEA = db.Column(db.Integer)
    Teaching_Staff = db.Column(db.Integer)
    Non_Teaching_Staff = db.Column(db.Integer)
    Teaching_staff_per_student = db.Column(db.Float)
    Girls_Enrolment = db.Column(db.Integer)
    Boys_Enrolment = db.Column(db.Integer)
    Total_Enrolment = db.Column(db.Integer)
    Latitude = db.Column(db.Float)
    Longitude = db.Column(db.Float)
    SA2_ID = db.Column(db.Integer)
    Language_Flag = db.Column(db.Integer) 
    ICSEA_percentile = db.Column(db.Float) 
    coordinates = db.Column(db.Text) 
    English = db.Column(db.Integer) 
    not_English = db.Column(db.Integer) 
    not_stated = db.Column(db.Integer) 

    languages = db.relationship('Language', secondary='Language_Program', backref='schools')

class Language(db.Model):
    """Language model"""
    __tablename__ = 'Language'
    
    Language_ID = db.Column(db.Integer, primary_key=True)
    Language = db.Column(db.String(255))

class LanguageProgram(db.Model):
    """Association table for school language programs"""
    __tablename__ = 'Language_Program'
    
    School_AGE_ID = db.Column(db.Integer, db.ForeignKey('schools.School_AGE_ID'), primary_key=True)
    Language_ID = db.Column(db.Integer, db.ForeignKey('Language.Language_ID'), primary_key=True)

class Article(db.Model):
    """QA_Article table for school support articles"""
    __tablename__ = 'QA_Article'

    ID = db.Column(db.Integer, primary_key=True)
    topic = db.Column(db.Text, nullable = True)
    content = db.Column(db.Text, nullable = True)
    reference = db.Column(db.Text, nullable = True)
    licence = db.Column(db.Text, nullable = True)
