import '../../globals.css';
import '../../fonts.css';
import 'tailwindcss/tailwind.css';
import React from 'react';

import MenuWrapper from '../../components/quiz/quizmenu/MenuWrapper';
import DevicesList from '../../components/quiz/quizinit/DevicesList';
import PairingDevice from '../../components/quiz/quizinit/PairingDevice';
import ConnectedDevice from '../../components/quiz/quizinit/ConnectedDevice';
import SerialHelper from '../../SerialHelper';
import { IDevice, IQuestion, IQuiz } from '../../types';
import List from '../../components/quiz/quizinit/List';
import QuestionCard from '../../components/quiz/quizinit/QuestionCard';

type Props = {
  setCurrentQuizPage: React.Dispatch<
    React.SetStateAction<'quizinit' | 'quizquestion' | 'quizend'>
  >;
  serial: SerialHelper;
  connectedDevices: IDevice[];
  foundDevices: IDevice[];
  selectedQuiz: IQuiz;
  setQuizStarted: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function QuizInit({
  setCurrentQuizPage,
  serial,
  connectedDevices,
  foundDevices,
  setQuizStarted,
  selectedQuiz,
}: Props) {
  return (
    <MenuWrapper
      selectedQuiz={selectedQuiz}
      serial={serial}
      setCurrentQuizPage={setCurrentQuizPage}
    >
      <div className="flex flex-col w-full">
        <div className="flex flex-row flex-grow mt-2 mx-2">
          <div className="flex flex-col grow items-center"></div>
          <div className="flex flex-row">
            <DevicesList name="Found Devices">
              {foundDevices.map((device) => (
                <PairingDevice serial={serial} device={device} />
              ))}
            </DevicesList>
            <DevicesList name="Connected Devices">
              {connectedDevices.map((device) => (
                <ConnectedDevice serial={serial} device={device} />
              ))}
            </DevicesList>
          </div>
        </div>
        <div className="flex flex-row h-[100px] m-2 justify-end">
          <div
            onClick={() => {
              setQuizStarted(true);
            }}
            className="self-center flex items-center rounded-[5px] justify-center bg-[#1af] w-[150px] max-w-[150px] h-[80px] m-2 cursor-pointer transition-colors duration-150 ease-in-out hover:bg-[#45bdff] flex-shrink-0"
          >
            <p>START QUIZ</p>
          </div>
        </div>
      </div>
    </MenuWrapper>
  );
}
