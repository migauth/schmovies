import React, { useState } from 'react';
import axios from 'axios';
import QuizResultPopup from './QuizResultPopup';
import '../styles/Quiz.scss';

const Quiz = () => {
  // Define state to store user's answer and keywords
  // const [keywords, setKeywords] = useState('');
  const [results, setResults] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [answers, setAnswers] = useState([
    { question: "Genre Preference", selectedAnswer: "" },
    { question: "Mood", selectedAnswer: "" },
    { question: "Main Characters", selectedAnswer: "" },
    { question: "Cheese Factor", selectedAnswer: "" },

    // { question: "Preferred Ending", selectedAnswer: "" },
    // { question: "Language Preference", selectedAnswer: "" },
    // { question: "Audience", selectedAnswer: "" },
  ]);
  

  // Function to handle user's answer input
  const handleAnswerChange = (questionIndex, selectedAnswer) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex].selectedAnswer = selectedAnswer;
    setAnswers(newAnswers);
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("User answers here:", answers);
    // console.log("User keywords here:", keywords);
    try {
        const response = await axios.post('http://127.0.0.1:8000/quiz/submit-quiz/', { answers: answers });
        console.log('Movie recommendations:', response.data.recommendations);
        setResults(response.data.recommendations); // updates results state
        setIsPopupOpen(true); // Open the popup
    } catch (error) {
        console.error('Error:', error);
    }
};

  // // Function to handle keywords input
  // const handleKeywordsChange = (event) => {
  //   setKeywords(event.target.value);
  // };

  const closePopup = () => {
    setIsPopupOpen(false); // Close the popup
  };

  // conditionally render QuizResult with the first result
  return (
    <div className='quiz-container'>
      <h2>Quiz</h2>
      <form onSubmit={handleSubmit}>
  
        <div className='quiz-questions'>
          {answers.map((answer, index) => (
            <div key={index}>
              <p>{answer.question}</p>
              {answer.question === "Cheese Factor" ? (
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={answer.selectedAnswer}
                  onChange={(e) => handleAnswerChange(index, parseInt(e.target.value))}
                />
              ) : (

              <div>
              {answer.question === "Genre Preference" && (
            <>
                <input
                  type="radio"
                  id={`optionA-${index}`}
                  name={`question-${index}`}
                  value="Action, Adventure"
                  checked={answer.selectedAnswer === "Action, Adventure"}
                  onChange={() => handleAnswerChange(index, "Action, Adventure")}
                />
                <label htmlFor={`optionA-${index}`}>A) Action/Adventure</label><br />
                <input
                  type="radio"
                  id={`optionB-${index}`}
                  name={`question-${index}`}
                  value="Romance, Drama"
                  checked={answer.selectedAnswer === "Romance, Drama"}
                  onChange={() => handleAnswerChange(index, "Romance, Drama")}
                />
                <label htmlFor={`optionB-${index}`}>B) Romance/Drama</label><br />
                <input
                  type="radio"
                  id={`optionC-${index}`}
                  name={`question-${index}`}
                  value="Comedy"
                  checked={answer.selectedAnswer === "Comedy"}
                  onChange={() => handleAnswerChange(index, "Comedy")}
                />
                <label htmlFor={`optionC-${index}`}>C) Comedy</label><br />
                <input
                  type="radio"
                  id={`optionD-${index}`}
                  name={`question-${index}`}
                  value="Sci-fi, Fantasy"
                  checked={answer.selectedAnswer === "Sci-fi, Fantasy"}
                  onChange={() => handleAnswerChange(index, "Sci-fi, Fantasy")}
                />
                <label htmlFor={`option-${index}`}>D) Sci-fi/Fantasy</label><br />
                <input
                  type="radio"
                  id={`optionE-${index}`}
                  name={`question-${index}`}
                  value="Horror, Thriller"
                  checked={answer.selectedAnswer === "Horror, Thriller"}
                  onChange={() => handleAnswerChange(index, "Horror, Thriller")}
                />
                <label htmlFor={`optionE-${index}`}>E) Horror/Thriller</label><br />
                </>
              )}
              {answer.question === "Mood" && (
                <>
                  <input
                    type="radio"
                    id={`optionA-${index}`}
                    name={`question-${index}`}
                    value="Exciting"
                    checked={answer.selectedAnswer === "Exciting"}
                    onChange={() => handleAnswerChange(index, "Exciting")}
                  />
                  <label htmlFor={`optionA-${index}`}>A) Excited</label><br />
                  <input
                    type="radio"
                    id={`optionB-${index}`}
                    name={`question-${index}`}
                    value="Romantic"
                    checked={answer.selectedAnswer === "Romantic"}
                    onChange={() => handleAnswerChange(index, "Romantic")}
                  />
                  <label htmlFor={`optionA-${index}`}>B) Romantic</label><br />
                  <input
                    type="radio"
                    id={`optionC-${index}`}
                    name={`question-${index}`}
                    value="Funny"
                    checked={answer.selectedAnswer === "Funny"}
                    onChange={() => handleAnswerChange(index, "Funny")}
                  />
                  <label htmlFor={`optionA-${index}`}>C) Laughing</label><br />
                  <input
                    type="radio"
                    id={`optionD-${index}`}
                    name={`question-${index}`}
                    value="Wondering"
                    checked={answer.selectedAnswer === "Wondering"}
                    onChange={() => handleAnswerChange(index, "Wondering")}
                  />
                  <label htmlFor={`optionA-${index}`}>D) Wondering</label><br />
                  <input
                    type="radio"
                    id={`optionE-${index}`}
                    name={`question-${index}`}
                    value="Thrilled"
                    checked={answer.selectedAnswer === "Thrilled"}
                    onChange={() => handleAnswerChange(index, "Thrilled")}
                  />
                  <label htmlFor={`optionA-${index}`}>E) Thrilled</label><br />
                </>
              )}
              {answer.question === "Main Characters" && (
                <>
                  <input
                    type="radio"
                    id={`optionA-${index}`}
                    name={`question-${index}`}
                    value="Strong, heroic figures"
                    checked={answer.selectedAnswer === "Strong, heroic figures"}
                    onChange={() => handleAnswerChange(index, "Strong, heroic figures")}
                  />
                  <label htmlFor={`optionA-${index}`}>A) Strong, heroic figures</label><br />
                  <input
                    type="radio"
                    id={`optionB-${index}`}
                    name={`question-${index}`}
                    value="Complex, emotionally-driven characters"
                    checked={answer.selectedAnswer === "Complex, emotionally-driven characters"}
                    onChange={() => handleAnswerChange(index, "Complex, emotionally-driven characters")}
                  />
                  <label htmlFor={`optionA-${index}`}>B) Complex, emotionally-driven characters</label><br />
                  <input
                    type="radio"
                    id={`optionC-${index}`}
                    name={`question-${index}`}
                    value="Quirky and funny personalities"
                    checked={answer.selectedAnswer === "Quirky and funny personalities"}
                    onChange={() => handleAnswerChange(index, "Quirky and funny personalities")}
                  />
                  <label htmlFor={`optionA-${index}`}>C) Quirky and funny personalities</label><br />
                  <input
                    type="radio"
                    id={`optionD-${index}`}
                    name={`question-${index}`}
                    value="Intellectual and imaginative individuals"
                    checked={answer.selectedAnswer === "Intellectual and imaginative individuals"}
                    onChange={() => handleAnswerChange(index, "Intellectual and imaginative individuals")}
                  />
                  <label htmlFor={`optionA-${index}`}>D) Intellectual and imaginative individuals</label><br />
                  <input
                    type="radio"
                    id={`optionE-${index}`}
                    name={`question-${index}`}
                    value="Underdog or survivor types"
                    checked={answer.selectedAnswer === "Underdog or survivor types"}
                    onChange={() => handleAnswerChange(index, "Underdog or survivor types")}
                  />
                  <label htmlFor={`optionA-${index}`}>E) Underdog or survivor types</label><br />
                </>
              )}
              </div>
              )}
            </div>
          ))}
        </div>
        <button type="submit" className='submit-button'>Submit</button>
      </form>
      {/* Conditionally render QuizResultPopup with a random movie from results */}
      {isPopupOpen && results.length > 0 && <QuizResultPopup movie={results[Math.floor(Math.random() * results.length)]} onClose={closePopup} />}
    </div>
  );
};

export default Quiz;
