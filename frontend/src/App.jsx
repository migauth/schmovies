import React, { useState } from "react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Login from "./components/Login";
import Quiz from "./components/quiz/Quiz";
import Register from "./components/Register";
import useContentFadeIn from "./hooks/useContentFadeIn";
import Favourites from "./components/Favourites";
import "./App.scss";

function App() {
  const [currentPage, setCurrentPage] = useState("home"); // State to control which page to display
  const [currentUser, setCurrentUser] = useState(null);
  const [favouriteMovies, setFavouriteMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const showContent = useContentFadeIn(); // Custom hook for fade in...


  const handlePageChange = (page) => {
    setCurrentPage(page); // Set currentPage to the selected page
  };

  const handleMovieClick = (movie) => {
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

  const addToFavourites = (movie) => {
    console.log("Attempting to add to favourites:", movie.title);
    setFavouriteMovies((prevFavourites) => {
      if (!prevFavourites.some((favMovie) => favMovie.id === movie.id)) {
        const updatedFavourites = [...prevFavourites, movie];
        console.log("Updated favourites list:", updatedFavourites);
        return updatedFavourites;
      }
      return prevFavourites;
    });
  };

  const removeFromFavourites = (movieToRemove) => {
    console.log("Attempting to remove from favourites:", movieToRemove.title);
    setFavouriteMovies((prevFavourites) => {
      const updatedFavourites = prevFavourites.filter(
        (movie) => movie.id !== movieToRemove.id
      );
      console.log("Updated favourites list after removal:", updatedFavourites);
      return updatedFavourites;
    });
  };



  const pages = {
    about: <About />,
    home: (
      <Home
        handlePageChange={handlePageChange}
        setFavouriteMovies={setFavouriteMovies}
        favouriteMovies={favouriteMovies}
        handleMovieClick={handleMovieClick}
        setSelectedMovie={setSelectedMovie}
        selectedMovie={selectedMovie}
        closePopup={closePopup}
        addToFavourites={addToFavourites}
        removeFromFavourites={removeFromFavourites}
        currentUser={currentUser}
      />
    ),
    login: <Login onLoginSuccess={handleLogin} />,
    register: <Register />,
    quiz: <Quiz
      currentUser={currentUser}
      addToFavourites={addToFavourites}
    />,
    favourites: (
      <Favourites
        favouriteMovies={favouriteMovies}
        selectedMovie={selectedMovie}
        handleMovieClick={handleMovieClick}
        closePopup={closePopup}
        removeFromFavourites={removeFromFavourites}
        currentUser={currentUser}
      />
    ),
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
