import React from "react";

const MovieItem = ({ movie, handleMovieClick, addToFavourites }) => {
  // Define the maximum length for the title before shrinking the font
  const maxLengthBeforeShrink = 30;

  // Conditionally apply a class based on the length of the title
  const titleClass = movie.title.length > maxLengthBeforeShrink ? "shrink" : "";

  // Split genres string into an array and get the first three genres
  const genres = movie.genre.split(",").slice(0, 3).join(", ");

  return (
    <div className="movie-list__item" onClick={() => handleMovieClick(movie)}>
      <img src={movie.poster_url} alt={movie.title} />
      <h2 className={`movie-title ${titleClass}`}>{movie.title}</h2>
      <div className="movie-details">
        <p>Genre: {genres}</p>
        <p>Release Year: {movie.release_year}</p>
        <button
          className="favourites_btn"
          onClick={() => addToFavourites(movie)}
        >
          ❤️
        </button>
      </div>
    </div>
  );
};

export default MovieItem;
