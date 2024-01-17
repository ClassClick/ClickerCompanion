import React, { useEffect, useState } from 'react';
import QuizEnd from './QuizEnd';
import QuizInit from './QuizInit';
import QuizQuestion from './QuizQuestion';
import { Props } from '../../types';
import { TestQuiz, TestQuizQuestions } from './TestQuiz';

export default function QuizWrapper({
  // selectedQuiz, // TODO: USE THIS AGAIN PLEASE
  serial,
  foundDevices,
  connectedDevices,
}: Props) {
  const [currentQuizPage, setCurrentQuizPage] = useState<
    'quizinit' | 'quizquestion' | 'quizend'
  >('quizinit');

  const [showAnswer, setShowAnswer] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(10);

  if (quizStarted && currentQuizPage === 'quizinit') {
    setCurrentQuizPage('quizquestion');
    setSelectedQuestion(0);
  }

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (timeRemaining > 0) {
      const timerId = setInterval(() => {
        setTimeRemaining((prevCount) => prevCount - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
    if (timeRemaining === 0 && !showAnswer) {
      const timerId = setInterval(() => {
        setShowAnswer(true);
        setTimeRemaining(3);
      }, 1000);
      return () => clearInterval(timerId);
    }
    if (timeRemaining === 0 && showAnswer) {
      const timerId = setInterval(() => {
        setShowAnswer(false);
        if (selectedQuestion + 1 >= TestQuizQuestions.length) {
          setCurrentQuizPage('quizend');
        } else {
          setSelectedQuestion((prevCount) => prevCount + 1);
        }
        setTimeRemaining(10);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [timeRemaining, showAnswer, selectedQuestion]);

  const currentQuestion = TestQuizQuestions[selectedQuestion];
  const selectedQuiz = TestQuiz;

  if (currentQuizPage === 'quizinit')
    return (
      <QuizInit
        serial={serial}
        setCurrentQuizPage={setCurrentQuizPage}
        connectedDevices={connectedDevices}
        foundDevices={foundDevices}
        setQuizStarted={setQuizStarted}
        selectedQuiz={selectedQuiz}
      />
    );
  if (currentQuizPage === 'quizquestion')
    return (
      <QuizQuestion
        question={currentQuestion}
        timeRemaining={timeRemaining}
        showAnswer={showAnswer}
      />
    );
  if (currentQuizPage === 'quizend')
    return (
      <QuizEnd
        selectedQuiz={selectedQuiz}
        serial={serial}
        setCurrentQuizPage={setCurrentQuizPage}
      />
    );
}
