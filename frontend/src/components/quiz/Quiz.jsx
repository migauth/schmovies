import React, { useState } from 'react';
import axios from 'axios';
import GenreQuestion from './GenreQuestion';
import MoodQuestion from './MoodQuestion';
import CharactersQuestion from './CharactersQuestion';
import QuizResultPopup from './QuizResultPopup';
import CheeseSlider from './CheeseSlider';
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
  const [currentResultIndex, setCurrentResultIndex] = useState(0);
  const [hasSubmitted, setHasSubmitted] = useState(false)


  const handleAnswerChange = (selectedAnswer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex].selectedAnswer = selectedAnswer;
    setAnswers(newAnswers);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (hasSubmitted) return;


    // Check if it's the last question
    if (currentQuestionIndex === answers.length - 1) {
      setHasSubmitted(true);
      try {
        const response = await axios.post('https://schmovies-cc8d8692549b.herokuapp.com/quiz/submit-quiz/', { answers: answers });
        setResults(response.data.recommendations);
        setCurrentResultIndex(Math.floor(Math.random() * response.data.recommendations.length));
        setIsPopupOpen(true);
      } catch (error) {
        console.error('Error:', error);
        setHasSubmitted(false)
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
    setHasSubmitted(false)
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
          movie={results[currentResultIndex]}
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