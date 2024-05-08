import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Quiz.scss';

const Quiz = () => {
  // Define state to store user's answer
  const [answer, setAnswer] = useState('');

  // Function to handle user's answer input
  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("User answer here:", answer);
    try {
        const response = await axios.post('http://127.0.0.1:8000/quiz/submit-quiz/', { searchText: answer });
        console.log('Movie recommendations:', response.data.recommendations);
        // Update state or perform further actions with recommendations
    } catch (error) {
        console.error('Error:', error);
    }
};

  return (
    <div className='quiz-container'>
      <h2>Quiz</h2>
      <form onSubmit={handleSubmit}>
        <div>
          {/* Update the question label */}
          <label htmlFor="answer">Enter your preference for a movie genre:</label>
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
