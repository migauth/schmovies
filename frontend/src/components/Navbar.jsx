// Navbar.js
import React from "react";
import '../styles/Navbar.scss';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar_links">
        <button className="navbar_about-btn">About</button>
        <button className="navbar_login-btn">Login</button>
      </div>
    </nav>
  );
}

export default Navbar;

