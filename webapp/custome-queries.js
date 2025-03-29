document.addEventListener('DOMContentLoaded', function () {
    const queryTypeSelect = document.getElementById('queryType');
    const keywordInput = document.getElementById('keywordInput');
    const keywordField = document.getElementById('queryKeyword');
    const queryResultsDiv = document.getElementById('queryResults');

    queryTypeSelect.addEventListener('change', function () {
        const selectedQuery = queryTypeSelect.value;
        if (selectedQuery === '1' || selectedQuery === '2') {
            keywordInput.style.display = 'block';
        } else {
            keywordInput.style.display = 'none';
            keywordField.value = '';
        }
    });

    document.getElementById('executeQuery').addEventListener('click', async function () {
        const queryType = queryTypeSelect.value;
        const keyword = keywordField.value;

        if (!queryType) {
            alert('Please select a query type.');
            return;
        }

        queryResultsDiv.innerHTML = '<p>Loading...</p>';

        try {
            const response = await fetch(`http://127.0.0.1:5000/custom-query?query_type=${queryType}&keyword=${encodeURIComponent(keyword)}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const results = await response.json();
            queryResultsDiv.innerHTML = '';

            if (results.length > 0) {
                displayResultsAsCards(queryType, results);
            } else {
                queryResultsDiv.innerHTML = '<p>No results found.</p>';
            }
        } catch (error) {
            console.error('Error executing query:', error);
            queryResultsDiv.innerHTML = '<p>Error fetching query results. Check console for details.</p>';
        }
    });

    function displayResultsAsCards(queryType, data) {
        data.forEach(result => {
            const card = document.createElement('div');
            card.classList.add('movie-card');

            if (queryType === '1') {
                // Query 1: Movie Search by Keyword
                card.innerHTML = `
                    <h3>${result.title || 'N/A'}</h3>
                    <p>Release Date: ${result.release_date || 'N/A'}</p>
                    <p>Meta Score: ${result.meta_score || 'N/A'}</p>
                    <button class="add-to-watchlist" data-title="${result.title}">Add to Watchlist</button>
                `;
            } else if (queryType === '2') {
                // Query 2: Filter Movies by Staff Member
                card.innerHTML = `
                    <h3>Actor: ${result.actor_name || 'N/A'}</h3>
                    <p>Movie: ${result.movie_title || 'N/A'}</p>
                    <p>Role: ${result.role || 'N/A'}</p>
                `;
            } else if (queryType === '3') {
                // Query 3: Total Revenue by Year
                card.innerHTML = `
                    <h3>Release Year: ${result.release_year || 'N/A'}</h3>
                    <p>Total Revenue: ${result.total_revenue || 'N/A'}</p>
                `;
            } else if (queryType === '4') {
                // Query 4: Actors with Above Average Ratings
                card.innerHTML = `
                    <h3>Actor: ${result.actor_name || 'N/A'}</h3>
                    <p>Actor Average Rating: ${result.actor_avg_rating || 'N/A'}</p>
                    <p>Global Average Rating: ${result.global_avg_rating || 'N/A'}</p>
                `;
            } else if (queryType === '5') {
                // Query 5: Movies with Budget > $100M
                card.innerHTML = `
                    <h3>Movie: ${result.movie_title || 'N/A'}</h3>
                    <p>Budget: ${result.budget || 'N/A'}</p>
                    <p>Languages: ${result.number_of_languages || 'N/A'}</p>
                    <p>Available in Arabic: ${result.available_in_Arabic || 'N/A'}</p>
                `;
            }

            queryResultsDiv.appendChild(card);
        });
    }
});
