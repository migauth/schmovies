import React from "react";

const MovieItem = ({ movie, addToFavourites, removeFromFavourites, favouriteMovies = [], handleMovieClick }) => {
  const isFavourite = favouriteMovies.some(favMovie => favMovie.id === movie.id);

  const handleFavouritesClick = () => {
    if (isFavourite) {
      console.log("Removing from favourites:", movie.title);
      removeFromFavourites(movie);
    } else {
      console.log("Adding to favourites:", movie.title);
      addToFavourites(movie);
    }
  };

  return (
    <div className="movie-list__item" onClick={() => handleMovieClick(movie)}>
      <img src={movie.poster_url} alt={movie.title} />
      <h2 className="movie-title">{movie.title}</h2>
      <div className="movie-details">
        <p>Genre: {movie.genre}</p>
        <p>Release Year: {movie.release_year}</p>
        <button
          className="favourites_btn"
          style={{ backgroundColor: isFavourite ? "red" : "yellow" }}
          onClick={handleFavouritesClick}
        >
          ❤️
        </button>
      </div>
    </div>
  );
};

export default MovieItem;
