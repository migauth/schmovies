// CharactersQuestion.js
import React from 'react';
import './styles/PopcornRadio.scss';

const CharactersQuestion = ({ question, onChange }) => {
  return (
    <div>
      <p>Choose some character preferences: </p>
      <input
        type="radio"
        id={`optionA`}
        name={`question`}
        value="Strong, heroic figures"
        checked={question.selectedAnswer === "Strong, heroic figures"}
        onChange={() => onChange("Strong, heroic figures")}
      />
      <label htmlFor={`optionA`} className="popcorn-radio-label"> <div className="popcorn-kernel"></div>
      Strong, heroic figures</label><br />
      <input
        type="radio"
        id={`optionB`}
        name={`question`}
        value="Complex, emotionally-driven characters"
        checked={question.selectedAnswer === "Complex, emotionally-driven characters"}
        onChange={() => onChange("Complex, emotionally-driven characters")}
      />
      <label htmlFor={`optionB`} className="popcorn-radio-label"> <div className="popcorn-kernel"></div>Complex, emotionally-driven characters</label><br />
      <input
        type="radio"
        id={`optionC`}
        name={`question`}
        value="Quirky and funny personalities"
        checked={question.selectedAnswer === "Quirky and funny personalities"}
        onChange={() => onChange("Quirky and funny personalities")}
      />
      <label htmlFor={`optionC`} className="popcorn-radio-label"> <div className="popcorn-kernel"></div>Quirky and funny personalities</label><br />
      <input
        type="radio"
        id={`optionD`}
        name={`question`}
        value="Intellectual and imaginative individuals"
        checked={question.selectedAnswer === "Intellectual and imaginative individuals"}
        onChange={() => onChange("Intellectual and imaginative individuals")}
      />
      <label htmlFor={`optionD`} className="popcorn-radio-label"> <div className="popcorn-kernel"></div>Intellectual and imaginative individuals</label><br />
      <input
        type="radio"
        id={`optionE`}
        name={`question`}
        value="Underdog or survivor types"
        checked={question.selectedAnswer === "Underdog or survivor types"}
        onChange={() => onChange("Underdog or survivor types")}
      />
      <label htmlFor={`optionE`} className="popcorn-radio-label"> <div className="popcorn-kernel"></div>Underdog or survivor types</label><br />
    </div>
  );
};

export default CharactersQuestion;
