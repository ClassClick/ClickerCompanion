/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import '../../globals.css';
import '../../fonts.css';
import 'tailwindcss/tailwind.css';
import { Props } from '../../types';

export default function Topbar({ serial }: Props) {
  return (
    <div className="flex h-[75px] bg-[#000]/60 backdrop-saturate-[80%] mt-4 mr-4 ml-2 mb-2 rounded-default items-center justify-between flex-shrink-0">
      <div className="p-3 mr-3 text-[18px]">
        <p>
          {serial?.connected
            ? 'ClassClicker is connected'
            : 'ClassClicker not connected'}
        </p>
      </div>
      <div className="flex flex-row">
        <div
          className={`rounded-[8px] p-3 mr-3 ${
            serial?.connected ? 'bg-[#0a0]' : 'bg-[#f33]'
          }`}
        >
          <p>{serial?.connected ? 'CONNECTED' : 'DISCONNECTED'}</p>
        </div>
        <div
          onClick={() => {
            if (serial?.connected) serial?.disconnect();
            else serial?.connect();
          }}
          className="rounded-[8px] bg-[#1af] p-3 mr-3 cursor-pointer transition-colors duration-250 ease-in-out hover:bg-[#45bdff] "
        >
          <p>{serial?.connected ? 'DISCONNECT' : 'CONNECT'}</p>
        </div>
      </div>
    </div>
  );
}
