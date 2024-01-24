import { useEffect, useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/menuview/Home';
import Quizzes from './pages/menuview/Quizzes';
import Reports from './pages/menuview/Reports';
import Settings from './pages/menuview/Settings';
import QuizWrapper from './pages/quiz/QuizWrapper';

import { IDevice, IPageNames, IQuiz } from './types';
import SerialHelper from './SerialHelper';

import './globals.css';
import './fonts.css';
import 'tailwindcss/tailwind.css';

const serialHelper = new SerialHelper();

function Renderer() {
  const [currentPage, setCurrentPage] = useState<IPageNames>('home');

  const [selectedQuiz, setSelectedQuiz] = useState<IQuiz>({} as IQuiz);
  const [foundDevices, setFoundDevices] = useState<IDevice[]>([]);
  const [connectedDevices, setConnectedDevices] = useState<IDevice[]>([]);

  serialHelper.setStateFunctions(setConnectedDevices, setFoundDevices);

  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (currentPage === 'quizzes')
    return (
      <Quizzes
        setCurrentPage={setCurrentPage}
        setSelectedQuiz={setSelectedQuiz}
      />
    );
  if (currentPage === 'reports')
    return <Reports setCurrentPage={setCurrentPage} />;
  if (currentPage === 'settings')
    return <Settings setCurrentPage={setCurrentPage} />;
  if (currentPage === 'quiz')
    return (
      <QuizWrapper
        selectedQuiz={selectedQuiz}
        setFoundDevices={setFoundDevices}
        foundDevices={foundDevices}
        setConnectedDevices={setConnectedDevices}
        connectedDevices={connectedDevices}
        serial={serialHelper}
        setCurrentPage={setCurrentPage}
      />
    );

  return (
    <Home
      setSelectedQuiz={setSelectedQuiz}
      setCurrentPage={setCurrentPage}
      serial={serialHelper}
    />
  );
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
