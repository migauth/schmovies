import React from 'react';
import "../styles/Favourites.scss"; // Import the SCSS file

const Favourites = ({ favouriteMovies }) => {
    return (
      <div className="favourites-container">
        <div className="heading-container">
          <h2 className="favourites-title">Favourites</h2>
        </div>
        <div className="favourites-list">
          {favouriteMovies.map(movie => (
            <div key={movie.id} className="favourites-list-item">
              <h3>{movie.title}</h3>
              <img src={movie.poster_url} alt={movie.title} className="favourites-image" />
              <p>Genre: {movie.genre}</p>
              <p>Release Year: {movie.release_year}</p>
            </div>
          ))}
        </div>
      </div>
    );
};

export default Favourites;
