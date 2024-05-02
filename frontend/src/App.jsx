import React from 'react';
import './App.css';
import MovieList from './components/MovieList';
import Navbar from './components/Navbar';

function App() {
    return (
        <div className="App">
            
            <main>
                <Navbar />
                <MovieList />
            </main>
        </div>
    );
}

export default App;
