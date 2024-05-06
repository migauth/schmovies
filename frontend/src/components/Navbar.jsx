// Navbar.js
import React from "react";
import "../styles/Navbar.scss";

function Navbar({ handlePageChange }) {
  return (
    <>
      <nav className="navbar">
        <div className="navbar_links">
          <button
            className="navbar_about-btn"
            onClick={() => handlePageChange("about")}
          >
            About
          </button>
          <button className="navbar_login-btn">Login</button>
        </div>
      </nav>
      <div className="logo-container">
        <img onClick={() => handlePageChange("home")} className="logo" src="/schmovies.png" alt="schmovies-logo" />
      </div>
    </>
  );
}

export default Navbar;
