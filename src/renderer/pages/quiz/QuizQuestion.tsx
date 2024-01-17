import '../../globals.css';
import '../../fonts.css';
import 'tailwindcss/tailwind.css';
import React from 'react';
import QuestionWrapper from '../../components/quiz/quizquestion/QuestionWrapper';
import Question from '../../components/quiz/quizquestion/Question';
import { IQuestion } from '../../types';

type Props = {
  question: IQuestion;
  timeRemaining: number;
  showAnswer: boolean;
};

export default function QuizQuestion({
  question,
  timeRemaining,
  showAnswer,
}: Props) {
  return (
    <QuestionWrapper>
      <Question
        title={question.question}
        answer1={question.answer_1}
        answer1_valid={question.answer_1_valid}
        answer2={question.answer_2}
        answer2_valid={question.answer_2_valid}
        answer3={question.answer_3}
        answer3_valid={question.answer_3_valid}
        answer4={question.answer_4}
        answer4_valid={question.answer_4_valid}
        timeRemaining={timeRemaining}
        showAnswer={showAnswer}
      />
    </QuestionWrapper>
  );
}
