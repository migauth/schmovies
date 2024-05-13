import React, { useState, useEffect } from "react";
import axios from "axios";
import MoviePopup from "./MoviePopup";
import "../styles/MovieList.scss";

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/movies/movies/"
        );
        setMovies(response.data);
        console.log("Fetched movies:", response.data); // Log fetched movies
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

  // filter movies that have a release_year of 2024
  const movies2024 = movies.filter((movie) => movie.release_year === "2024");
  console.log("2024 movies:", movies2024);

  return (
    <div className="movie-list">
      {/* New Releases */}
      <div className="movie-category">
        <div className="movie-category-title">
          <h2>New Releases</h2>
        </div>
        <div className="movie-list-container">
          {movies2024.map((movie) => (
            <div
              key={movie.id}
              className="movie-list__item"
              onClick={() => handleMovieClick(movie)}
            >
              <img src={movie.poster_url} alt={movie.title} />
              <div className="movie-details">
                <h2>{movie.title}</h2>
                <p>Genre: {movie.genre}</p>
                <p>Release Year: {movie.release_year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Movies */}
      <div className="movie-category">
        <div className="movie-category-title">
          <h2>Popular Movies</h2>
        </div>
        <div className="movie-list-container">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="movie-list__item"
              onClick={() => handleMovieClick(movie)}
            >
              <img src={movie.poster_url} alt={movie.title} />
              <div className="movie-details">
                <h2>{movie.title}</h2>
                <p>Genre: {movie.genre}</p>
                <p>Release Year: {movie.release_year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

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
  );
}

export default MovieList;
