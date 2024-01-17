import { useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/menuview/Home';
import Quizzes from './pages/menuview/Quizzes';
import Reports from './pages/menuview/Reports';
import Settings from './pages/menuview/Settings';
import QuizInit from './pages/quiz/QuizInit';
import QuizQuestion from './pages/quiz/QuizQuestion';
import QuizEnd from './pages/quiz/QuizEnd';

import { IPageNames } from './types';

import './globals.css';
import './fonts.css';
import 'tailwindcss/tailwind.css';

function Renderer() {
  const [currentPage, setCurrentPage] = useState<IPageNames>('home');
  // const [selectedQuiz, setSelectedQuiz] = useState<IQuiz>({} as IQuiz);

  if (currentPage === 'quizzes')
    return <Quizzes setCurrentPage={setCurrentPage} />;
  if (currentPage === 'reports')
    return <Reports setCurrentPage={setCurrentPage} />;
  if (currentPage === 'settings')
    return <Settings setCurrentPage={setCurrentPage} />;
  if (currentPage === 'home')
    return <Home setCurrentPage={setCurrentPage} />;
  if (currentPage === 'quizinit')
    return <QuizInit setCurrentPage={setCurrentPage} />;
  if (currentPage === 'quizquestion')
    return <QuizQuestion setCurrentPage={setCurrentPage} />;
  if (currentPage === 'quizend')
    return <QuizEnd setCurrentPage={setCurrentPage} />;

  return <Home setCurrentPage={setCurrentPage} />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Renderer />} />
      </Routes>
    </Router>
  );
}
