import React from 'react';
// import scss

const Favourites = ({ favouriteMovies }) => {
    return (
      <div>
        <h2>Favourites</h2>
        {favouriteMovies.map(movie => (
          <div key={movie.id}>
            <h3>{movie.title}</h3>
            <img src={movie.poster_url} alt={movie.title} className="movie-popup__image" />
            <p>Genre: {movie.genre}</p>
            <p>Release Year: {movie.release_year}</p>
          </div>
        ))}
      </div>
    );
  };

export default Favourites;