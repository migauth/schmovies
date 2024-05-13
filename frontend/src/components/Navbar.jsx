import React, { useEffect, useState } from "react";
import "../styles/Navbar.scss";

function Navbar({ handlePageChange }) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Trigger animation after a brief delay
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 700); // Adjust the delay as needed

    // Clear timeout on component unmount to avoid memory leaks
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <nav className={`navbar ${showContent ? "fade-in" : ""}`}>
        <div className={`navbar_links ${showContent ? "fade-in" : ""}`}>
          <button
            className="navbar_about-btn"
            onClick={() => handlePageChange("about")}
          >
            About
          </button>
          <button
            className="navbar_login-btn"
            onClick={() => handlePageChange("login")}
          >
            Login
          </button>
          <button
            className="navbar_register-btn"
            onClick={() => handlePageChange("register")}
          >
            Register
          </button>
        </div>
      </nav>
      <div className={`logo-container ${showContent ? "fade-in" : ""}`}>
        <img
          onClick={() => handlePageChange("home")}
          className={`logo ${showContent ? "fade-in" : ""}`}
          src="/schmovies.png"
          alt="schmovies-logo"
        />
      </div>
    </>
  );
}


export default Navbar;
