import React, { useState, useEffect } from "react";
import axios from "axios";
import MoviePopup from "./MoviePopup";
import PopularMovies from "./PopularMovies";
import NewReleases from "./NewReleases";
import { getApiBaseUrl } from '../utils/apiConfig';
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
        const apiBaseUrl = getApiBaseUrl();
        console.log(`Fetching movies from API URL: ${apiBaseUrl}/api/movies/movies/`);
        
        const response = await axios.get(`${apiBaseUrl}/api/movies/movies/`, {
          timeout: 10000 // 10 second timeout
        });
        
        console.log(`Received ${response.data.length} movies from API`);
        setMovies(response.data);
        
        // Debug first few movies if available
        if (response.data.length > 0) {
          console.log("Sample movies:", response.data.slice(0, 3));
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
        console.error("Error details:", error.response || "No response data");
        
        // Try to fetch debug info
        try {
          const apiBaseUrl = getApiBaseUrl();
          const debugResponse = await axios.get(`${apiBaseUrl}/debug/`);
          console.log("Backend debug info:", debugResponse.data);
        } catch (debugError) {
          console.error("Failed to fetch debug info:", debugError);
        }
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
