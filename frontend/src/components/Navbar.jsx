import React, { useEffect, useState } from "react";
import "../styles/Navbar.scss";

function Navbar({ handlePageChange, handleLogout, currentUser }) {
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
          {/* Heart button */}
          <button
            className="navbar_favourites-btn"
            onClick={() => handlePageChange("favourites")}
          >
            <svg width="20" height="17" viewBox="0 0 24 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill="black" d="M11 18C11 18 1 12.5909 1 6.02273C1 4.8616 1.41649 3.73633 2.17862 2.83838C2.94075 1.94043 4.00143 1.32526 5.1802 1.09755C6.35897 0.869829 7.58301 1.04363 8.64406 1.58938C9.70512 2.13512 10.5376 3.0191 11 4.09092C11.4624 3.0191 12.2949 2.13512 13.3559 1.58938C14.417 1.04363 15.641 0.869829 16.8198 1.09755C17.9986 1.32526 19.0593 1.94043 19.8214 2.83838C20.5835 3.73633 21 4.8616 21 6.02273C21 12.5909 11 18 11 18Z" stroke="#C80000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            className="navbar_about-btn"
            onClick={() => handlePageChange("about")}
          >
            About
          </button>
          {currentUser ? (
            <>
              <button
                className="navbar_logout-btn"
                onClick={() => handleLogout()}
              >
                Logout
              </button>
              <span className="navbar_user-info">
                Logged in as: {currentUser.username}
              </span>
            </>
          ) : (
            <>
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
            </>
          )}
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
