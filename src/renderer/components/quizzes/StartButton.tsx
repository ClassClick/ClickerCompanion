import React from 'react';
import '../../globals.css';
import '../../fonts.css';
import 'tailwindcss/tailwind.css';
import { IPageNames } from '../../types';


type IProps = {
  name: String;
};

export default function StartButton({
  name,
  setCurrentPage,
}: IProps & {
  setCurrentPage: React.Dispatch<React.SetStateAction<IPageNames>>;
}) {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      onClick={() => {
        // @ts-ignore
        setCurrentPage('quizinit');
      }}
      className={`flex items-center rounded-[5px] justify-center bg-accent w-[120px] max-w-[120px] h-[60px] m-2 cursor-pointer transition-colors duration-150 ease-in-out hover:bg-[#ff52b6] flex-shrink-0 ml-3 `}
    >
      <p>{name}</p>
    </div>
  );
}
