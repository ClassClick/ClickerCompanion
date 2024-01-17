/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import 'src/renderer/globals.css';
import 'src/renderer/fonts.css';
import 'tailwindcss/tailwind.css';
import * as Icons from 'react-icons/bi';
import { IDevice } from '../../../types';
import SerialHelper from '../../../SerialHelper';

type IProps = {
  device: IDevice;
  serial: SerialHelper;
};

export default function ConnectedDevice({ device, serial }: IProps) {
  return (
    <div className="flex flex-row justify-between bg-[#000]/60 rounded-default h-[75px] min-h-[75px] max-h-[0%] min-w-[300px] w-[300px] mb-1 overflow-hidden">
      <div className="text-left ml-2 ">
        <p className="">{device.id.toString()}</p>
        <p className="text-gray_text">{device.mac_address}</p>
      </div>
      <div
        onClick={() => {
          serial?.removeDevice(device.id.valueOf());
        }}
        className="self-center flex items-center rounded-[5px] justify-center bg-[#f33] w-[50px] max-w-[50px] h-[50px] m-2 cursor-pointer transition-colors duration-150 ease-in-out hover:bg-[#ff6262] flex-shrink-0 "
      >
        <Icons.BiTrashAlt size={35} />
      </div>
    </div>
  );
}
