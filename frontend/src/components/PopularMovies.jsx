import React from "react";
import MovieItem from "./MovieItem";

const PopularMovies = ({ movies, handleMovieClick, addToFavourites }) => {
  return (
    <div className="movie-category">
      <div className="movie-category-title">
        <h2>Popular Movies</h2>
      </div>
      <div className="movie-list-container">
        {movies.map((movie) => (
          <MovieItem
            key={movie.id}
            movie={movie}
            handleMovieClick={handleMovieClick}
            addToFavourites={addToFavourites}
          />
        ))}
      </div>
    </div>
  );
};

export default PopularMovies;
