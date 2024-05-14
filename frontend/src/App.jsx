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
  const showContent = useContentFadeIn(); // Using the custom hook

  const handlePageChange = (page) => {
  setCurrentPage(page); // Set currentPage to the selected page
};

  const pages = {
    about: <About />,
    home: <Home handlePageChange={handlePageChange} />,
    login: <Login />,
    register: <Register />,
    quiz: <Quiz />,
    favourites: <Favourites />,
  };

  return (
    <div className="App">
      <Navbar handlePageChange={handlePageChange} />
      <div className={`content ${showContent ? "fade-in" : ""}`}>
        {pages[currentPage]}
      </div>
    </div>
  );
}

export default App;
