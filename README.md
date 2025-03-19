# **Movie Explorer - IMDB Database Management System**

## **Project Overview**
This project is a **web-based movie database system** that allows users to:
- **Browse and filter movies**
- **Perform searches** based on titles, languages, and countries
- **Execute custom queries** on the database
- **Manage a watchlist**
- **Run a backend server** that communicates with a MySQL database

The system is built using:
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Python (Flask), MySQL

---

## **Project Structure**
```
├── database_initialization.py   # Creates database tables
├── data_insertion.py            # Inserts movie data from CSV into MySQL
├── main.py                      # Initializes DB and inserts data
├── queries_db_script.py         # Contains SQL queries for data retrieval
├── queries_execution.py         # Executes predefined SQL queries
├── server.py                    # Flask backend for API interactions
│
├── templates/ (Frontend)
│   ├── index.html               # Homepage
│   ├── browse-movies.html       # Browse and filter movies
│   ├── search.html              # Search for movies
│   ├── custom-queries.html      # Execute custom SQL queries
│   ├── watchlist.html           # User's saved movies
│
├── static/ (JavaScript)
│   ├── browse-movies.js         # Fetch and filter movies
│   ├── search.js                # Handle movie search
│   ├── custome-queries.js       # Custom queries execution
│   ├── watchlist.js             # Manage watchlist
```

---

## **Setup and Installation**
### **1. Install Dependencies**
Ensure you have Python, MySQL, and the required packages installed:

```sh
pip install mysql-connector-python flask flask-cors pandas tabulate
```

### **2. Configure MySQL**
- Update **MySQL credentials** in `database_initialization.py`, `main.py`, and `server.py`.

### **3. Run the Backend Server**
Start the Flask server:
```sh
python server.py
```

### **4. Initialize the Database**
```sh
python main.py
```
This creates tables and inserts data.

### **5. Start the Web Interface**
Open `index.html` in a browser.

---

## **Database Schema**
Tables:
- **Movie** (`movie_id`, `title`, `average_rating`, `release_date`, `budget`, `revenue`, `runtime`, `meta_score`)
- **Person** (`name`)
- **Staff_Movie** (`person_name`, `movie_id`, `role`)
- **Country** (`country_name`)
- **Movie_Country** (`movie_id`, `country_name`)
- **Language** (`language_name`)
- **Movie_Language** (`movie_id`, `language_name`)

---

## **Backend API Routes**
| **Endpoint**            | **Method** | **Description** |
|-------------------------|-----------|----------------|
| `/search?query=<title>` | GET       | Search movies by title |
| `/movies`              | GET       | Retrieve all movies with optional filters |
| `/custom-query`        | GET       | Execute predefined SQL queries |

---

## **Frontend Features**
### **1. Browse Movies (`browse-movies.html`)**
- Filter movies by **release year, rating, language, country**
- Add movies to the watchlist

### **2. Search Movies (`search.html`)**
- Search movies by **title**
- View movie details

### **3. Custom Queries (`custom-queries.html`)**
Execute pre-built SQL queries:
1. **Search by keyword** (title)
2. **Filter by staff member**
3. **Total revenue by year**
4. **Actors with above-average ratings**
5. **High-budget multilingual movies**

### **4. Watchlist (`watchlist.html`)**
- Save favorite movies using `localStorage`
- Remove movies from the watchlist

---

## **How to Use**
1. **Start the Flask server** (`server.py`).
2. **Open `index.html` in a browser**.
3. **Browse/Search/Add movies to watchlist**.
4. **Execute SQL queries from `custom-queries.html`**.


---


