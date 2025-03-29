// Fetch and display all movies
async function fetchMovies(filters = {}) {
    try {
        // Build query parameters based on filters
        let queryParams = [];
        if (filters.releaseYear) queryParams.push(`release_year=${filters.releaseYear}`);
        if (filters.ratingRange) queryParams.push(`rating_min=${filters.ratingRange}`);
        if (filters.language) queryParams.push(`language=${filters.language}`);
        if (filters.country) queryParams.push(`country=${filters.country}`);

        const queryString = queryParams.length ? '?' + queryParams.join('&') : '';
        const response = await fetch(`http://127.0.0.1:5000/movies${queryString}`);
        const movies = await response.json();

        // Populate movie list
        const movieList = document.getElementById('movieList');
        movieList.innerHTML = ''; // Clear previous movies
        movies.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.classList.add('movie-card');
            movieCard.innerHTML = `
                <h3>${movie.title}</h3>
                <p>Release Date: ${movie.release_date}</p>
                <p>Average Rating: ${movie.average_rating}</p>
                <button class="add-to-watchlist" data-movie-id="${movie.movie_id}" data-title="${movie.title}">Add to Watchlist</button>
            `;
            movieList.appendChild(movieCard);
        });
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

// Apply filters
document.getElementById('applyFilters').addEventListener('click', () => {
    const releaseYear = document.getElementById('releaseYear').value;
    const ratingRange = document.getElementById('ratingRange').value;
    const language = document.getElementById('language').value;
    const country = document.getElementById('country').value;

    const filters = {
        releaseYear,
        ratingRange,
        language,
        country
    };
    fetchMovies(filters);
});

// Fetch all movies on page load
fetchMovies();

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
