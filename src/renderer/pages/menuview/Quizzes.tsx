import '../../globals.css';
import '../../fonts.css';
import 'tailwindcss/tailwind.css';
import React, { useEffect, useState } from 'react';
import { IQuiz, Props } from '../../types';

import MenuWrapper from '../../components/menuview/MenuWrapper';
import QuizList from '../../components/quizzes/QuizList';
import Quiz from '../../components/quizzes/Quiz';
// eslint-disable-next-line import/no-cycle
import { getQuizzes } from '../..';

export default function Quizzes({
  setCurrentPage,
  setSelectedQuiz,
  serial,
}: Props) {
  const [quizzes, setQuizzes] = useState<IQuiz[]>([]);

  useEffect(() => {
    async function loadQuizzes() {
      const ltsquizzes = await getQuizzes();
      setQuizzes(ltsquizzes);
    }
    loadQuizzes();
  }, []);

  return (
    <MenuWrapper serial={serial} setCurrentPage={setCurrentPage}>
      <QuizList name="Quizzes">
        {quizzes.map((quiz) => (
          <Quiz
            key={quiz.id}
            quiz={quiz}
            setCurrentPage={setCurrentPage}
            setSelectedQuiz={setSelectedQuiz}
          />
        ))}
      </QuizList>
    </MenuWrapper>
  );
}
