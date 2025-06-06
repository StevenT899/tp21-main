"""
app/dao.py

Description:
    Data access layer for retrieving and transforming data from the database.
    This module provides reusable query functions for schools, languages,
    zone-based search, and Q&A articles. It also includes logic for semantic
    search using sentence embeddings.

Key Features:
    - Fetch school records with optional filtering (by name or zone)
    - Return detailed school information including languages and geolocation
    - Retrieve FAQ articles and individual article content
    - Perform semantic similarity search using SentenceTransformer and cosine similarity

Dependencies:
    - SQLAlchemy ORM (joinedload, selectinload) for efficient relationship queries
    - Pandas + NumPy for semantic search result handling
    - SentenceTransformer (MiniLM-L3-v2) for natural language embeddings
    - Flask jsonify for consistent API response formatting

Exports:
    - fetch_all_schools()
    - fetch_all_zone_schools()
    - fetch_zone_schools_by_name(name)
    - fetch_school_by_id(sid)
    - fetch_all_articles()
    - fetch_article_by_id(article_id)
    - fetch_search_result(query, articles)
"""

from .models import School, Language, LanguageProgram, Article, db
from sqlalchemy.orm import joinedload, selectinload, load_only

from flask import jsonify
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
import numpy as np

def fetch_all_schools():
    """
    Retrieve all schools with their associated languages.
    
    Returns:
        list: A list of dictionaries containing school details and languages.
    """
    # Query schools with eager loading of associated languages
    schools = School.query.options(
        load_only(
            School.School_AGE_ID, 
            School.School_Name, 
            School.Suburb,
            School.Postcode,
            School.School_Sector,
            School.Latitude,
            School.Longitude,
            School.Language_Flag
        ),
        selectinload(School.languages).load_only(Language.Language)
    ).all()
    result = []
    for school in schools:
        result.append({
            'School_AGE_ID': school.School_AGE_ID,
            'School_Name': school.School_Name,
            'Suburb': school.Suburb,
            'Postcode': school.Postcode,
            'School_Sector': school.School_Sector,
            'Latitude': school.Latitude,
            'Longitude': school.Longitude,
            'Language_Flag': school.Language_Flag,
            'languages': [lang.Language for lang in school.languages]
        })
    return result


def fetch_all_zone_schools():
    """
    Retrieve schools with zone information and associated languages.
    
    Returns:
        list: A list of dictionaries containing school details, coordinates, and languages.
    """
    # Query schools with zone information and eager loading of languages
    schools = db.session.query(School).outerjoin(LanguageProgram).filter(School.coordinates != None, School.coordinates != '[]').options(selectinload(School.languages)).all()
    result = []
    for school in schools:
        result.append({
            'School_AGE_ID': school.School_AGE_ID,
            'School_Name': school.School_Name,
            'Suburb': school.Suburb,
            'Postcode': school.Postcode,
            'School_Sector': school.School_Sector,
            'School_URL': school.School_URL,
            'Year_Range': school.Year_Range,
            'ICSEA': school.ICSEA,
            'Teaching_Staff': school.Teaching_Staff,
            'Non_Teaching_Staff': school.Non_Teaching_Staff,
            'Teaching_staff_per_student': school.Teaching_staff_per_student,
            'Girls_Enrolment': school.Girls_Enrolment,
            'Boys_Enrolment': school.Boys_Enrolment,
            'Total_Enrolment': school.Total_Enrolment,
            'Latitude': school.Latitude,
            'Longitude': school.Longitude,
            'SA2_ID': school.SA2_ID,
            'Language_Flag': school.Language_Flag,
            'coordinates': school.coordinates,
            'languages': [lang.Language for lang in school.languages]
        })
    return result


def fetch_zone_schools_by_name(name):
    """
    Retrieve schools by name with zone information and associated languages.
    
    Args:
        name (str): The search term for school names.
    
    Returns:
        list: A list of dictionaries containing matching school details, coordinates, and languages.
    """
    # Query schools by name with zone information and eager loading of languages
    schools = db.session.query(School).outerjoin(LanguageProgram).outerjoin(Language).filter(School.coordinates != None, School.coordinates != '[]', School.School_Name.ilike(f"%{name}%")).options(selectinload(School.languages)).all()
    result = []
    for school in schools:
        result.append({
            'School_AGE_ID': school.School_AGE_ID,
            'School_Name': school.School_Name,
            'Suburb': school.Suburb,
            'Postcode': school.Postcode,
            'School_Sector': school.School_Sector,
            'School_URL': school.School_URL,
            'Year_Range': school.Year_Range,
            'ICSEA': school.ICSEA,
            'Teaching_Staff': school.Teaching_Staff,
            'Non_Teaching_Staff': school.Non_Teaching_Staff,
            'Teaching_staff_per_student': school.Teaching_staff_per_student,
            'Girls_Enrolment': school.Girls_Enrolment,
            'Boys_Enrolment': school.Boys_Enrolment,
            'Total_Enrolment': school.Total_Enrolment,
            'Latitude': school.Latitude,
            'Longitude': school.Longitude,
            'SA2_ID': school.SA2_ID,
            'Language_Flag': school.Language_Flag,
            'coordinates': school.coordinates,
            'languages': [lang.Language for lang in school.languages]
        })
    return result


def fetch_school_by_id(sid):
    """
    Retrieve a single school by its ID with detailed information.
    
    Args:
        sid (int): The unique identifier for the school.
    
    Returns:
        dict: A dictionary containing detailed school information and languages,
              or None if the school is not found.
    """
    # Query a specific school by ID with eager loading of languages
    school = db.session.query(School).outerjoin(LanguageProgram).outerjoin(Language).filter(School.School_AGE_ID == sid).options(joinedload(School.languages)).first()
    
    if not school:
        return None
    
    return {
        'School_AGE_ID': school.School_AGE_ID,
        'School_Name': school.School_Name,
        'Suburb': school.Suburb,
        'Postcode': school.Postcode,
        'School_Sector': school.School_Sector,
        'School_URL': school.School_URL,
        'Year_Range': school.Year_Range,
        'ICSEA': school.ICSEA,
        'ICSEA_percentile': school.ICSEA_percentile,
        'Teaching_Staff': school.Teaching_Staff,
        'Non_Teaching_Staff': school.Non_Teaching_Staff,
        'Teaching_staff_per_student': school.Teaching_staff_per_student,
        'Girls_Enrolment': school.Girls_Enrolment,
        'Boys_Enrolment': school.Boys_Enrolment,
        'Total_Enrolment': school.Total_Enrolment,
        'Latitude': school.Latitude,
        'Longitude': school.Longitude,
        'SA2_ID': school.SA2_ID,
        'Language_Flag': school.Language_Flag,
        'English': school.English,
        'not_English': school.not_English,
        'not_stated': school.not_stated,
        'languages': [lang.Language for lang in school.languages],
        'coordinates': school.coordinates
    }

def fetch_all_articles():
    """
    Retrieve all QA articles with selected fields.
    Returns:
        list: A list of dictionaries containing article details.
    """
    articles = Article.query.options(
        load_only(
            Article.ID,
            Article.topic,
            Article.content,
            Article.reference,
            Article.licence
        )
    ).all()
    result = []
    for article in articles:
        result.append({
            'ID': article.ID,
            'topic': article.topic,
            'content': article.content,
            'reference': article.reference,
            'licence': article.licence
        })
    return result

def fetch_article_by_id(article_id):
    """
    Retrieve a single QA article by its ID.
    Returns:
        Article or None
    """
    return Article.query.options(
        load_only(
            Article.ID,
            Article.topic,
            Article.content,
            Article.reference,
            Article.licence
        )
    ).get(article_id)




model = SentenceTransformer('paraphrase-MiniLM-L3-v2')

def fetch_search_result(query, articles):
    if not query or not articles:
        return jsonify({"error": "Missing query or articles"}), 400
    
    df = pd.DataFrame(articles)
    if df.empty or 'content' not in df.columns:
        return jsonify({"error": "Invalid article data"}), 400
    df['content'] = df['content'].fillna("")

    article_embeddings = model.encode(df['content'].tolist(), show_progress_bar=False)
    query_embedding = model.encode([query])

    
    similarities = cosine_similarity(query_embedding, article_embeddings)[0]
    top_indices = np.argsort(similarities)[::-1]

   
    df_result = df.iloc[top_indices].copy()
    df_result['similarity_score'] = similarities[top_indices]

    df_result = df_result[df_result['similarity_score'] > 0]

    df_result['content'] = df_result['content'].apply(
        lambda x: ' '.join(x.split()[:15]) + ('...' if len(x.split()) > 15 else '')
    )

    result = df_result.to_dict(orient='records')

    return result