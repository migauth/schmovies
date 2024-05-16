import React from "react";
import MovieList from "./MovieList";

function Home({ handlePageChange, setFavouriteMovies, favouriteMovies, handleMovieClick, selectedMovie, setSelectedMovie, closePopup }) {

  const handleClick = () => {
    handlePageChange("quiz");
  };
  
  return (
    <>
      <div className="heading-container">
        <button className="quiz-btn" onClick={handleClick}>
          Take a quiz to find a movie to watch!
        </button>
      </div>
      <div className="home">
        <MovieList setFavouriteMovies={setFavouriteMovies} handleMovieClick={handleMovieClick} selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} closePopup={closePopup} favouriteMovies={favouriteMovies} />
        console.log("Before passing to MovieList:", favouriteMovies);
      </div>
      <small>©</small>
    </>
  );
}

export default Home;
