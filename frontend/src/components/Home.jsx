import React from "react";
import MovieList from "./MovieList";

// eslint-disable-next-line no-unused-vars
function Home({
  handlePageChange,
  setFavouriteMovies,
  favouriteMovies,
  handleMovieClick,
  selectedMovie,
  setSelectedMovie,
  closePopup,
  addToFavourites,
  removeFromFavourites,
  currentUser,
  handleFavouritesClick
}) {

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
        <MovieList
          setFavouriteMovies={setFavouriteMovies}
          handleMovieClick={handleMovieClick}
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
          closePopup={closePopup}
          favouriteMovies={favouriteMovies}
          addToFavourites={addToFavourites}
          removeFromFavourites={removeFromFavourites}
          currentUser={currentUser}
          handleFavouritesClick={handleFavouritesClick}
        />
      </div>
    </>
  );
}

export default Home;
