# app/dao.py
from .models import School, Language, LanguageProgram, Article, db
from sqlalchemy.orm import joinedload, selectinload, load_only

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

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


# def fetch_search_result():
#     articles = fetch_all_articles()


def fetch_search_result(search_term):
    df = fetch_all_articles()
    
    vectorizer = TfidfVectorizer(stop_words='english')
    tfidf_matrix = vectorizer.fit_transform(df['Content'])
    query_vec = vectorizer.transform([search_term])

    similarities = cosine_similarity(query_vec, tfidf_matrix)[0]
    top_indices = similarities.argsort()[::-1]

    results = df.iloc[top_indices][['ID', 'Topic']].copy()
    results['similarity_score'] = similarities[top_indices]

    return results.to_dict(orient='records') 
