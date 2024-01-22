import React from 'react';
import '../../globals.css';
import '../../fonts.css';
import 'tailwindcss/tailwind.css';
import StartButton from './StartButton';
import { IQuiz, Props } from '../../types';

type IProps = {
  quiz: IQuiz;
};

export default function RecentQuiz({
  setCurrentPage,
  quiz,
  setSelectedQuiz,
}: Props & IProps) {
  return (
    <div className="flex flex-row justify-between bg-[#000]/60 rounded-default h-[75px] min-h-[75px] max-h-[0%] w-full min-w-[400px] mb-1 overflow-hidden">
      <div className="text-left ml-2">
        <p className="">{quiz.title}</p>
        <p className="text-gray_text">{quiz.description}</p>
      </div>
      <div>
        <div
          onClick={() => {
            setSelectedQuiz(quiz);
            setCurrentPage('quiz');
          }}
          className="flex items-center rounded-[5px] justify-center bg-accent w-[120px] max-w-[120px] h-[60px] m-2 cursor-pointer transition-colors duration-150 ease-in-out hover:bg-[#ff52b6] flex-shrink-0 ml-3 "
        >
          <p>PLAY</p>
        </div>
      </div>
    </div>
  );
}
