import React, { useState, useEffect } from "react";
import axios from "axios";
import MoviePopup from "./MoviePopup";
import PopularMovies from "./PopularMovies";
import "../styles/MovieList.scss";
import NewReleases from "./NewReleases";

const MovieList = ({ setFavouriteMovies, favouriteMovies = [] }) => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/movies/movies/");
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
    console.log("Attempting to add to favourites:", movie.title);
    setFavouriteMovies(prevFavourites => {
      if (!prevFavourites.some(favMovie => favMovie.id === movie.id)) {
        const updatedFavourites = [...prevFavourites, movie];
        console.log("Updated favourites list:", updatedFavourites);
        return updatedFavourites;
      }
      return prevFavourites;
    });
  };

  const removeFromFavourites = (movieToRemove) => {
    console.log("Attempting to remove from favourites:", movieToRemove.title);
    setFavouriteMovies(prevFavourites => {
      const updatedFavourites = prevFavourites.filter(movie => movie.id !== movieToRemove.id);
      console.log("Updated favourites list after removal:", updatedFavourites);
      return updatedFavourites;
    });
  };

  console.log("MovieList rendered with favouriteMovies:", favouriteMovies);


  return (
    <div className="movie-list">
      <NewReleases
        movies={movies}
        handleMovieClick={handleMovieClick}
        addToFavourites={addToFavourites}
        removeFromFavourites={removeFromFavourites}
        favouriteMovies={favouriteMovies}
        setFavouriteMovies={setFavouriteMovies}
      />
      <PopularMovies
        movies={movies}
        handleMovieClick={handleMovieClick}
        addToFavourites={addToFavourites}
        removeFromFavourites={removeFromFavourites}
        favouriteMovies={favouriteMovies}
        setFavouriteMovies={setFavouriteMovies}
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
