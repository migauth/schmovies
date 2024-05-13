// Question.js
import React from 'react';

const QuizQuestionChoice = ({ question, options, selectedAnswer, onChange }) => (
  <div>
    <p>{question}</p>
    <div>
      {options.map((option, index) => (
        <React.Fragment key={index}>
          <input
            type="radio"
            id={`option-${index}`}
            name={`question-${index}`}
            value={option}
            checked={selectedAnswer === option}
            onChange={() => onChange(option)}
          />
          <label htmlFor={`option-${index}`}>{`${String.fromCharCode(65 + index)}) ${option}`}</label><br />
        </React.Fragment>
      ))}
    </div>
  </div>
);

export default QuizQuestionChoice;
