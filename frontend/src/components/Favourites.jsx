import React from 'react';
import "../styles/Favourites.scss";
import MoviePopup from './MoviePopup';

const Favourites = ({ favouriteMovies, selectedMovie, closePopup, handleMovieClick }) => {
    return (
        <div className="movie-category">
            <div className="movie-category-title">
                <h2>Favourites</h2>
            </div>
            <div className="movie-list-container">
                {favouriteMovies.map((movie) => (
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
                        {/* <button className="favourites_btn" onClick={() => addToFavourites(movie)}>❤️</button> */}
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
