import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import "../styles/Favourites.scss"; // Import the SCSS file
import MoviePopup from "./MoviePopup";

const Favourites = ({
    favouriteMovies,
    selectedMovie,
    closePopup,
    handleMovieClick,
    removeFromFavourites,
    currentUser
}) => {

    return (
      <div className="favourites-container">
        <div className="heading-container">
          <h2 className="favourites-title">Favourites</h2>
        </div>
        {!currentUser && (
            <h5>
                Please sign in to view your favourite movies!
            </h5>
        )}
        <div className="favourites-list">
          {favouriteMovies.map((movie) => (
            <div
              key={movie.id}
              className="favourites-list-item"
              onClick={() => handleMovieClick(movie)}
            >
              <img src={movie.poster_url} alt={movie.title} className="favourites-image" />
              <h3 className="favourites-item-title">{movie.title}</h3>
              <p>Genre: {movie.genre}</p>
              <p>Release Year: {movie.release_year}</p>
              <button
                className="remove-favourites_btn"
                onClick={(event) => {
                  event.stopPropagation(); // Stop the click event from propagating further
                  removeFromFavourites(movie);
                }}
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
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
