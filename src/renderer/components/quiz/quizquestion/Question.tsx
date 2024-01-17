import 'src/renderer/globals.css';
import 'src/renderer/fonts.css';
import 'tailwindcss/tailwind.css';
import React from 'react';
import { Props } from '../../../types';


type IProps = {
  title: String;
  answer1: String;
  answer2: String;
  answer3: String;
  answer4: String;
};

export default function Question({
  setCurrentPage,
  title,
  answer1,
  answer2,
  answer3,
  answer4,
}: Props & IProps) {
  return (
    <div className="flex flex-col min-h-screen max-h-screen">
      <div className="flex h-[300px] max-h-[300px] overflow-y-hidden bg-[#000]/60 backdrop-saturate-[80%] t-2 mb-4 mt-2 ml-2 mr-4 rounded-default justify-between items-center text-[48px]">
        <p className="ml-5">{title}</p>
        <p className="px-5">10</p>
      </div>
      <div
        onClick={() => {
          setCurrentPage('quizend');
        }}
        className="flex h-screen max-h-screen flex-wrap t-2 mb-4 mt-2 mx-4 rounded-default justify-center text-[48px] text-black_text"
      >
        <div className="flex h-auto w-[48%] bg-[#0FF]/80 t-2 mb-4 mt-2 ml-2 mr-4 rounded-default justify-center items-center">
          {answer1}
        </div>
        <div className="flex h-auto w-[48%] bg-[#F0F]/80 t-2 mb-4 mt-2 ml-2 mr-4 rounded-default justify-center items-center">
          {answer2}
        </div>
        <div className="flex h-auto w-[48%] bg-[#19FF19]/80 t-2 mb-4 mt-2 ml-2 mr-4 rounded-default justify-center items-center">
          {answer4}
        </div>
        <div className="flex h-auto w-[48%] bg-[#FF0]/80 t-2 mb-4 mt-2 ml-2 mr-4 rounded-default justify-center items-center">
          {answer3}
        </div>
      </div>
    </div>
  );
}
