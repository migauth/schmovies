import React from "react";
import MovieItem from "./MovieItem";

const NewReleases = ({
  movies,
  handleMovieClick,
  addToFavourites,
  removeFromFavourites,
  favouriteMovies,
  setFavouriteMovies,
  currentUser
}) => {

  const movies2024 = movies.filter((movie) => movie.release_year === "2024");

  return (
    <div className="movie-category">
      <div className="movie-category-title">
        <h2>New Releases</h2>
      </div>
      <div className="movie-list-container">
        {movies2024.map((movie) => (
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

export default NewReleases;
