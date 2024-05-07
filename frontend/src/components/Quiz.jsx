import React, { useState } from 'react';
import '../styles/Quiz.scss'

const Quiz = () => {
  // Define state to store user's answer
  const [answer, setAnswer] = useState('');

  // Function to handle user's answer input
  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can handle the submission of the answer,
    // for example, you can send it to the backend for evaluation
    console.log('Submitted answer:', answer);
    // You can also reset the answer state here if needed
    setAnswer('');
  };

  return (
    <div className='quiz-container'>
      <h2>Quiz</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="answer">Question: </label>
          <textarea
            id="answer"
            value={answer}
            onChange={handleAnswerChange}
            required
            rows={4}
            cols={50}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Quiz;
