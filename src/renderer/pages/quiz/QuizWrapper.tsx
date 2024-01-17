import React, { useEffect, useState } from 'react';
import QuizEnd from './QuizEnd';
import QuizInit from './QuizInit';
import QuizQuestion from './QuizQuestion';
import { Props } from '../../types';

export default function QuizWrapper({
  selectedQuiz,
  serial,
  foundDevices,
  setFoundDevices,
  setConnectedDevices,
  connectedDevices,
}: Props) {
  const [currentQuizPage, setCurrentQuizPage] = useState<
    'quizinit' | 'quizquestion' | 'quizend'
  >('quizinit');

  if (currentQuizPage === 'quizinit')
    return (
      <QuizInit
        serial={serial}
        setCurrentQuizPage={setCurrentQuizPage}
        connectedDevices={connectedDevices}
        foundDevices={foundDevices}
      />
    );
  if (currentQuizPage === 'quizquestion')
    return <QuizQuestion setCurrentQuizPage={setCurrentQuizPage} />;
  if (currentQuizPage === 'quizend')
    return <QuizEnd setCurrentQuizPage={setCurrentQuizPage} />;
}
