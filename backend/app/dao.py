import mysql.connector
from .config import DB

def get_conn():
    return mysql.connector.connect(**DB)

def fetch_all_schools():
    conn = get_conn()
    cur  = conn.cursor()
    cur.execute("""
            SELECT 
                s.School_AGE_ID, 
                s.School_Name, 
                s.Suburb, 
                s.Postcode, 
                s.School_Sector, 
                s.School_URL, 
                s.Year_Range, 
                s.ICSEA, 
                s.Teaching_Staff, 
                s.Non_Teaching_Staff, 
                s.Teaching_staff_per_student, 
                s.Girls_Enrolment, 
                s.Boys_Enrolment, 
                s.Total_Enrolment, 
                s.Latitude, 
                s.Longitude, 
                s.SA2_ID, 
                s.Language_Flag,
                GROUP_CONCAT(TRIM(REPLACE(l.Language, '\r', '')) SEPARATOR ',') AS languages
            FROM 
                schools s
            LEFT JOIN 
                Language_Program lp ON s.School_AGE_ID = lp.School_AGE_ID
            LEFT JOIN 
                `Language` l ON lp.Language_ID = l.Language_id
            GROUP BY 
                s.School_AGE_ID;
        """)
    rows = cur.fetchall()
    cur.close()
    conn.close()

    result = []
    for row in rows:
        result.append({
            'School_AGE_ID': row[0],
                'School_Name': row[1],
                'Suburb': row[2],
                'Postcode': row[3],
                'School_Sector': row[4],
                'School_URL': row[5],
                'Year_Range': row[6],
                'ICSEA': row[7],
                'Teaching_Staff': row[8],
                'Non_Teaching_Staff': row[9],
                'Teaching_staff_per_student': row[10],
                'Girls_Enrolment': row[11],
                'Boys_Enrolment': row[12],
                'Total_Enrolment': row[13],
                'Latitude': row[14],
                'Longitude': row[15],
                'SA2_ID': row[16],
                'Language_Flag': row[17],
                'languages': row[18].split(',') if row[18] else []
        })
    return result

def fetch_school_by_id(sid):
    conn = get_conn()
    cur  = conn.cursor()
    cur.execute("""
            SELECT 
                s.School_AGE_ID, 
                s.School_Name, 
                s.Suburb, 
                s.Postcode, 
                s.School_Sector, 
                s.School_URL, 
                s.Year_Range, 
                s.ICSEA, 
                s.Teaching_Staff, 
                s.Non_Teaching_Staff, 
                s.Teaching_staff_per_student, 
                s.Girls_Enrolment, 
                s.Boys_Enrolment, 
                s.Total_Enrolment, 
                s.Latitude, 
                s.Longitude, 
                s.SA2_ID, 
                s.Language_Flag,
                s.English,
                s.not_English,
                s.not_stated,
                GROUP_CONCAT(TRIM(REPLACE(l.Language, '\r', '')) SEPARATOR ',') AS languages
            FROM 
                schools s
            LEFT JOIN 
                Language_Program lp ON s.School_AGE_ID = lp.School_AGE_ID
            LEFT JOIN 
                `Language` l ON lp.Language_ID = l.Language_id
            WHERE 
                s.School_AGE_ID = %s
            GROUP BY 
                s.School_AGE_ID;
        """, (sid,))
    row = cur.fetchone()
    cur.close()
    conn.close()
    if not row:
        return None
    return {
                'School_AGE_ID': row[0],
                'School_Name': row[1],
                'Suburb': row[2],
                'Postcode': row[3],
                'School_Sector': row[4],
                'School_URL': row[5],
                'Year_Range': row[6],
                'ICSEA': row[7],
                'Teaching_Staff': row[8],
                'Non_Teaching_Staff': row[9],
                'Teaching_staff_per_student': row[10],
                'Girls_Enrolment': row[11],
                'Boys_Enrolment': row[12],
                'Total_Enrolment': row[13],
                'Latitude': row[14],
                'Longitude': row[15],
                'SA2_ID': row[16],
                'Language_Flag': row[17],
                'English': row[18],
                'not_English': row[19],
                'not_stated': row[20],
                'languages': row[21].split(',') if row[21] else []
            }
