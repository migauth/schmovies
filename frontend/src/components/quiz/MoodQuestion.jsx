// MoodQuestion.js
import React from 'react';
import './PopcornRadio.scss';

const MoodQuestion = ({ question, onChange }) => {
  return (
    <div>
      <p>What mood are you in?</p>
      <input
        type="radio"
        id={`optionA`}
        name={`question`}
        value="Exciting"
        checked={question.selectedAnswer === "Exciting"}
        onChange={() => onChange("Exciting")}
      />
      <label htmlFor={`optionA`} className="popcorn-radio-label"><div className="popcorn-kernel"></div>Excited</label><br />
      <input
        type="radio"
        id={`optionB`}
        name={`question`}
        value="Romantic"
        checked={question.selectedAnswer === "Romantic"}
        onChange={() => onChange("Romantic")}
      />
      <label htmlFor={`optionB`} className="popcorn-radio-label"><div className="popcorn-kernel"></div>Romantic</label><br />
      <input
        type="radio"
        id={`optionC`}
        name={`question`}
        value="Funny"
        checked={question.selectedAnswer === "Funny"}
        onChange={() => onChange("Funny")}
      />
      <label htmlFor={`optionC`} className="popcorn-radio-label"><div className="popcorn-kernel"></div>Laughing</label><br />
      <input
        type="radio"
        id={`optionD`}
        name={`question`}
        value="Wondering"
        checked={question.selectedAnswer === "Wondering"}
        onChange={() => onChange("Wondering")}
      />
      <label htmlFor={`optionD`} className="popcorn-radio-label"><div className="popcorn-kernel"></div>Wondering</label><br />
      <input
        type="radio"
        id={`optionE`}
        name={`question`}
        value="Thrilled"
        checked={question.selectedAnswer === "Thrilled"}
        onChange={() => onChange("Thrilled")}
      />
      <label htmlFor={`optionE`} className="popcorn-radio-label"><div className="popcorn-kernel"></div>Thrilled</label><br />
    </div>
  );
};

export default MoodQuestion;

