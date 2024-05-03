import React from "react";
import '../styles/Navbar.css';

// not sure where the about button will navigate to yet
function Navbar() {
  return (
    <nav className="navbar">
      <header className="App-header">
        <img className='logo' src="/schmovies.png" alt="schmovies-logo" />
      </header>
      <div className="navbar_links">
        <button className="navbar_about-btn">About</button>
        <button className="navbar_login-btn">Login</button>
      </div>
    </nav>
  );
}

export default Navbar;