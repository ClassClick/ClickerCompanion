import React from 'react';
import '../../globals.css';
import '../../fonts.css';
import 'tailwindcss/tailwind.css';
import { IPageNames, IQuiz } from '../../types';

type IProps = {
  name: String;
};

export default function StartButton({
  name,
  setCurrentPage,
  quiz,
  setSelectedQuiz,
}: IProps & {
  setCurrentPage: React.Dispatch<React.SetStateAction<IPageNames>>;
  quiz: IQuiz;
  setSelectedQuiz: React.Dispatch<React.SetStateAction<IQuiz>>;
}) {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      onClick={() => {
        setSelectedQuiz(quiz);
        setCurrentPage('quiz');
      }}
      className={`flex items-center rounded-[5px] justify-center bg-accent w-[120px] max-w-[120px] h-[60px] m-2 cursor-pointer transition-colors duration-150 ease-in-out hover:bg-[#ff52b6] flex-shrink-0 ml-3 `}
    >
      <p>{name}</p>
    </div>
  );
}
