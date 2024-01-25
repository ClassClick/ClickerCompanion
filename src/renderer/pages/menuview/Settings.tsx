import '../../globals.css';
import '../../fonts.css';
import 'tailwindcss/tailwind.css';
import React from 'react';
import { Props } from '../../types';

import MenuWrapper from '../../components/menuview/MenuWrapper';

export default function Settings({ setCurrentPage, serial }: Props) {
  return (
    <MenuWrapper serial={serial} setCurrentPage={setCurrentPage}>
      <p>settings settings</p>
    </MenuWrapper>
  );
}
