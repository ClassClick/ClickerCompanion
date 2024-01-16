/* eslint-disable max-classes-per-file */

import { IDevice } from './types';

/**
 * @name LineBreakTransformer
 * TransformStream to parse the stream into lines.
 */
class LineBreakTransformer {
  public container: any;

  constructor() {
    this.container = '';
  }

  transform(chunk: any, controller: { enqueue: (arg0: any) => any }) {
    this.container += chunk;
    const lines = this.container.split('\r\n');
    this.container = lines.pop();
    lines.forEach((line: any) => controller.enqueue(line));
  }

  flush(controller: { enqueue: (arg0: any) => void }) {
    controller.enqueue(this.container);
  }
}

/**
 * @name JSONTransformer
 * TransformStream to parse the stream into a JSON object.
 */
class JSONTransformer {
  // eslint-disable-next-line class-methods-use-this
  transform(chunk: string, controller: { enqueue: (arg0: any) => void }) {
    try {
      controller.enqueue(JSON.parse(chunk));
    } catch (e) {
      controller.enqueue(chunk);
    }
  }
}

/**
 * @name SerialHelper
 * Does all things serial :*((
 */
export default class SerialHelper {
  private static _instance: SerialHelper;

  private serialPort: SerialPort | null = null;

  private inputStream: ReadableStream<any> | null = null;

  private inputDone: Promise<void> | null = null;

  private outputStream: WritableStream<string> | null = null;

  private outputDone: Promise<void> | null = null;

  private reader: ReadableStreamDefaultReader<any> | null = null;

  private connectedDevices: IDevice[] = [];

  private foundDevices: IDevice[] = [];

  public connected: boolean = false;

  constructor() {}

  async connect() {
    this.serialPort = await navigator.serial.requestPort();
    await this.serialPort.open({ baudRate: 115200 });

    const encoder = new TextEncoderStream();
    this.outputDone = encoder.readable.pipeTo(this.serialPort.writable);
    this.outputStream = encoder.writable;

    const decoder = new TextDecoderStream();
    this.inputDone = this.serialPort.readable.pipeTo(decoder.writable);
    this.inputStream = decoder.readable
      .pipeThrough(new TransformStream(new LineBreakTransformer()))
      .pipeThrough(new TransformStream(new JSONTransformer()));

    this.reader = this.inputStream.getReader();

    this.connected = true;
    this.readLoop();
  }

  async disconnect() {
    if (this.reader) {
      await this.reader.cancel();
      await this.inputDone?.catch(() => {});

      this.reader = null;
      this.inputDone = null;
    }
    if (this.outputStream) {
      this.connectedDevices.forEach((device) => {
        this.writeToStream(
          JSON.stringify({
            type: 'remove_pairing',
            data: { macaddr: device.mac_address },
          } as ClickerEvent),
        );
      });

      await this.outputStream.getWriter().close();
      await this.outputDone;
      this.outputStream = null;
      this.outputDone = null;
      this.connectedDevices = [];
    }

    if (this.serialPort) {
      await this.serialPort.close();
      this.serialPort = null;
    }

    this.connected = false;
  }

  private async readLoop() {
    if (!this.reader) return;

    console.log('test');
    while (this.connected) {
      // eslint-disable-next-line no-await-in-loop
      const { value, done } = await this.reader.read();
      if (value) {
        console.log(value);
        this.handleEvent(value);
      }
      if (done) {
        this.reader.releaseLock();
        break;
      }
    }
  }

  private writeToStream(...lines: any[]) {
    if (!this.outputStream) return;
    const writer = this.outputStream.getWriter();
    lines.forEach((line) => {
      writer.write(`${line}\n`);
    });
    writer.releaseLock();
  }

  private handleEvent(event: HubEvent) {
    switch (event.type) {
      case 'pairing':
        if (
          this.foundDevices.some((obj) => obj.id === event.data.id) ||
          this.connectedDevices.some((obj) => obj.id === event.data.id)
        )
          return;

        this.foundDevices.push({
          id: event.data.id,
          mac_address: event.data.macaddr,
        } as IDevice);
        // TODO: trigger a rerender in react :3
        break;
      case 'answer':
        break;
      case 'power_status':
        break;
    }
  }

  public peerDevice(id: number) {
    if (this.connectedDevices.some((obj) => obj.id === id)) return;
    if (!this.foundDevices.some((obj) => obj.id === id)) return;

    let device: IDevice | undefined = this.foundDevices.find(
      (obj) => obj.id === id,
    );

    if (device) {
      this.writeToStream(
        JSON.stringify({
          type: 'accept_pairing',
          data: {
            macaddr: device.mac_address,
          },
        } as ClickerEvent),
      );

      this.connectedDevices.push(device as IDevice);
      this.foundDevices = this.foundDevices.filter((obj) => obj.id !== id);
      // TODO: trigger a rerender in react :3
    }
  }
}

type HubEvent =
  | {
      type: 'pairing';
      data: {
        id: Number;
        macaddr: string;
      };
    }
  | {
      type: 'answer';
      data: { id: Number; timeToAnswer: Number; answer: Number };
    }
  | {
      type: 'power_status';
      data: {
        id: Number;
        isCharging: boolean;
        usbPowerConnected: boolean;
        batteryVoltage: Number;
      };
    };

type ClickerEvent =
  | {
      type: 'set_id';
      data: {
        id: Number;
      };
    }
  | {
      type: 'end_question';
      data: {
        correct_answer: Number;
      };
    }
  | {
      type: 'new_question';
      data: {
        amount_answers: Number;
      };
    }
  | {
      type: 'remove_pairing';
      data: {
        macaddr: string;
      };
    }
  | {
      type: 'accept_pairing';
      data: {
        macaddr: string;
      };
    };
