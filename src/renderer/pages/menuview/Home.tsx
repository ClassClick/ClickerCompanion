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
            name="Studentenverenigingen Delft"
            desc="Sv Delft"
            setCurrentPage={setCurrentPage}
          />
          <RecentQuiz
            name="SecEs Week 9"
            desc="Wooclap 2"
            setCurrentPage={setCurrentPage}
          />
          <RecentQuiz
            name="Fortnite Battlepass"
            desc=""
            setCurrentPage={setCurrentPage}
          />
          <RecentQuiz
            name="Programming 2"
            desc="Java arrays lorem ipsum dolor sit amet di co sol do lor a med di ma"
            setCurrentPage={setCurrentPage}
          />
          <RecentQuiz
            name="Databases"
            desc="SQL kweeries"
            setCurrentPage={setCurrentPage}
          />
          <RecentQuiz
            name="Equinox quiz"
            desc="Bijeenkomst quiz"
            setCurrentPage={setCurrentPage}
          />
          <RecentQuiz
            name="ClassClick Lore"
            desc="Lore over CC"
            setCurrentPage={setCurrentPage}
          />
          <RecentQuiz
            name="SecEs Week 9"
            desc="Wooclap 3"
            setCurrentPage={setCurrentPage}
          />
          <RecentQuiz
            name="Minecraft quiz"
            desc="Het begin van Minecraft"
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
