import React from 'react';
// import './MoviePopup.css'; // CSS for the pop-up component

function MoviePopup({ movie, onClose }) { // Receive movie data and close function as props
    return (
        <div className="movie-popup">
            <div className="movie-popup__content">
                <button onClick={onClose} className="movie-popup__close" tabIndex="0" aria-label="Close movie details">✖</button> {/* Close button */}
                <h2>{movie.title}</h2>
                <img src={movie.poster_url} alt={movie.title} className="movie-popup__image" />
                <p>Genre: {movie.genre}</p>
                <p>Release Year: {movie.release_year}</p>
                <p>Description: {movie.description}</p> {/* Add additional details */}
            </div>
        </div>
    );
}

export default MoviePopup;
