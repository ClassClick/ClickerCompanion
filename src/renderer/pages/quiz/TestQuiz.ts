import { IQuestion, IQuiz } from '../../types';

export const TestQuiz: IQuiz = {
  id: 1,
  title: 'TestQuiz',
  description: 'kut kut kut kut kut quiz',
  created_at: new Date(1705522956),
  updated_at: new Date(1705522989),
};

export const TestQuizQuestions: IQuestion[] = [
  {
    id: 1,
    quiz_id: 1,
    question: 'Wie Wat Waar Hoe?',
    answer_1: 'ja',
    answer_2: 'nee',
    answer_3: 'misschien',
    answer_4: 'uiteraard',
    answer: 4,
  },
  {
    id: 2,
    quiz_id: 1,
    question: 'Hoe gay?',
    answer_1: 'ja',
    answer_2: 'nee',
    answer_3: 'jeroen',
    answer_4: 'manu',
    answer: 3,
  },
  {
    id: 3,
    quiz_id: 1,
    question: 'Je moeder of Je vader',
    answer_1: 'moeder',
    answer_2: 'vader',
    answer_3: null,
    answer_4: null,
    answer: 2,
  },
];
