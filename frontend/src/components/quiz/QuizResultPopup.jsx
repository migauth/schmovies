import React from 'react';
import './styles/QuizResultPopup.scss';

function QuizResultPopup({
  movie,
  handleRestartQuiz,
  closePopup,
  onNext,
  favouriteMovies = [],
}) {
  // Receive movie data and onNext function
  // Base URL for TMDb API images
  const baseUrl = "https://image.tmdb.org/t/p/w500/";

  // console.log(movie);

  // Fallback image path
  const fallbackImage = "/images/reelAndHeartIcon2.png";

  // Fallback description
  const fallbackDescription = "No description available";

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
            src={movie.poster_path ? `${baseUrl}${movie.poster_path}` : fallbackImage}
            alt={movie.title}
            className="movie-result__image"
          />
          <p>Release Year: {movie.release_date.slice(0,4)}</p>
          <p>Description: {movie.overview ? movie.overview : fallbackDescription}</p>
          <div className="quizPopupButtons">
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
