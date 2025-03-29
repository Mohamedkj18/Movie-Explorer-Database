// Watchlist.js: Manage the user's watchlist

// Display the watchlist when the page loads
document.addEventListener('DOMContentLoaded', function () {
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    const watchlistContainer = document.getElementById('watchlist');

    if (watchlist.length > 0) {
        watchlist.forEach(movie => {
            const movieItem = document.createElement('li');
            movieItem.innerHTML = `
                <span>${movie.title}</span>
                <button class="remove-from-watchlist" data-movie-id="${movie.movieId}">Remove</button>
            `;
            watchlistContainer.appendChild(movieItem);
        });
    } else {
        watchlistContainer.innerHTML = '<p>Your watchlist is empty.</p>';
    }
});

// Remove movies from the watchlist
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('remove-from-watchlist')) {
        const movieId = event.target.dataset.movieId;

        // Get the existing watchlist from localStorage
        let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

        // Filter out the movie to be removed
        watchlist = watchlist.filter(movie => movie.movieId !== movieId);
        localStorage.setItem('watchlist', JSON.stringify(watchlist));

        // Refresh the watchlist display
        event.target.parentElement.remove();

        if (watchlist.length === 0) {
            const watchlistContainer = document.getElementById('watchlist');
            watchlistContainer.innerHTML = '<p>Your watchlist is empty.</p>';
        }
    }
});
