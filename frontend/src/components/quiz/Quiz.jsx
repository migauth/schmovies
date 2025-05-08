import React, { useState } from 'react';
import axios from 'axios';
import { getApiBaseUrl } from '../../utils/apiConfig';
import { fetchWithProxy, postWithProxy } from '../../utils/corsProxy';
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
        const quizEndpoint = `${apiBaseUrl}/quiz/submit-quiz/`;
        
        console.log("Quiz completed, submitting answers to API");
        console.log("Quiz answers:", answers);
        
        try {
          // Try to submit quiz using our improved proxy utility
          const apiResponse = await postWithProxy(quizEndpoint, { answers });
          
          if (apiResponse && apiResponse.recommendations && 
              Array.isArray(apiResponse.recommendations) && 
              apiResponse.recommendations.length > 0) {
            
            console.log(`Successfully got ${apiResponse.recommendations.length} movie recommendations from API`);
            setResults(apiResponse.recommendations);
            setIsPopupOpen(true);
            return;
          } else {
            console.warn('API returned empty or invalid recommendations');
            throw new Error('Invalid API recommendations');
          }
        } catch (apiError) {
          console.error('Failed to get recommendations from API:', apiError);
          throw apiError; // Fall through to local filtering
        }
      } catch (error) {
        console.log("Using local fallback recommendations instead");
        
        // Get relevant movies based on the user's answers
        let filteredMovies = [];
        
        // Check what genre the user selected
        const genreAnswer = answers[0].selectedAnswer.toLowerCase();
        if (genreAnswer.includes('action') || genreAnswer.includes('adventure')) {
          filteredMovies = fallbackMovies.filter(movie => 
            movie.genre.toLowerCase().includes('action') || 
            movie.genre.toLowerCase().includes('adventure')
          );
        } else if (genreAnswer.includes('comedy')) {
          filteredMovies = fallbackMovies.filter(movie => 
            movie.genre.toLowerCase().includes('comedy')
          );
        } else if (genreAnswer.includes('drama')) {
          filteredMovies = fallbackMovies.filter(movie => 
            movie.genre.toLowerCase().includes('drama')
          );
        } else if (genreAnswer.includes('sci') || genreAnswer.includes('fantasy')) {
          filteredMovies = fallbackMovies.filter(movie => 
            movie.genre.toLowerCase().includes('sci-fi') || 
            movie.genre.toLowerCase().includes('fantasy')
          );
        }
        
        // If no matches or too few matches, use cheese level to determine
        if (filteredMovies.length < 3) {
          const cheeseAnswer = answers[3].selectedAnswer.toLowerCase();
          if (cheeseAnswer === 'cheesy' || cheeseAnswer === 'silly') {
            filteredMovies = fallbackMovies.filter(movie => 
              movie.genre.toLowerCase().includes('comedy')
            );
          } else if (cheeseAnswer === 'highbrow') {
            filteredMovies = fallbackMovies.filter(movie => 
              movie.genre.toLowerCase().includes('drama')
            );
          }
        }
        
        // If still no matches, just use all movies
        if (filteredMovies.length < 3) {
          filteredMovies = fallbackMovies;
        }
        
        // Limit to 5 random results
        let quizResults = filteredMovies;
        if (filteredMovies.length > 5) {
          // Get 5 random movies from the filtered list
          quizResults = [];
          const indices = new Set();
          while (indices.size < 5) {
            indices.add(Math.floor(Math.random() * filteredMovies.length));
          }
          indices.forEach(index => quizResults.push(filteredMovies[index]));
        }
        
        console.log(`Selected ${quizResults.length} movies for quiz results`);
        setResults(quizResults);
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