import React, { useState } from 'react';
import axios from 'axios';
import { getApiBaseUrl } from '../../utils/apiConfig';
import { fetchWithProxy } from '../../utils/corsProxy';
import GenreQuestion from './GenreQuestion';
import MoodQuestion from './MoodQuestion';
import CharactersQuestion from './CharactersQuestion';
import QuizResultPopup from './QuizResultPopup';
import CheeseSlider from './CheeseSlider';
import fallbackMovies from '../../data/fallbackMovies';
import './styles/Quiz.scss';

const Quiz = ({
  addToFavourites,
  removeFromFavourites,
  currentUser,
}) => {
  const initialAnswers = [
    { question: "Genre Preference", selectedAnswer: "" },
    { question: "Mood", selectedAnswer: "" },
    { question: "Main Characters", selectedAnswer: "" },
    { question: "Cheese", selectedAnswer: "" },
  ];

  const [answers, setAnswers] = useState(initialAnswers);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [results, setResults] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [currentResultIndex, setCurrentResultIndex] = useState(0);


  const handleAnswerChange = (selectedAnswer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex].selectedAnswer = selectedAnswer;
    setAnswers(newAnswers);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if it's the last question
    if (currentQuestionIndex === answers.length - 1) {
      try {
        const apiBaseUrl = getApiBaseUrl();
        
        // Try with CORS proxy first
        try {
          console.log("Submitting quiz using CORS proxy");
          const url = `${apiBaseUrl}/quiz/submit-quiz/`;
          
          // Use fetch directly with the proxy for POST request
          const proxyUrl = `https://corsproxy.io/?${url}`;
          const proxyResponse = await fetch(proxyUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ answers: answers })
          });
          
          if (!proxyResponse.ok) {
            throw new Error(`Proxy request failed with status ${proxyResponse.status}`);
          }
          
          const proxyData = await proxyResponse.json();
          console.log("Successfully submitted quiz via proxy", proxyData);
          setResults(proxyData.recommendations);
          setIsPopupOpen(true);
          return;
        } catch (proxyError) {
          console.warn("Failed to submit quiz via proxy:", proxyError);
          
          // Try direct request
          try {
            console.log("Trying direct API request");
            const response = await axios.post(`${apiBaseUrl}/quiz/submit-quiz/`, 
              { answers: answers },
              {
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'Origin': window.location.origin
                },
                timeout: 5000
              }
            );
            console.log("Quiz submission successful:", response.data);
            setResults(response.data.recommendations);
            setIsPopupOpen(true);
            return;
          } catch (directError) {
            console.warn("Direct API request failed:", directError);
            throw directError; // Re-throw to trigger fallback
          }
        }
      } catch (error) {
        console.error('All quiz submission attempts failed:', error);
        // Use fallback movie recommendations
        console.log("Using fallback movie recommendations");
        // Filter sci-fi and action movies as fallback quiz results
        const quizResults = fallbackMovies.filter(movie => 
          movie.genre.toLowerCase().includes('sci-fi') || 
          movie.genre.toLowerCase().includes('action')
        );
        setResults(quizResults.length > 0 ? quizResults : fallbackMovies.slice(0, 5));
        setIsPopupOpen(true);
      }
    } else {
      // Move to the next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleNextMovieResult = () => {
    setCurrentResultIndex((prevIndex) => (prevIndex + 1) % results.length);
  };

  const handleGoBack = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const handleRestartQuiz = () => {
    // Reset quiz state to initial values
    setAnswers(initialAnswers);
    setCurrentQuestionIndex(0);
    setResults([]);
    setIsPopupOpen(false);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const renderCurrentQuestion = () => {
    const currentQuestion = answers[currentQuestionIndex];
    switch (currentQuestion.question) {
      case "Genre Preference":
        return <GenreQuestion question={currentQuestion} onChange={handleAnswerChange} />;
      case "Mood":
        return <MoodQuestion question={currentQuestion} onChange={handleAnswerChange} />;
      case "Main Characters":
        return <CharactersQuestion question={currentQuestion} onChange={handleAnswerChange} />;
      case "Cheese":
        return <CheeseSlider question={currentQuestion} onChange={handleAnswerChange} />;
      default:
        return null;
    }
  };
  const isLastQuestion = currentQuestionIndex === answers.length - 1;

  return (
    <div className="quiz-container">
      <h2 className="quiz-title">Take the quiz - find a movie to watch!</h2>
      <form onSubmit={handleSubmit}>
        <div className="quiz-questions">{renderCurrentQuestion()}</div>
        <div className="button-container">
          <button type="submit" className="submit-button">
            {isLastQuestion ? "Submit" : "Next Question"}
          </button>
          {currentQuestionIndex > 0 && (
            <button
              type="button"
              onClick={handleGoBack}
              className="go-back-button"
            >
              Go Back
            </button>
          )}
        </div>
      </form>
      {isPopupOpen && results.length > 0 && (
        <QuizResultPopup
          movie={results[Math.floor(Math.random() * results.length)]}
          handleRestartQuiz={handleRestartQuiz}
          closePopup={closePopup}
          onNext={handleNextMovieResult}
          removeFromFavourites={removeFromFavourites}
          addToFavourites={addToFavourites}
          currentUser={currentUser}
        />
      )}
    </div>
  );
};

export default Quiz;