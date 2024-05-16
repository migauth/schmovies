import React, { useState, useEffect } from "react";
import "./App.scss";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Login from "./components/Login";
import Quiz from "./components/quiz/Quiz";
import Register from "./components/Register";
import useContentFadeIn from "./hooks/useContentFadeIn";
import Favourites from "./components/Favourites";

function App() {
  const [currentPage, setCurrentPage] = useState("home"); // State to control which page to display
  const [currentUser, setCurrentUser] = useState(null);
  const [favouriteMovies, setFavouriteMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);


  const showContent = useContentFadeIn(); // Using the custom hook

  const handlePageChange = (page) => {
  setCurrentPage(page); // Set currentPage to the selected page
};

const handleMovieClick = (movie) => {
  // need to add if statement? - if click event is on the favourites button do not open
  setSelectedMovie(movie);
};

const closePopup = () => {
  setSelectedMovie(null);
};

const handleLogin = (user) => {
  setCurrentUser(user);
  setCurrentPage("home");
};

const handleLogout = () => {
  setCurrentUser(null);
};

  const pages = {
    about: <About />,
    home: <Home handlePageChange={handlePageChange} setFavouriteMovies={setFavouriteMovies} favouriteMovies={favouriteMovies} handleMovieClick={handleMovieClick} setSelectedMovie={setSelectedMovie} selectedMovie={selectedMovie} closePopup={closePopup}/>,
    login: <Login onLoginSuccess={handleLogin} />,
    register: <Register />,
    quiz: <Quiz />,
    favourites: <Favourites favouriteMovies={favouriteMovies} selectedMovie={selectedMovie} handleMovieClick={handleMovieClick} closePopup={closePopup}/>,
  };

  return (
    <div className="App">
      <Navbar
        handlePageChange={handlePageChange}
        currentUser={currentUser}
        handleLogout={handleLogout}
      />
      <div className={`content ${showContent ? "fade-in" : ""}`}>
        {pages[currentPage]}
      </div>
    </div>
  );
}

export default App;
