import React from 'react';
import 'src/renderer/globals.css';
import 'src/renderer/fonts.css';
import 'tailwindcss/tailwind.css';
import * as Icons from 'react-icons/bi';

import logo from 'assets/logo.svg';
import { IPageNames } from '../../../types';

export default function Sidebar({
  setCurrentPage: setCurrentQuizPage,
}: {
  setCurrentPage: React.Dispatch<React.SetStateAction<IPageNames>>;
}) {
  return (
    <div className="flex flex-col">
      <div className="flex bg-[#000]/60 backdrop-saturate-[80%] w-[250px] rounded-default h-[120px] items-center justify-center ml-4 mt-4 p-2">
        <img draggable={false} alt="icon" src={logo} />
      </div>
      <div className="flex flex-col flex-grow w-[250px] bg-[#000]/60 backdrop-saturate-[80%] my-4 ml-4 mr-2 rounded-default shrink-0">
        <div className="flex flex-col flex-grow items-center">
          <p className="text-[24px]">Quiz Title</p>
          <p>Quiz Description</p>

          <div className="mt-auto flex flex-col">
            <div
              onClick={() => {
                setCurrentQuizPage('home');
              }}
              className="self-center flex items-center rounded-[5px] justify-center bg-[#1af] w-[230px] max-w-[230px] h-[40px] m-2 cursor-pointer transition-colors duration-150 ease-in-out hover:bg-[#45bdff] flex-shrink-0"
            >
              <p>EDIT QUIZ</p>
            </div>
            <div
              onClick={() => {
                setCurrentQuizPage('home');
              }}
              className="self-center flex items-center rounded-[5px] justify-center bg-[#f33] w-[230px] max-w-[230px] h-[40px] m-2 cursor-pointer transition-colors duration-150 ease-in-out hover:bg-[#ff6262] flex-shrink-0"
            >
              <p>EXIT QUIZ</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex text-[12px] w-[250px] rounded-default flex-col text-gray_text ml-4 mb-4 py-2 bg-[#000]/60 backdrop-saturate-[80%] text-center mt-auto justify-between">
        <p>Copyright © 2024 ClassClick B.V.</p>
        <p>For</p>
        <p>De Haagse Hogeschool</p>
        <p>By</p>
        <p>Thijs Kamphuis</p>
        <p>Daan Breur</p>
        <p>Manu Kapel</p>
        <p>Martijn Swarte</p>
        <p>Jeroen de Kuijper</p>
      </div>
      <div className="flex flex-row">
        <a
          className="mt-auto flex-grow rounded-default py-2 bg-[#000]/60 backdrop-saturate-[80%] text-center ml-4 mb-4 cursor-pointer transition-colors duration-150 ease-in-out hover:text-accent"
          href="https://classclick.nl"
          target="_blank"
          rel="noreferrer noopener"
        >
          classclick.nl
        </a>
        <a
          className="mt-auto w-[50px] rounded-default py-2 bg-[#000]/60 backdrop-saturate-[80%] flex justify-center ml-2 mb-4 mr-2 cursor-pointer transition-colors duration-150 ease-in-out hover:text-accent"
          href="https://classclicker.nl"
          target="_blank"
          rel="noreferrer noopener"
          title="Sourcecode"
        >
          <Icons.BiCodeBlock size={24} />
        </a>
      </div>
    </div>
  );
}
