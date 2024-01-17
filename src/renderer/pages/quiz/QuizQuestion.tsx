import '../../globals.css';
import '../../fonts.css';
import 'tailwindcss/tailwind.css';
import React from 'react';
import { Props } from '../../types';
import QuestionWrapper from '../../components/quiz/quizquestion/QuestionWrapper';
import Question from '../../components/quiz/quizquestion/Question';

export default function QuizQuestion({ setCurrentPage }: Props) {
  return (
    <QuestionWrapper>
      <Question
        title="Question Title"
        answer1="ANTWOORD 1"
        answer2="ANTWOORD 2"
        answer3="ANTWOORD 3"
        answer4="ANTWOORD 4"
        setCurrentPage={setCurrentPage}
      />
    </QuestionWrapper>
  );
}
