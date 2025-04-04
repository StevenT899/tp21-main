from flask import Flask, jsonify
import mysql.connector
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def get_schools_from_db():
    try:
        # connect to mariadb
        conn = mysql.connector.connect(
            host='3.107.27.249',
            user='newbee',
            password='newbee21',
            database='newbee_db'
        )
        cursor = conn.cursor()

        # perform SQL query: join 3 tables
        query = """
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
        """
        cursor.execute(query)
        rows = cursor.fetchall()

        schools = []
        for row in rows:
            school = {
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
            }
            schools.append(school)

        # close db connection
        conn.close()
        return schools
    except Exception as e:
        print(f"Error fetching schools from database: {e}")
        return []


@app.route('/schools', methods=['GET'])
def get_schools():
    schools = get_schools_from_db()
    return jsonify(schools)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)