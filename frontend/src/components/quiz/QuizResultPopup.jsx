import React from 'react';
import './QuizResultPopup.scss';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function QuizResultPopup({
  movie,
  handleRestartQuiz,
  closePopup,
  onNext,
  addToFavourites,
  favouriteMovies = [],
  removeFromFavourites,
  currentUser,
}) {
  // Receive movie data and onNext function
  // Base URL for TMDb API images
  const baseUrl = "https://image.tmdb.org/t/p/w500/";

  const isFavourite = favouriteMovies.some(favMovie => favMovie.id === movie.id);

  const handleFavouritesClick = (event) => {
    event.stopPropagation(); // Prevents the click event from bubbling up to parent elements

    if (isFavourite) {
      removeFromFavourites(movie);
    } else {
      addToFavourites(movie);
    }
  };

  return (
    <>
      <div className="backdrop" onClick={closePopup}></div>
      <div className="movie-quiz-result">
        <div className="movie-result__content">
          <button
            onClick={closePopup}
            className="movie-result__close"
            tabIndex="0"
            aria-label="Close movie details"
          >
            ✖
          </button>
          <h2>{movie.title}</h2>
          <img
            src={`${baseUrl}${movie.poster_path}`}
            alt={movie.title}
            className="movie-result__image"
          />
          {/* <p>Genre: {movie.genre}</p> */}
          {/* <p>Release Year: {movie.release_year}</p> */}
          <p>Description: {movie.overview}</p>
          <div className='quizPopupButtons'>
            {currentUser && (
              <button
                className="quiz-results_favourites_btn"
                style={{ backgroundColor: isFavourite ? "red" : "yellow" }}
                onClick={handleFavouritesClick}
              >
                <FontAwesomeIcon icon={isFavourite ? faSolidHeart : faRegularHeart} />
              </button>
            )}
            <button onClick={handleRestartQuiz} className="quiz-again-button">
              Take the quiz again
            </button>
            <button
              onClick={onNext}
              className="next-arrow"
              aria-label="Next movie"
            >
              Next movie suggestion →
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default QuizResultPopup;
