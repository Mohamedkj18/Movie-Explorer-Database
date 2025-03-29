from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import importlib.util
from queries_db_script import query_1, query_2, query_3, query_4, query_5

app = Flask(__name__)

# Enable CORS
CORS(app)

# Database connection
db = mysql.connector.connect(
    host="localhost",
    user="mohamedj",
    password="********",
    database="mohamedj",
    port=3305
)

@app.route('/search', methods=['GET'])
def search_movies():
    query = request.args.get('query', '')
    cursor = db.cursor(dictionary=True)

    # Search query with SQL wildcard matching
    cursor.execute("SELECT movie_id, title, release_date, average_rating FROM Movie WHERE title LIKE %s", (f"%{query}%",))
    results = cursor.fetchall()

    cursor.close()
    return jsonify(results)


@app.route('/movies', methods=['GET'])
def get_movies():
    # Extract filters from query parameters
    release_year = request.args.get('release_year')
    rating_min = request.args.get('rating_min')
    language = request.args.get('language')
    country = request.args.get('country')

    # Build SQL query with optional filters
    query = "SELECT movie_id, title, release_date, average_rating FROM Movie"
    filters = []
    if release_year:
        filters.append(f"YEAR(release_date) = {release_year}")
    if rating_min:
        filters.append(f"average_rating >= {rating_min}")
    if language:
        filters.append(f"language_name = '{language}'")
    if country:
        filters.append(f"country_name = '{country}'")
    
    if filters:
        query += " WHERE " + " AND ".join(filters)

    cursor = db.cursor(dictionary=True)
    cursor.execute(query)
    movies = cursor.fetchall()
    cursor.close()

    return jsonify(movies)

@app.route('/custom-query', methods=['GET'])
def custom_query():
    query_type = request.args.get('query_type', '')
    keyword = request.args.get('keyword', '')

    try:
        if query_type == '1':
            query = query_1(keyword)
        elif query_type == '2':
            query = query_2(keyword)
        elif query_type == '3':
            query = query_3()
        elif query_type == '4':
            query = query_4()
        elif query_type == '5':
            query = query_5()
        else:
            return jsonify({"error": "Invalid query type"}), 400

        # Log the query for debugging
        print("Executing query:", query)

        # Execute the query
        cursor = db.cursor(dictionary=True)
        cursor.execute(query)
        results = cursor.fetchall()
        cursor.close()

        return jsonify(results)

    except Exception as e:
        # Log the error and return a 500 response
        print("Error occurred:", str(e))
        return jsonify({"error": "An error occurred", "details": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
