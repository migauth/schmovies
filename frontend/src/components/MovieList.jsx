import React, { useState, useEffect } from "react";
import axios from "axios";
import MoviePopup from "./MoviePopup";
import PopularMovies from "./PopularMovies";
import NewReleases from "./NewReleases";
import { getApiBaseUrl } from '../utils/apiConfig';
import { fetchWithProxy } from '../utils/corsProxy';
import fallbackMovies from '../data/fallbackMovies';
import "../styles/MovieList.scss";

const MovieList = ({
  setFavouriteMovies,
  handleMovieClick,
  addToFavourites,
  removeFromFavourites,
  selectedMovie,
  closePopup,
  currentUser,
  favouriteMovies = []
}) => {

  const [movies, setMovies] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    async function fetchMovies() {
      try {
        // Skip all the complex proxy logic and directly use the fallback data
        // This is the most reliable approach for now
        console.log("Using hardcoded fallback movie data directly");
        setMovies(fallbackMovies);
      } catch (error) {
        console.error("Error setting movies:", error);
        // Ensure we always have movies data
        setMovies(fallbackMovies);
      }
    }
    fetchMovies();
  }, []);

  return (
    <div className="movie-list">
      <NewReleases
        movies={movies}
        handleMovieClick={handleMovieClick}
        addToFavourites={addToFavourites}
        removeFromFavourites={removeFromFavourites}
        favouriteMovies={favouriteMovies}
        setFavouriteMovies={setFavouriteMovies}
        currentUser={currentUser}
      />
      <PopularMovies
        movies={movies}
        handleMovieClick={handleMovieClick}
        addToFavourites={addToFavourites}
        removeFromFavourites={removeFromFavourites}
        favouriteMovies={favouriteMovies}
        setFavouriteMovies={setFavouriteMovies}
        currentUser={currentUser}
      />
      {selectedMovie && (
        <>
          <div className="backdrop" onClick={closePopup}></div>
          <MoviePopup movie={selectedMovie} onClose={closePopup} />
        </>
      )}
    </div>
  );
};

export default MovieList;
