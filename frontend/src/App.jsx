import React from 'react';
import './App.css';
import MovieList from './components/MovieList';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img className='logo' src="/schmovies.png" alt="schmovies-logo" />
            </header>
            <main>
                <MovieList />
            </main>
        </div>
    );
}

export default App;
