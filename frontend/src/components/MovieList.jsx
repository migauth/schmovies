import React, { useState, useEffect } from "react";
import axios from "axios";
import MoviePopup from "./MoviePopup";
import PopularMovies from "./PopularMovies";
import "../styles/MovieList.scss";
import NewReleases from "./NewReleases";

const MovieList = ({ setFavouriteMovies, favouriteMovies }) => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/movies/movies/"
        );
        setMovies(response.data);
        console.log("Fetched movies:", response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }
    fetchMovies();
  }, []);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const closePopup = () => {
    setSelectedMovie(null);
  };

  const addToFavourites = (movie) => {
    setFavouriteMovies((prevFavourites) =>
      prevFavourites.includes(movie)
        ? prevFavourites.filter((m) => m !== movie)
        : [...prevFavourites, movie]
    );
  };

  return (
    <div className="movie-list">
      {/* New Releases */}
      <NewReleases
        movies={movies}
        handleMovieClick={handleMovieClick}
        addToFavourites={addToFavourites}
      />

      {/* Popular Movies */}
      <PopularMovies
        movies={movies}
        handleMovieClick={handleMovieClick}
        addToFavourites={addToFavourites}
      />

      {/* Render the backdrop and the pop-up if a movie is selected */}
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
