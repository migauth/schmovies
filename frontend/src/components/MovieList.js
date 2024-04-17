import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
            <ul>
                {movies.map(movie => (
                    <li key={movie.id}>
                        <h2>{movie.title}</h2>
                        <p>{movie.description}</p>
                        <p>Genre: {movie.genre}</p>
                        <p>Release Year: {movie.release_year}</p>
                        <img src={movie.poster_url} alt={movie.title} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MovieList;
