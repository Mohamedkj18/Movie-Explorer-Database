document.getElementById('searchForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent form submission
    const query = document.getElementById('searchQuery').value;

    try {
        // Use the correct backend URL
        const response = await fetch('http://127.0.0.1:5000/search?query=' + encodeURIComponent(query));
        const results = await response.json();

        // Update the results section
        const resultsDiv = document.getElementById('searchResults');
        resultsDiv.innerHTML = ''; // Clear previous results

        if (results.length > 0) {
            results.forEach(movie => {
                const movieCard = document.createElement('div');
                movieCard.classList.add('movie-card');
                movieCard.innerHTML = `
                    <h3>${movie.title}</h3>
                    <p>Release Date: ${movie.release_date}</p>
                    <p>Average Rating: ${movie.average_rating}</p>
                    <a href="movie-details.html?movie_id=${movie.movie_id}">View Details</a>
                    <button class="add-to-watchlist" data-movie-id="${movie.movie_id}" data-title="${movie.title}">Add to Watchlist</button>
                `;

                resultsDiv.appendChild(movieCard);
            });
        } else {
            resultsDiv.innerHTML = '<p>No movies found.</p>';
        }
    } catch (error) {
        console.error("Error fetching search results:", error);
    }
});

document.addEventListener('click', function (event) {
    if (event.target.classList.contains('add-to-watchlist')) {
        const movieId = event.target.dataset.movieId;
        const title = event.target.dataset.title;

        // Get the existing watchlist from localStorage
        const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

        // Check if the movie is already in the watchlist
        if (!watchlist.some(movie => movie.movieId === movieId)) {
            watchlist.push({ movieId, title });
            localStorage.setItem('watchlist', JSON.stringify(watchlist));
            alert(`${title} added to your watchlist!`);
        } else {
            alert(`${title} is already in your watchlist.`);
        }
    }
});
