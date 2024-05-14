import React from 'react';
import './QuizResultPopup.scss';

function QuizResultPopup({ movie, onClose }) { // Receive movie data
    // Base URL for TMDb API images
    const baseUrl = "https://image.tmdb.org/t/p/w500/";
    
    return (
        <div className="movie-quiz-result">
            <div className="movie-result__content">
                <button onClick={onClose} className="movie-result__close" tabIndex="0" aria-label="Close movie details">✖</button>
                <h2>{movie.title}</h2>
                <img src={`${baseUrl}${movie.poster_path}`} alt={movie.title} className="movie-result__image" />
                {/* <p>Genre: {movie.genre}</p> */}
                {/* <p>Release Year: {movie.release_year}</p> */}
                <p>Description: {movie.overview}</p>
            </div>
        </div>
    );
}

export default QuizResultPopup;