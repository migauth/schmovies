import React, { useState, useEffect } from "react";
import axios from "axios";
import MoviePopup from "./MoviePopup";
import PopularMovies from "./PopularMovies";
import NewReleases from "./NewReleases";
import { getApiBaseUrl } from '../utils/apiConfig';
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
        const apiBaseUrl = getApiBaseUrl();
        console.log(`Attempting to fetch movies from primary API URL: ${apiBaseUrl}/api/movies/movies/`);
        
        try {
          // First try the regular API endpoint
          const response = await axios.get(`${apiBaseUrl}/api/movies/movies/`, {
            timeout: 5000 // 5 second timeout
          });
          
          console.log(`Received ${response.data.length} movies from primary API`);
          setMovies(response.data);
          
          // Debug first few movies if available
          if (response.data.length > 0) {
            console.log("Sample movies from primary API:", response.data.slice(0, 3));
          }
          return; // Exit if successful
        } catch (primaryError) {
          console.warn("Primary API failed, trying fallback endpoint:", primaryError);
          
          // If the primary endpoint fails, try the direct JSON endpoint
          const fallbackResponse = await axios.get(`${apiBaseUrl}/movies.json`, {
            timeout: 5000 // 5 second timeout
          });
          
          console.log(`Received ${fallbackResponse.data.length} movies from fallback API`);
          setMovies(fallbackResponse.data);
          
          // Debug first few movies if available
          if (fallbackResponse.data.length > 0) {
            console.log("Sample movies from fallback API:", fallbackResponse.data.slice(0, 3));
          }
          return; // Exit if successful
        }
      } catch (error) {
        console.error("Error fetching movies from all endpoints:", error);
        console.error("Error details:", error.response || "No response data");
        
        // Try to fetch debug info
        try {
          const apiBaseUrl = getApiBaseUrl();
          const debugResponse = await axios.get(`${apiBaseUrl}/debug/`, {
            timeout: 3000
          });
          console.log("Backend debug info:", debugResponse.data);
        } catch (debugError) {
          console.error("Failed to fetch debug info:", debugError);
        }
        
        // Use fallback hardcoded movie data as last resort
        console.log("Using hardcoded fallback movie data");
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
