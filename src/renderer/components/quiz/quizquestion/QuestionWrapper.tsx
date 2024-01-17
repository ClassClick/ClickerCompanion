import 'src/renderer/globals.css';
import 'src/renderer/fonts.css';
import 'tailwindcss/tailwind.css';
import React from 'react';

import PageWrapper from '../../PageWrapper';

type IProps = {
  children: React.ReactNode;
};


export default function QuestionWrapper({ children }: IProps) {
  return <PageWrapper>{children}</PageWrapper>;
}
