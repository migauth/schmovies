import React from "react";

const MovieItem = ({ movie, handleMovieClick, addToFavourites, favouriteMovies }) => {
  return (
    <div className="movie-list__item" onClick={() => handleMovieClick(movie)}>
      <img src={movie.poster_url} alt={movie.title} />
      <h2 className="movie-title">{movie.title}</h2>
      <div className="movie-details">
        <p>Genre: {movie.genre}</p>
        <p>Release Year: {movie.release_year}</p>
        <button
          className="favourites_btn"
          style={{ backgroundColor: favouriteMovies && favouriteMovies.includes(movie)? "red" : "yellow" }}
          onClick={() => addToFavourites(movie)}
        >
          ❤️
        </button>
      </div>
    </div>
  );
};

export default MovieItem;
