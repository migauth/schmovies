// Navbar.js
import React from "react";
import "../styles/About.scss";

function About() {
  return (
    <div className="about-info">
      <p>
        Welcome to our movie app — the final project for our course in
        Lighthouse Labs. Built using the TMDB API, this app lets users browse
        new releases, popular titles, and timeless classics. It features a
        clean, intuitive interface for easy navigation, a fun quiz that
        generates personalized movie recommendations using AI, and a login
        system to save your favorite films. Whether you're into thrillers,
        comedies, or dramas, our app helps you find the perfect movie for your
        next watch!
      </p>
      <p>
        Visit the github repo at:{" "}
        <span>
          <a href="https://github.com/migauth/schmovies">
            https://github.com/migauth/schmovies
          </a>
        </span>
      </p>
    </div>
  );
}

export default About;
