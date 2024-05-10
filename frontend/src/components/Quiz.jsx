import React, { useState } from 'react';
import axios from 'axios';
import QuizResultPopup from './QuizResultPopup';
import '../styles/Quiz.scss';

const Quiz = () => {
  // Define state to store user's answer and keywords
  const [answer, setAnswer] = useState('');
  const [keywords, setKeywords] = useState('');
  const [results, setResults] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Function to handle user's answer input
  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
  };


  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("User genre here:", answer);
    console.log("User keywords here:", keywords);
    try {
        const response = await axios.post('http://127.0.0.1:8000/quiz/submit-quiz/', { searchText: answer, keywords: keywords });
        console.log('Movie recommendations:', response.data.recommendations);
        setResults(response.data.recommendations); // updates results state
        setIsPopupOpen(true); // Open the popup
    } catch (error) {
        console.error('Error:', error);
    }
};

  // Function to handle keywords input
  const handleKeywordsChange = (event) => {
    setKeywords(event.target.value);
  };

  const closePopup = () => {
    setIsPopupOpen(false); // Close the popup
  };

  // conditionally render QuizResult with the first result
  return (
    <div className='quiz-container'>
      <h2>Quiz</h2>
      <form onSubmit={handleSubmit}>
     
        <div>
          {/* Add input for keywords */}
          <label htmlFor="keywords">Enter keywords:</label>
             <textarea
            id="keywords"
            value={keywords}
            onChange={handleKeywordsChange}
            required
            rows={4}
            cols={50}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {isPopupOpen && results.length > 0 && <QuizResultPopup movie={results[0]} onClose={closePopup} />}
    </div>
  );
};

export default Quiz;
