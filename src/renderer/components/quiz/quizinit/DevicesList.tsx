import React from 'react';
import 'src/renderer/globals.css';
import 'src/renderer/fonts.css';
import 'tailwindcss/tailwind.css';

type IProps = {
  name: String;
  children: React.ReactNode;
};

export default function DevicesList({ name, children }: IProps) {
  return (
    <div className="flex flex-col w-[330px] pt-2">
      <p className="flex justify-center text-[24px] mb-4">{name}</p>
      <div className="flex-grow overflow-y-scroll">
        <div className="flex flex-col">
          <div className="flex flex-col flex-wrap gap-[10px] p-4 items-center">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
