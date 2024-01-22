import React, { useEffect, useState } from 'react';
import QuizEnd from './QuizEnd';
import QuizInit from './QuizInit';
import QuizQuestion from './QuizQuestion';
import { IQuestion, Props } from '../../types';
import { TestQuiz, TestQuizQuestions } from './TestQuiz';
import { getQuizQuestions } from '../..';

export default function QuizWrapper({
  selectedQuiz, // TODO: USE THIS AGAIN PLEASE
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

  const [quizQuestions, setQuizQuestions] = useState<IQuestion[]>([]);
  const currentQuestion = quizQuestions[selectedQuestion];

  useEffect(() => {
    async function getQuizQuestion() {
      if (selectedQuiz) {
        if (selectedQuiz !== null) {
          console.log(selectedQuiz);
          const ltsquizzes = await getQuizQuestions(selectedQuiz.id);
          setQuizQuestions(ltsquizzes);
          console.log(ltsquizzes);
        }
      }
    }
    getQuizQuestion();
  }, [selectedQuiz]);

  function countAnswers(question: IQuestion): number {
    let count = 0;
    if (question.answer_1 !== null) count += 1;
    if (question.answer_2 !== null) count += 1;
    if (question.answer_3 !== null) count += 1;
    if (question.answer_4 !== null) count += 1;
    return count;
  }

  useEffect(() => {
    if (quizStarted && currentQuizPage === 'quizinit') {
      setCurrentQuizPage('quizquestion');
      setSelectedQuestion(0);
      serial?.askQuestion(countAnswers(DemoQuizQuestions[0]));
    }

    let timerId: any = null;
    if (quizStarted) {
      if (timeRemaining > 0) {
        timerId = setInterval(() => {
          setTimeRemaining((prevCount) => prevCount - 1);
        }, 1000);
      } else if (timeRemaining === 0) {
        if (!showAnswer) {
          setShowAnswer(true);
          serial?.showAnswer(currentQuestion.answer);
          setTimeRemaining(3);
        } else {
          setShowAnswer(false);
          if (selectedQuestion + 1 >= DemoQuizQuestions.length) {
            serial?.resetQuestion();
            setCurrentQuizPage('quizend');
            setSelectedQuestion(0);
            setShowAnswer(false);
            setQuizStarted(false);
          } else {
            setSelectedQuestion((prevCount) => prevCount + 1);
            serial?.askQuestion(
              countAnswers(DemoQuizQuestions[selectedQuestion + 1]),
            );
          }
          setTimeRemaining(10);
        }
      }
    }
    return () => clearInterval(timerId);
  }, [
    timeRemaining,
    showAnswer,
    selectedQuestion,
    quizStarted,
    serial,
    currentQuestion,
    currentQuizPage,
  ]);

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
        setQuizStarted={setQuizStarted}
      />
    );
}
