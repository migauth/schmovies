import { useState } from "react";
import React from "react";
import "../styles/Favourites.scss"; // Import the SCSS file
import MoviePopup from "./MoviePopup";

const Favourites = ({
  favouriteMovies,
  selectedMovie,
  closePopup,
  handleMovieClick,
}) => {
  console.log("favouriteMovies:", favouriteMovies);
  return (
    <div className="favourites-container">
      <div className="heading-container">
        <h2 className="favourites-title">Favourites</h2>
      </div>
      <div className="favourites-list">
        {favouriteMovies.map((movie) => (
          <div
            key={movie.id}
            className="favourites-list-item"
            onClick={() => handleMovieClick(movie)}
          >
            <h3>{movie.title}</h3>
            <img
              src={movie.poster_url}
              alt={movie.title}
              className="favourites-image"
            />
            <p>Genre: {movie.genre}</p>
            <p>Release Year: {movie.release_year}</p>
          </div>
        ))}
        {/* Render the backdrop and the pop-up if a movie is selected */}
        {selectedMovie && (
          <>
            <div className="backdrop" onClick={closePopup}></div>
            <MoviePopup
              movie={selectedMovie}
              onClose={closePopup} // Pass the close function to the pop-up
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Favourites;
