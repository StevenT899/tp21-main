# from flask import Flask, jsonify, request
# import mysql.connector
# from flask_cors import CORS
# import configparser

# app = Flask(__name__)
# CORS(app)

# config = configparser.ConfigParser()
# config.read('config.ini')
# VALID_USERNAME = config.get('login', 'username')
# VALID_PASSWORD = config.get('login', 'password')

# def get_schools_from_db():
#     try:
#         # connect to mariadb
#         conn = mysql.connector.connect(
#             host='3.107.27.249',
#             user='newbee',
#             password='newbee21',
#             database='newbee_db'
#         )
#         cursor = conn.cursor()

#         # perform SQL query: join 3 tables
#         query = """
#             SELECT 
#                 s.School_AGE_ID, 
#                 s.School_Name, 
#                 s.Suburb, 
#                 s.Postcode, 
#                 s.School_Sector, 
#                 s.School_URL, 
#                 s.Year_Range, 
#                 s.ICSEA, 
#                 s.Teaching_Staff, 
#                 s.Non_Teaching_Staff, 
#                 s.Teaching_staff_per_student, 
#                 s.Girls_Enrolment, 
#                 s.Boys_Enrolment, 
#                 s.Total_Enrolment, 
#                 s.Latitude, 
#                 s.Longitude, 
#                 s.SA2_ID, 
#                 s.Language_Flag,
#                 GROUP_CONCAT(TRIM(REPLACE(l.Language, '\r', '')) SEPARATOR ',') AS languages
#             FROM 
#                 schools s
#             LEFT JOIN 
#                 Language_Program lp ON s.School_AGE_ID = lp.School_AGE_ID
#             LEFT JOIN 
#                 `Language` l ON lp.Language_ID = l.Language_id
#             GROUP BY 
#                 s.School_AGE_ID;
#         """
#         cursor.execute(query)
#         rows = cursor.fetchall()

#         schools = []
#         for row in rows:
#             school = {
#                 'School_AGE_ID': row[0],
#                 'School_Name': row[1],
#                 'Suburb': row[2],
#                 'Postcode': row[3],
#                 'School_Sector': row[4],
#                 'School_URL': row[5],
#                 'Year_Range': row[6],
#                 'ICSEA': row[7],
#                 'Teaching_Staff': row[8],
#                 'Non_Teaching_Staff': row[9],
#                 'Teaching_staff_per_student': row[10],
#                 'Girls_Enrolment': row[11],
#                 'Boys_Enrolment': row[12],
#                 'Total_Enrolment': row[13],
#                 'Latitude': row[14],
#                 'Longitude': row[15],
#                 'SA2_ID': row[16],
#                 'Language_Flag': row[17],
#                 'languages': row[18].split(',') if row[18] else []
#             }
#             schools.append(school)

#         # close db connection
#         conn.close()
#         return schools
#     except Exception as e:
#         print(f"Error fetching schools from database: {e}")
#         return []


# @app.route('/schools', methods=['GET'])
# def get_schools():
#     schools = get_schools_from_db()
#     return jsonify(schools)



# @app.route('/school/<int:school_id>', methods=['GET'])
# def get_school_by_id(school_id):
#     try:
#         conn = mysql.connector.connect(
#             host='3.107.27.249',
#             user='newbee',
#             password='newbee21',
#             database='newbee_db'
#         )
#         cursor = conn.cursor()

#         query = """
#             SELECT 
#                 s.School_AGE_ID, 
#                 s.School_Name, 
#                 s.Suburb, 
#                 s.Postcode, 
#                 s.School_Sector, 
#                 s.School_URL, 
#                 s.Year_Range, 
#                 s.ICSEA, 
#                 s.Teaching_Staff, 
#                 s.Non_Teaching_Staff, 
#                 s.Teaching_staff_per_student, 
#                 s.Girls_Enrolment, 
#                 s.Boys_Enrolment, 
#                 s.Total_Enrolment, 
#                 s.Latitude, 
#                 s.Longitude, 
#                 s.SA2_ID, 
#                 s.Language_Flag,
#                 s.English,
#                 s.not_English,
#                 s.not_stated,
#                 GROUP_CONCAT(TRIM(REPLACE(l.Language, '\r', '')) SEPARATOR ',') AS languages
#             FROM 
#                 schools s
#             LEFT JOIN 
#                 Language_Program lp ON s.School_AGE_ID = lp.School_AGE_ID
#             LEFT JOIN 
#                 `Language` l ON lp.Language_ID = l.Language_id
#             WHERE 
#                 s.School_AGE_ID = %s
#             GROUP BY 
#                 s.School_AGE_ID;
#         """

#         cursor.execute(query, (school_id,))
#         row = cursor.fetchone()

#         if row:
#             school = {
#                 'School_AGE_ID': row[0],
#                 'School_Name': row[1],
#                 'Suburb': row[2],
#                 'Postcode': row[3],
#                 'School_Sector': row[4],
#                 'School_URL': row[5],
#                 'Year_Range': row[6],
#                 'ICSEA': row[7],
#                 'Teaching_Staff': row[8],
#                 'Non_Teaching_Staff': row[9],
#                 'Teaching_staff_per_student': row[10],
#                 'Girls_Enrolment': row[11],
#                 'Boys_Enrolment': row[12],
#                 'Total_Enrolment': row[13],
#                 'Latitude': row[14],
#                 'Longitude': row[15],
#                 'SA2_ID': row[16],
#                 'Language_Flag': row[17],
#                 'English': row[18],
#                 'not_English': row[19],
#                 'not_stated': row[20],
#                 'languages': row[21].split(',') if row[21] else []
#             }
#             return jsonify(school)
#         else:
#             return jsonify({'error': 'School not found'}), 404

#     except Exception as e:
#         print(f'Error fetching school by ID: {e}')
#         return jsonify({'error': 'Internal server error'}), 500

# @app.route('/login', methods=['POST'])
# def login():
#     data = request.get_json()
#     username = data.get('username')
#     password = data.get('password')
#     print(f"Received username: {username}, password: {password}")
#     print(f"Valid username: {VALID_USERNAME}, valid password: {VALID_PASSWORD}")
#     if username == VALID_USERNAME and password == VALID_PASSWORD:
#         return jsonify({"success": True, "message": "Login successful"})
#     else:
#         return jsonify({"success": False, "message": "Invalid username or password"}), 401

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000)





from flask import Flask, jsonify, request
import mysql.connector
from flask_cors import CORS
import configparser

app = Flask(__name__)
CORS(app)

config = configparser.ConfigParser()
config.read('config.ini')
VALID_USERNAME = config.get('login', 'username')
VALID_PASSWORD = config.get('login', 'password')

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
                s.ICSEA_percentile,  # Make sure this is selected
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
                'ICSEA_percentile': row[8],  # This is the crucial addition
                'Teaching_Staff': row[9],
                'Non_Teaching_Staff': row[10],
                'Teaching_staff_per_student': row[11],
                'Girls_Enrolment': row[12],
                'Boys_Enrolment': row[13],
                'Total_Enrolment': row[14],
                'Latitude': row[15],
                'Longitude': row[16],
                'SA2_ID': row[17],
                'Language_Flag': row[18],
                'languages': row[19].split(',') if row[19] else []
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


@app.route('/school/<int:school_id>', methods=['GET'])
def get_school_by_id(school_id):
    try:
        conn = mysql.connector.connect(
            host='3.107.27.249',
            user='newbee',
            password='newbee21',
            database='newbee_db'
        )
        cursor = conn.cursor()

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
                s.ICSEA_percentile,  # Include ICSEA_percentile
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
        """

        cursor.execute(query, (school_id,))
        row = cursor.fetchone()

        if row:
            school = {
                'School_AGE_ID': row[0],
                'School_Name': row[1],
                'Suburb': row[2],
                'Postcode': row[3],
                'School_Sector': row[4],
                'School_URL': row[5],
                'Year_Range': row[6],
                'ICSEA': row[7],
                'ICSEA_percentile': row[8],  # Include ICSEA_percentile here as well
                'Teaching_Staff': row[9],
                'Non_Teaching_Staff': row[10],
                'Teaching_staff_per_student': row[11],
                'Girls_Enrolment': row[12],
                'Boys_Enrolment': row[13],
                'Total_Enrolment': row[14],
                'Latitude': row[15],
                'Longitude': row[16],
                'SA2_ID': row[17],
                'Language_Flag': row[18],
                'English': row[19],
                'not_English': row[20],
                'not_stated': row[21],
                'languages': row[22].split(',') if row[22] else []
            }
            return jsonify(school)
        else:
            return jsonify({'error': 'School not found'}), 404

    except Exception as e:
        print(f'Error fetching school by ID: {e}')
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    print(f"Received username: {username}, password: {password}")
    if username == VALID_USERNAME and password == VALID_PASSWORD:
        return jsonify({"success": True, "message": "Login successful"})
    else:
        return jsonify({"success": False, "message": "Invalid username or password"}), 401

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
