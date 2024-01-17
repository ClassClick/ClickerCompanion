import React from 'react';
import '../../globals.css';
import '../../fonts.css';
import 'tailwindcss/tailwind.css';

type IProps = {
  name: String;
  children: React.ReactNode;
};

export default function ReportList({ name, children }: IProps) {
  return (
    <div className="flex flex-col w-[100%] pt-2">
      <p className="flex justify-center text-[24px] mb-4">{name}</p>
      <div className="flex-grow overflow-y-scroll">
        <div className="flex flex-col max-h-screen">
          <div className="flex flex-col flex-wrap gap-[19px] p-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
