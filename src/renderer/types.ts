import React from 'react';
// eslint-disable-next-line import/no-cycle
import SerialHelper from './SerialHelper';

export type IPageNames = 'home' | 'quizzes' | 'reports' | 'settings' | 'quiz';

export interface IDevice {
  id: number;
  mac_address: String;
} // TODO: fix this as well

export interface IAnswer {
  id: number | null;
  device_id: number;
  question_id: number;
  room_id: number;
  timeToAnswer: Date;
  answer: number;
}

export interface IQuestion {
  id: number;
  quiz_id: number;
  question: string;
  answer_1: string | null;
  answer_2: string | null;
  answer_3: string | null;
  answer_4: string | null;
  answer: number;
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

export type SerialClickerEvent =
  | {
      type: 'pairing';
      data: {
        id: number;
        macaddr: string;
      };
    }
  | {
      type: 'answer';
      data: { id: number; timeToAnswer: number; answer: number };
    }
  | {
      type: 'power_status';
      data: {
        id: number;
        isCharging: boolean;
        usbPowerConnected: boolean;
        batteryVoltage: number;
      };
    };

export type SerialHubEvent =
  | {
      type: 'set_id';
      data: {
        id: number;
      };
    }
  | {
      type: 'end_question';
      data: {
        correct_answer: number;
      };
    }
  | {
      type: 'new_question';
      data: {
        amount_answers: number;
      };
    }
  | {
      type: 'remove_pairing';
      data: {
        macaddr: string;
      };
    }
  | {
      type: 'accept_pairing';
      data: {
        macaddr: string;
      };
    };

export type IDatabaseQuery =
  | {
      type: 'request';
      requestFor: 'quizzes';
    }
  | {
      type: 'request';
      requestFor: 'latest-quizzes';
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
    }
  | {
      type: 'insert';
      insertFor: 'room';
      quizId: number;
    }
  | {
      type: 'insert';
      insertFor: 'answers';
      answers: IAnswer[];
    };
