document.addEventListener('DOMContentLoaded', () => {
    const genres = {
        Horror: [
            { title: 'The Conjuring', posterUrl: 'https://th.bing.com/th/id/OIP.tijjQeuSyqr9-9oBkSyWJAHaLH?w=118&h=180&c=7&r=0&o=5&pid=1.7', rating: '7.5' },
            { title: 'Insidious', posterUrl: 'https://th.bing.com/th/id/OIP._w_Iv25wWxXDEewiO7Yt9gHaLH?w=129&h=193&c=7&r=0&o=5&pid=1.7', rating: '6.8' },
            { title: 'Hereditary', posterUrl: 'https://th.bing.com/th/id/OIP.xkw4yPzp0B9k7Jj8ISpV7gHaJ4?w=145&h=193&c=7&r=0&o=5&pid=1.7', rating: '7.3' },
            { title: 'Get Out', posterUrl: 'https://th.bing.com/th/id/OIP.N05URRwVpVun8p3o0Z59gQHaLH?w=131&h=196&c=7&r=0&o=5&pid=1.7', rating: '7.7' },
            { title: 'A Quiet Place', posterUrl: 'https://th.bing.com/th/id/OIP.fbRKUcGQR9r6nDfGPA_h0AHaLH?w=115&h=180&c=7&r=0&o=5&pid=1.7', rating: '7.5' }
        ],
        Comedy: [
            { title: 'The Hangover', posterUrl: 'https://th.bing.com/th/id/OIP.ADRHzS8-UMpMuSTWlvxAuwHaJ4?w=130&h=180&c=7&r=0&o=5&pid=1.7', rating: '7.7' },
            { title: 'Step Brothers', posterUrl: 'https://th.bing.com/th/id/OIP.VSyAtlrurLHxoZ-0T_Kc3AHaLH?w=125&h=187&c=7&r=0&o=5&pid=1.7', rating: '6.9' },
            { title: 'Superbad', posterUrl: 'https://th.bing.com/th/id/OIP.nsu26R_UgU1mEYB-peOQmwHaLD?w=124&h=186&c=7&r=0&o=5&pid=1.7', rating: '7.6' },
            { title: 'Anchorman', posterUrl: 'https://th.bing.com/th/id/OIP.NKZGvnxgKPbiTw1n8vmkBQHaK-?w=131&h=195&c=7&r=0&o=5&pid=1.7', rating: '7.2' },
            { title: '21 Jump Street', posterUrl: 'https://th.bing.com/th/id/OIP.NlDkWgLRsvE1tHIQkNEfDQHaLH?w=115&h=180&c=7&r=0&o=5&pid=1.7', rating: '7.2' }
        ],
        Thriller: [
            { title: 'Shutter Island', posterUrl: 'https://th.bing.com/th/id/OIP.lyYXLs6LSaN_0Dws57KdnQHaK9?w=119&h=180&c=7&r=0&o=5&pid=1.7', rating: '8.2' },
            { title: 'Gone Girl', posterUrl: 'https://th.bing.com/th/id/OIP.FbFjCxuh2eBy4klql9hbXQHaJn?w=123&h=180&c=7&r=0&o=5&pid=1.7', rating: '7.8' },
            { title: 'Prisoners', posterUrl: 'https://th.bing.com/th/id/OIP.3ezJSOzZg4PsoPpmVdjlcQHaL2?w=115&h=180&c=7&r=0&o=5&pid=1.7', rating: '8.1' },
            { title: 'Black Swan', posterUrl: 'https://th.bing.com/th/id/OIP.30O1w1qlBtNwpD1xLPaODQAAAA?w=272&h=181&c=7&r=0&o=5&pid=1.7', rating: '8.0' },
            { title: 'Se7en', posterUrl: 'https://th.bing.com/th/id/OIP.3MxCiRfV0BjhQwokd_w2UgHaLH?w=116&h=180&c=7&r=0&o=5&pid=1.7', rating: '8.6' }
        ]
    };

    const genreSections = document.getElementById('genre-sections');

    // Render all genres and movies
    for (const genre in genres) {
        const genreSection = document.createElement('div');
        genreSection.classList.add('genre-section');

        const genreTitle = document.createElement('h2');
        genreTitle.classList.add('genre-title');
        genreTitle.innerText = genre;

        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');

        genres[genre].forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.classList.add('movie-card');

            const movieImage = document.createElement('img');
            movieImage.src = movie.posterUrl;
            movieCard.appendChild(movieImage);

            const movieTitle = document.createElement('h3');
            movieTitle.innerText = movie.title;
            movieCard.appendChild(movieTitle);

            const movieRating = document.createElement('p');
            movieRating.classList.add('rating');
            movieRating.innerText = `Rating: ${movie.rating}`;
            movieCard.appendChild(movieRating);

            movieContainer.appendChild(movieCard);
        });

        genreSection.appendChild(genreTitle);
        genreSection.appendChild(movieContainer);
        genreSections.appendChild(genreSection);
    }

    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const movieCards = document.querySelectorAll('.movie-card');
        let foundMovie = null;
        let foundGenre = null;

        movieCards.forEach(card => {
            const title = card.querySelector('h3').innerText.toLowerCase();
            const genreTitle = card.closest('.genre-section').querySelector('.genre-title').innerText;

            if (title.includes(searchTerm)) {
                card.style.display = 'block';
                foundMovie = title;
                foundGenre = genreTitle;
            } else {
                card.style.display = 'none';
            }
        });

        if (foundMovie && foundGenre) {
            displayRecommendedMovies(foundGenre);
        } else {
            clearRecommendations();
        }
    });

    function displayRecommendedMovies(includedGenre) {
        clearRecommendations();

        const recommendationsSection = document.createElement('div');
        recommendationsSection.classList.add('recommended');
        recommendationsSection.innerHTML = `<h2>Recommended Movies from ${includedGenre}:</h2>`;

        genres[includedGenre].forEach(movie => {
            const movieDiv = document.createElement('div');
            movieDiv.classList.add('recommended-movie-card');

            const movieImage = document.createElement('img');
            movieImage.src = movie.posterUrl;
            movieImage.classList.add('recommended-movie-image');
            movieDiv.appendChild(movieImage);

            const movieTitle = document.createElement('h3');
            movieTitle.innerText = movie.title;
            movieDiv.appendChild(movieTitle);

            const movieRating = document.createElement('p');
            movieRating.classList.add('rating');
            movieRating.innerText = `Rating: ${movie.rating}`;
            movieDiv.appendChild(movieRating);

            recommendationsSection.appendChild(movieDiv);
        });

        document.body.appendChild(recommendationsSection);
    }

    function clearRecommendations() {
        const existingRecommendations = document.querySelector('.recommended');
        if (existingRecommendations) {
            existingRecommendations.remove();
        }
    }


});

