import React, { useState, useEffect } from "react";
import "./App.scss";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Login from "./components/Login";
import Quiz from "./components/Quiz";

function App() {
  const [currentPage, setCurrentPage] = useState("home"); // State to control which page to display
  const [showContent, setShowContent] = useState(false); // State to control whether to show the content

  const handlePageChange = (page) => {
    setCurrentPage(page); // Set currentPage to the selected page
  };

  const pages = {
    about: <About />,
    home: <Home handlePageChange={handlePageChange} />,
    login: <Login />,
    quiz: <Quiz />,
  };

  useEffect(() => {
    // Trigger the content fade-in after a brief delay
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 700); // Adjust the delay as needed

    // Clear the timeout on component unmount to avoid memory leaks
    return () => clearTimeout(timer);
  }, []);

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
