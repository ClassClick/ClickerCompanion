/* eslint-disable camelcase */
import 'src/renderer/globals.css';
import 'src/renderer/fonts.css';
import 'tailwindcss/tailwind.css';
import React from 'react';
import { Props } from '../../../types';

type IProps = {
  title: String;
  answer1: String | null;
  answer2: String | null;
  answer3: String | null;
  answer4: String | null;
  timeRemaining: number;
  showAnswer: boolean;
  answer1_valid: boolean;
  answer2_valid: boolean;
  answer3_valid: boolean;
  answer4_valid: boolean;
};

export default function Question({
  title,
  answer1,
  answer1_valid,
  answer2,
  answer2_valid,
  answer3,
  answer3_valid,
  answer4,
  answer4_valid,
  timeRemaining,
  showAnswer,
}: Props & IProps) {
  return (
    <div className="flex flex-col min-h-screen max-h-screen overflow-hidden">
      <div className="flex h-[300px] max-h-[300px] w-[99%] max-w-[99%] overflow-y-hidden bg-[#000]/60 backdrop-saturate-[80%] t-2 mb-4 mt-2 ml-2 mr-4 rounded-default justify-between items-center text-[48px]">
        <p className="ml-5">{title}</p>
        <p className="px-5 mr-5">{timeRemaining}</p>
      </div>
      <div className="grid grid-cols-2 grid-rows-2 gap-5 w-[99%] h-screen max-h-screen flex-wrap t-2 mb-4 mt-2 rounded-default justify-center text-[48px] text-black_text">
        {answer1 !== null && (
          <div
            className={`flex h-auto w-full t-2 mb-4 mt-2 ml-2 mr-4 rounded-default justify-center items-center ${
              showAnswer
                ? answer1_valid
                  ? 'bg-[#0a0]'
                  : 'bg-[#f33]'
                : 'bg-[#0FF]/80'
            }`}
          >
            {answer1}
          </div>
        )}
        {answer2 !== null && (
          <div
            className={`flex h-auto w-full t-2 mb-4 mt-2 ml-2 mr-4 rounded-default justify-center items-center ${
              showAnswer
                ? answer2_valid
                  ? 'bg-[#0a0]'
                  : 'bg-[#f33]'
                : 'bg-[#F0F]/80'
            }`}
          >
            {answer2}
          </div>
        )}
        {answer4 !== null && (
          <div
            className={`flex h-auto w-full t-2 mb-4 mt-2 ml-2 mr-4 rounded-default justify-center items-center ${
              showAnswer
                ? answer4_valid
                  ? 'bg-[#0a0]'
                  : 'bg-[#f33]'
                : 'bg-[#19FF19]/80'
            }`}
          >
            {answer4}
          </div>
        )}
        {answer3 !== null && (
          <div
            className={`flex h-auto w-full t-2 mb-4 mt-2 ml-2 mr-4 rounded-default justify-center items-center ${
              showAnswer
                ? answer3_valid
                  ? 'bg-[#0a0]'
                  : 'bg-[#f33]'
                : 'bg-[#FF0]/80'
            }`}
          >
            {answer3}
          </div>
        )}
      </div>
    </div>
  );
}
