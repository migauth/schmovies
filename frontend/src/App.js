import React from 'react';
import './App.css';
import MovieList from './components/MovieList';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Schmovies</h1>
            </header>
            <main>
                <MovieList />
            </main>
        </div>
    );
}

export default App;
