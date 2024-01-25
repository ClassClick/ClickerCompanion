/* eslint-disable max-classes-per-file */

import React from 'react';
// eslint-disable-next-line import/no-cycle
import { IAnswer, IDevice, SerialClickerEvent, SerialHubEvent } from './types';

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
  // private static _instance: SerialHelper;

  private serialPort: SerialPort | null = null;

  private inputStream: ReadableStream<any> | null = null;

  private inputDone: Promise<void> | null = null;

  private outputStream: WritableStream<string> | null = null;

  private outputDone: Promise<void> | null = null;

  private reader: ReadableStreamDefaultReader<any> | null = null;

  public connectedDevices: IDevice[] = [];

  public foundDevices: IDevice[] = [];

  public connected: boolean = false;

  private foundDeviceCallback: React.Dispatch<
    React.SetStateAction<IDevice[]>
  > | null = null;

  private connectedDeviceCallback: React.Dispatch<
    React.SetStateAction<IDevice[]>
  > | null = null;

  public answers: IAnswer[] = [];

  private roomId: number = 0;

  private questionId: number = 0;

  constructor() {}

  setStateFunctions(
    _connectedDeviceCallback: React.Dispatch<React.SetStateAction<IDevice[]>>,
    _foundDeviceCallback: React.Dispatch<React.SetStateAction<IDevice[]>>,
  ) {
    this.connectedDeviceCallback = _connectedDeviceCallback;
    this.foundDeviceCallback = _foundDeviceCallback;
  }

  newQuiz() {
    this.roomId = 0;
    this.questionId = 0;
    this.answers = [];
  }

  setCurrentRoomId(roomId: number) {
    this.roomId = roomId;
  }

  setCurrentQuestionId(questionId: number) {
    this.questionId = questionId;
  }

  async connect() {
    if (this.serialPort !== null) {
      this.serialPort.close();
      this.serialPort = null;
    }

    try {
      this.serialPort = await navigator.serial.requestPort();
    } catch (err) {
      return;
    }

    try {
      await this.serialPort.open({ baudRate: 115200 });
    } catch (err) {
      return;
    }

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

    this.connectedDevices = [];
    this.foundDevices = [];

    if (this.connectedDeviceCallback != null)
      this.connectedDeviceCallback(this.connectedDevices);
    if (this.foundDeviceCallback != null)
      this.foundDeviceCallback(this.foundDevices);

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
          } as SerialHubEvent),
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
    if (this.connectedDeviceCallback != null)
      this.connectedDeviceCallback(this.connectedDevices);
    if (this.foundDeviceCallback != null)
      this.foundDeviceCallback(this.foundDevices);
  }

  private async readLoop() {
    if (!this.reader) return;

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

  private handleEvent(event: SerialClickerEvent) {
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

        if (this.connectedDeviceCallback != null) {
          this.connectedDeviceCallback(this.connectedDevices);
        }
        if (this.foundDeviceCallback != null) {
          this.foundDeviceCallback(this.foundDevices);
        }
        break;
      case 'answer':
        this.answers.push({
          question_id: this.questionId,
          room_id: this.roomId,
          device_id: event.data.id,
          timeToAnswer: new Date(event.data.timeToAnswer),
          answer: event.data.answer,
        } as IAnswer);
        break;
      case 'power_status':
        break;
      default:
        break;
    }
  }

  public showAnswer(answer: number) {
    this.writeToStream(
      JSON.stringify({
        type: 'end_question',
        data: {
          correct_answer: answer,
        },
      } as SerialHubEvent),
    );
  }

  public askQuestion(answers: number) {
    this.writeToStream(
      JSON.stringify({
        type: 'new_question',
        data: {
          amount_answers: answers,
        },
      } as SerialHubEvent),
    );
  }

  public resetQuestion() {
    this.writeToStream(
      JSON.stringify({
        type: 'new_question',
        data: {
          amount_answers: 0,
        },
      } as SerialHubEvent),
    );
  }

  public pairDevice(id: number) {
    if (this.connectedDevices.some((obj) => obj.id === id)) return;
    if (!this.foundDevices.some((obj) => obj.id === id)) return;

    const device: IDevice | undefined = this.foundDevices.find(
      (obj) => obj.id === id,
    );

    if (device) {
      this.writeToStream(
        JSON.stringify({
          type: 'accept_pairing',
          data: {
            macaddr: device.mac_address,
          },
        } as SerialHubEvent),
      );

      this.connectedDevices.push(device as IDevice);
      this.foundDevices = this.foundDevices.filter((obj) => obj.id !== id);

      if (this.connectedDeviceCallback != null)
        this.connectedDeviceCallback(this.connectedDevices);
      if (this.foundDeviceCallback != null)
        this.foundDeviceCallback(this.foundDevices);
    }
  }

  public removeDevice(id: number) {
    if (!this.connectedDevices.some((obj) => obj.id === id)) return;

    const device: IDevice | undefined = this.connectedDevices.find(
      (obj) => obj.id === id,
    );

    if (device) {
      this.writeToStream(
        JSON.stringify({
          type: 'remove_pairing',
          data: {
            macaddr: device.mac_address,
          },
        } as SerialHubEvent),
      );

      this.connectedDevices = this.connectedDevices.filter(
        (obj) => obj.id !== id,
      );

      if (this.connectedDeviceCallback != null)
        this.connectedDeviceCallback(this.connectedDevices);
      if (this.foundDeviceCallback != null)
        this.foundDeviceCallback(this.foundDevices);
    }
  }
}
