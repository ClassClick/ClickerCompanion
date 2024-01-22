import '../../globals.css';
import '../../fonts.css';
import 'tailwindcss/tailwind.css';
import React, { useEffect, useState } from 'react';
import { IQuiz, Props } from '../../types';

import MenuWrapper from '../../components/menuview/MenuWrapper';
import RecentList from '../../components/home/RecentList';
import RecentQuiz from '../../components/home/RecentQuiz';
import RecentReport from '../../components/home/RecentReport';
// eslint-disable-next-line import/no-cycle
import { getLatestQuizzes } from '../..';

export default function Home({
  setCurrentPage,
  serial,
  setSelectedQuiz,
}: Props) {
  const [quizzes, setQuizzes] = useState<IQuiz[]>([]);

  useEffect(() => {
    async function getQuizzes() {
      const ltsquizzes = await getLatestQuizzes();
      setQuizzes(ltsquizzes);
      console.log(ltsquizzes);
    }
    getQuizzes();
  }, []);

  return (
    <MenuWrapper serial={serial} setCurrentPage={setCurrentPage}>
      <div className="flex-1 flex flex-row ">
        <RecentList name="Recent Quizzes">
          {quizzes.map((quiz) => (
            <RecentQuiz
              quiz={quiz}
              setCurrentPage={setCurrentPage}
              setSelectedQuiz={setSelectedQuiz}
            />
          ))}
        </RecentList>

        <RecentList name="Recent Reports">
          <RecentReport
            name="Programming 2"
            time={new Date(1704921355000)}
            players={10}
          />
          <RecentReport
            name="Minecraft quiz"
            time={new Date(1704921355000)}
            players={10}
          />
          <RecentReport
            name="ClassClick Lore"
            time={new Date(1704921355000)}
            players={10}
          />
          <RecentReport
            name="Programming 2"
            time={new Date(1704921355000)}
            players={10}
          />
          <RecentReport
            name="Studentenverenigingen Delft"
            time={new Date(1704921355000)}
            players={10}
          />
          <RecentReport
            name="SecEs Week 9"
            time={new Date(1704921355000)}
            players={10}
          />
          <RecentReport
            name="Minecraft quiz"
            time={new Date(1704921355000)}
            players={10}
          />
          <RecentReport
            name="Databases"
            time={new Date(1704921355000)}
            players={10}
          />
          <RecentReport
            name="Programming 2"
            time={new Date(1704921355000)}
            players={10}
          />
          <RecentReport
            name="Programming 2"
            time={new Date(1704921355000)}
            players={10}
          />
          <RecentReport
            name="Programming 2"
            time={new Date(1704921355000)}
            players={10}
          />
          <RecentReport
            name="Programming 2"
            time={new Date(1704921355000)}
            players={10}
          />
        </RecentList>
      </div>
    </MenuWrapper>
  );
}
