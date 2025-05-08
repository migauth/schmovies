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
        const apiBaseUrl = getApiBaseUrl();
        const moviesEndpoint = `${apiBaseUrl}/api/movies/movies/`;
        
        console.log(`Attempting to fetch movies from API: ${moviesEndpoint}`);
        
        try {
          // Try to fetch using our improved proxy utility
          const apiData = await fetchWithProxy(moviesEndpoint);
          
          if (apiData && Array.isArray(apiData) && apiData.length > 0) {
            console.log(`Successfully fetched ${apiData.length} movies from API`);
            setMovies(apiData);
            
            // Log a sample of fetched movies
            if (apiData.length > 0) {
              console.log('Sample API movies:', apiData.slice(0, 3));
            }
            return;
          } else {
            console.warn('API returned empty or invalid data');
            throw new Error('Invalid API response');
          }
        } catch (apiError) {
          console.error('Failed to fetch from API:', apiError);
          
          // Try direct JSON endpoint as a fallback
          try {
            console.log(`Trying fallback endpoint: ${apiBaseUrl}/movies.json`);
            const fallbackApiData = await fetchWithProxy(`${apiBaseUrl}/movies.json`);
            
            if (fallbackApiData && Array.isArray(fallbackApiData) && fallbackApiData.length > 0) {
              console.log(`Successfully fetched ${fallbackApiData.length} movies from fallback endpoint`);
              setMovies(fallbackApiData);
              return;
            } else {
              console.warn('Fallback endpoint returned empty or invalid data');
              throw new Error('Invalid fallback response');
            }
          } catch (fallbackError) {
            console.error('Fallback endpoint also failed:', fallbackError);
            throw fallbackError;
          }
        }
      } catch (error) {
        // If all API attempts fail, use hardcoded fallback data
        console.log("All API attempts failed, using hardcoded fallback movie data");
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
