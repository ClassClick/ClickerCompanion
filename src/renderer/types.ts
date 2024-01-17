import React from 'react';
// eslint-disable-next-line import/no-cycle
import SerialHelper from './SerialHelper';

export type IPageNames = 'home' | 'quizzes' | 'reports' | 'settings' | 'quiz';

export type IDatabaseQuery =
  | {
      type: 'request';
      requestFor: 'quizzes';
    }
  | {
      type: 'request';
      requestFor: 'quiz';
      quizId: number;
    }
  | {
      type: 'request';
      requestFor: 'questions';
      quizId: number;
    }
  | {
      type: 'request';
      requestFor: 'question';
      questionId: number;
    };

export interface IDevice {
  id: number;
  mac_address: String;
} // TODO: fix this as well

export interface IAnswer {
  id: number | null;
  device_id: number;
  question_id: number;
  room_id: number;
  timestamp: Date;
  answer: string; // TODO: make better fucking name for this
}

export interface IQuestion {
  id: number;
  quiz_id: number;
  question: string;
  answer_1: string | null;
  answer_2: string | null;
  answer_3: string | null;
  answer_4: string | null;
  answer_1_valid: boolean;
  answer_2_valid: boolean;
  answer_3_valid: boolean;
  answer_4_valid: boolean;
}

export interface IQuiz {
  id: number | null;
  title: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}

export interface IRoom {
  id: number | null;
  quiz_id: number;
  started: Date;
}

export type Props = {
  setCurrentPage?: React.Dispatch<React.SetStateAction<IPageNames>>;
  selectedQuiz?: IQuiz;
  setSelectedQuiz?: React.Dispatch<React.SetStateAction<IQuiz>>;
  foundDevices?: IDevice[];
  setFoundDevices?: React.Dispatch<React.SetStateAction<IDevice[]>>;
  connectedDevices?: IDevice[];
  setConnectedDevices?: React.Dispatch<React.SetStateAction<IDevice[]>>;
  serial?: SerialHelper;
};
