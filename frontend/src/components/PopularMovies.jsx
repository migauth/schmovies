import React from "react";
import MovieItem from "./MovieItem";

const PopularMovies = ({  
  movies,
  handleMovieClick,
  addToFavourites,
  removeFromFavourites,
  favouriteMovies,
  setFavouriteMovies,
  currentUser }) => {

  // const popularMovies = movies.filter((movie) => movie.popularity >= "400");

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
            removeFromFavourites={removeFromFavourites}
            favouriteMovies={favouriteMovies}
            setFavouriteMovies={setFavouriteMovies}
            currentUser={currentUser}
          />
        ))}
      </div>
    </div>
  );
};

export default PopularMovies;
