import '../../globals.css';
import '../../fonts.css';
import 'tailwindcss/tailwind.css';
import React from 'react';

import MenuWrapper from '../../components/quiz/quizmenu/MenuWrapper';

type Props = {
  setCurrentQuizPage: React.Dispatch<
    React.SetStateAction<'quizinit' | 'quizquestion' | 'quizend'>
  >;
};

export default function QuizEnd({ setCurrentQuizPage }: Props) {
  return (
    <MenuWrapper setCurrentQuizPage={setCurrentQuizPage}>
      <div className="flex flex-col w-full">
        <div className="flex flex-row flex-grow mt-2 mx-2">
          <div className="flex flex-col grow items-center">
            <p>Quiz ended</p>
          </div>
          <div className="flex flex-row" />
        </div>
        <div className="flex flex-row bg-[#000]/60 rounded-default h-[100px] m-2 justify-end">
          <div
            onClick={() => {
              setCurrentQuizPage('quizquestion');
            }}
            className="self-center flex items-center rounded-[5px] justify-center bg-[#1af] w-[150px] max-w-[150px] h-[80px] m-2 cursor-pointer transition-colors duration-150 ease-in-out hover:bg-[#45bdff] flex-shrink-0"
          >
            <p>RESTART QUIZ</p>
          </div>
        </div>
      </div>
    </MenuWrapper>
  );
}
