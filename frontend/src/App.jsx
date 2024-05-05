import React from "react";
import "./App.css";
import MovieList from "./components/MovieList";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <MovieList />
      </main>
    </div>
  );
}

export default App;
