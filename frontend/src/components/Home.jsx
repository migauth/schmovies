import React from "react";
import MovieList from "./MovieList";

function Home({ handlePageChange }) {

  const handleClick = () => {
    handlePageChange("quiz");
  };
  
  return (
    <>
      <div className="heading-container">
        <button className="quiz-btn" onClick={handleClick}>
          Take a quiz to find a movie to watch!
        </button>
      </div>
      <div className="home">
        <MovieList />
      </div>
      <small>©</small>
    </>
  );
}

export default Home;
