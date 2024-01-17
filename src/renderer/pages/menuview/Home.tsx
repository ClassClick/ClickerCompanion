import '../../globals.css';
import '../../fonts.css';
import 'tailwindcss/tailwind.css';
import React from 'react';
import { Props } from '../../types';

import MenuWrapper from '../../components/menuview/MenuWrapper';
import RecentList from '../../components/home/RecentList';
import RecentQuiz from '../../components/home/RecentQuiz';
import RecentReport from '../../components/home/RecentReport';

export default function Home({ setCurrentPage, serial }: Props) {
  return (
    <MenuWrapper serial={serial} setCurrentPage={setCurrentPage}>
      <div className="flex-1 flex flex-row ">
        <RecentList name="Recent Quizzes">
          <RecentQuiz
            name="Programming 2"
            desc="Java arrays lorem ipsum dolor sit amet bing chilling john cena"
            setCurrentPage={setCurrentPage}
          />
          <RecentQuiz
            name="Databases"
            desc="SQL kweeries"
            setCurrentPage={setCurrentPage}
          />
          <RecentQuiz
            name="NOVA Pubquiz"
            desc="Bijeenkomst quiz"
            setCurrentPage={setCurrentPage}
          />
          <RecentQuiz
            name="Gang Members"
            desc="Lore"
            setCurrentPage={setCurrentPage}
          />
          <RecentQuiz
            name="SecEs Week 9"
            desc="Wooclap L"
            setCurrentPage={setCurrentPage}
          />
          <RecentQuiz
            name="Fortnite balls"
            desc="peepeepoopoo"
            setCurrentPage={setCurrentPage}
          />
          <RecentQuiz
            name="Programming 2"
            desc="Java arrays lorem ipsum dolor sit amet bing chilling john cena"
            setCurrentPage={setCurrentPage}
          />
          <RecentQuiz
            name="Databases"
            desc="SQL kweeries"
            setCurrentPage={setCurrentPage}
          />
          <RecentQuiz
            name="NOVA Pubquiz"
            desc="Bijeenkomst quiz"
            setCurrentPage={setCurrentPage}
          />
          <RecentQuiz
            name="Gang Members"
            desc="Lore"
            setCurrentPage={setCurrentPage}
          />
          <RecentQuiz
            name="SecEs Week 9"
            desc="Wooclap L"
            setCurrentPage={setCurrentPage}
          />
          <RecentQuiz
            name="Fortnite balls"
            desc="peepeepoopoo"
            setCurrentPage={setCurrentPage}
          />
        </RecentList>

        <RecentList name="Recent Reports">
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
