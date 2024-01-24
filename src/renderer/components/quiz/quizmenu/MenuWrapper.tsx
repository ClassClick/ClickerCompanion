import 'src/renderer/globals.css';
import 'src/renderer/fonts.css';
import 'tailwindcss/tailwind.css';
import React from 'react';

import PageWrapper from '../../PageWrapper';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import SerialHelper from '../../../SerialHelper';
import { IPageNames, IQuiz } from '../../../types';

type IProps = {
  children: React.ReactNode;
};

type Props = {
  setCurrentQuizPage: React.Dispatch<
    React.SetStateAction<'quizinit' | 'quizquestion' | 'quizend'>
  >;
  setCurrentPage: React.Dispatch<React.SetStateAction<IPageNames>>;
  serial: SerialHelper;
  selectedQuiz: IQuiz;
};

export default function MenuWrapper({
  setCurrentQuizPage,
  children,
  serial,
  selectedQuiz,
  setCurrentPage,
}: Props & IProps) {
  return (
    <PageWrapper>
      <div className="flex min-h-screen max-h-screen">
        <Sidebar
          selectedQuiz={selectedQuiz}
          setCurrentQuizPage={setCurrentQuizPage}
          setCurrentPage={setCurrentPage}
        />
        <div className="flex flex-col flex-1 max-h-screen">
          <Topbar serial={serial} />
          <div className="flex h-screen max-h-screen overflow-y-hidden bg-[#000]/60 backdrop-saturate-[80%] t-2 mb-4 mt-2 ml-2 mr-4 rounded-default">
            {children}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
