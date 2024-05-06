import React, { useState } from "react";
import "./App.scss";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Login from "./components/Login";

function App() {
  const [currentPage, setCurrentPage] = useState("home"); // State to control which page to display

  const pages = {
    about: <About />,
    home: <Home />,
    login: <Login />,
  };

  const handlePageChange = (page) => {
    setCurrentPage(page); // Set currentPage to the selected page
  };

  return (
    <div className="App">
      <Navbar handlePageChange={handlePageChange} />
      {pages[currentPage]}
    </div>
  );
}

export default App;
