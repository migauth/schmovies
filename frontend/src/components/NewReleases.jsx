import React from "react";
import MovieItem from "./MovieItem";

const NewReleases = ({ movies, handleMovieClick, addToFavourites, removeFromFavourites, favouriteMovies, setFavouriteMovies }) => {
  return (
    <div className="movie-category">
      <div className="movie-category-title">
        <h2>New Releases</h2>
      </div>
      <div className="movie-list-container">
        {movies.map((movie) => (
          <MovieItem
            key={movie.id}
            movie={movie}
            handleMovieClick={handleMovieClick}
            addToFavourites={addToFavourites}
            removeFromFavourites={removeFromFavourites}
            favouriteMovies={favouriteMovies}
            setFavouriteMovies={setFavouriteMovies}
          />
        ))}
      </div>
    </div>
  );
};

export default NewReleases;
