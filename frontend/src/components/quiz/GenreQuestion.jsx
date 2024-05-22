// GenreQuestion.js
import React from 'react';
import './styles/PopcornRadio.scss';

const GenreQuestion = ({ question, onChange }) => {
  return (
    <div>
      <p>Choose a genre:</p>
      <input
        type="radio"
        id={`optionA`}
        name={`question`}
        value="Action, Adventure"
        checked={question.selectedAnswer === "Action, Adventure"}
        onChange={() => onChange("Action, Adventure")}
      />
      <label htmlFor={`optionA`} className="popcorn-radio-label">
        <div className="popcorn-kernel"></div>
        Action/Adventure
      </label><br />
      <input
        type="radio"
        id={`optionB`}
        name={`question`}
        value="Romance, Drama"
        checked={question.selectedAnswer === "Romance, Drama"}
        onChange={() => onChange("Romance, Drama")}
      />
      <label htmlFor={`optionB`} className="popcorn-radio-label">
        <div className="popcorn-kernel"></div>
        Romance/Drama
      </label><br />
      <input
        type="radio"
        id={`optionC`}
        name={`question`}
        value="Comedy"
        checked={question.selectedAnswer === "Comedy"}
        onChange={() => onChange("Comedy")}
      />
      <label htmlFor={`optionC`} className="popcorn-radio-label">
        <div className="popcorn-kernel"></div>
        Comedy
      </label><br />
      <input
        type="radio"
        id={`optionD`}
        name={`question`}
        value="Sci-fi, Fantasy"
        checked={question.selectedAnswer === "Sci-fi, Fantasy"}
        onChange={() => onChange("Sci-fi, Fantasy")}
      />
      <label htmlFor={`optionD`} className="popcorn-radio-label">
        <div className="popcorn-kernel"></div>
        Sci-fi/Fantasy
      </label><br />
      <input
        type="radio"
        id={`optionE`}
        name={`question`}
        value="Horror, Thriller"
        checked={question.selectedAnswer === "Horror, Thriller"}
        onChange={() => onChange("Horror, Thriller")}
      />
      <label htmlFor={`optionE`} className="popcorn-radio-label">
        <div className="popcorn-kernel"></div>
        Horror/Thriller
      </label><br />
    </div>
  );
};

export default GenreQuestion;
