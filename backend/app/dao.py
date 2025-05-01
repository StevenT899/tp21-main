# app/dao.py
from .models import School, Language, LanguageProgram, db
from sqlalchemy.orm import joinedload, selectinload

def fetch_all_schools():
    """
    Retrieve all schools with their associated languages.
    
    Returns:
        list: A list of dictionaries containing school details and languages.
    """
    # Query schools with eager loading of associated languages
    schools = School.query.options(selectinload(School.languages)).all()
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
