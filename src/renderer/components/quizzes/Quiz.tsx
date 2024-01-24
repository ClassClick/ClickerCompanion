import React from 'react';
import '../../globals.css';
import '../../fonts.css';
import 'tailwindcss/tailwind.css';
import StartButton from './StartButton';
import EditButton from './EditButton';
import { IQuiz, Props } from '../../types';

type IProps = {
  quiz: IQuiz;
};

export default function Quiz({
  setCurrentPage,
  quiz,
  setSelectedQuiz,
}: Props & IProps) {
  return (
    <div className="flex flex-row justify-between bg-[#000]/60 rounded-default h-[75px] min-h-[75px] max-h-[0%] w-full min-w-[400px] mb-1 overflow-hidden">
      <div className="text-left ml-2 ">
        <p className="">{quiz.title}</p>
        <p className="text-gray_text">{quiz.description}</p>
      </div>
      <div className="flex flex-row">
        <EditButton name="EDIT" />
        <StartButton
          name="PLAY"
          setCurrentPage={setCurrentPage}
          setSelectedQuiz={setSelectedQuiz}
          quiz={quiz}
        />
      </div>
    </div>
  );
}
