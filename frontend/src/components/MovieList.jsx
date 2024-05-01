import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './MovieList.css'; // Import your CSS file for movie list

function MovieList() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        async function fetchMovies() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/movies/');
                setMovies(response.data);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        }
        fetchMovies();
    }, []);

    return (
        <div>
            <h1>Movie Suggestions</h1>
            <div className="movie-list">
                {movies.map(movie => (
                    <div key={movie.id} className='movie-list__item'>
                        <img src={movie.poster_url} alt={movie.title} />
                        <div className="movie-details">
                            <h2>{movie.title}</h2>
                            {/* <p>{movie.description}</p> */}
                            <p>Genre: {movie.genre}</p>
                            <p>Release Year: {movie.release_year}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MovieList;
