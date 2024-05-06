import React, { useState } from "react";
import "./App.scss";
import MovieList from "./components/MovieList";
import Navbar from "./components/Navbar";
import About from "./components/About";

function App() {
  const [currentPage, setCurrentPage] = useState("movieList"); // State to control which page to display

  const pages = {
    movieList: <MovieList />,
    about: <About />,
    home: <MovieList/>
  };

  const handlePageChange = (page) => {
    setCurrentPage(page); // Set currentPage to the selected page
  };

  return (
    <div className="App">
      <Navbar handlePageChange={handlePageChange} />
      <main>
        {pages[currentPage]} {/* Render the component based on the currentPage */}
      </main>
    </div>
  );
}

export default App;
