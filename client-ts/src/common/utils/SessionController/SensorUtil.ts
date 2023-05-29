import _ from 'lodash';
import { GyroMeasurementUtil } from 'src/common/utils/SessionController/GyroMeasurementUtil';
import { Socket } from 'socket.io-client';
import {
  SensorBean,
  SensorMetadata,
  SensorSocket,
} from 'src/common/models/Sensor';

class SensorUtil implements SensorBean, SensorMetadata {
  // Bean
  sensorName?: string;
  position?: string;
  gyro_measurements: GyroMeasurementUtil[] = [];

  // Metadata
  ip?: string;
  sensorSocketId?: string;
  origin?: string;
  uuid?: string;
  available: boolean | undefined = false;
  cmd = '';
  started: undefined | boolean = false;
  socket: Socket;
  room?: string;
  //

  get inThisRoom() {
    return this.socket?.id === this.room;
  }

  get running() {
    return this.started;
  }

  get connected() {
    return !this.available;
  }

  constructor(sensor: SensorSocket, socket: Socket) {
    this.uuid = sensor.uuid;
    this.ip = sensor.ip;
    this.sensorSocketId = sensor.id;
    this.origin = sensor.origin;
    this.sensorName = sensor.sensorName;
    this.available = sensor.available;
    this.socket = socket;

    this.socket.on(`measurements-${this.sensorSocketId}`, (arg) => {
      console.log('aqui', arg);
    });
    this.socket.on(`remove-${this.sensorSocketId}`, (arg) => {
      console.log('aqui', arg);
    });
    this.socket.on(`update-${this.sensorSocketId}`, (sensor) =>
      this.update(sensor)
    );
  }

  calibrate() {
    this.socket.emit('stop-all-room');
  }

  restart() {
    this.socket.emit('stop-all-room');
    // TODO limpar medições
  }

  disconnect() {
    this.socket.emit('stop-all-room');
    this.socket.emit('remove-listener');
  }

  connect() {
    console.log('id:', this.sensorSocketId);
    this.socket.emit('register-listener', this.sensorSocketId);
  }

  update(sensor: SensorSocket) {
    console.log('update');
    this.ip = sensor.ip;
    this.sensorSocketId = sensor.id;
    this.sensorName = sensor.sensorName;
    this.available = sensor.available;
    this.started = sensor.started;
    this.room = sensor.room;
  }

  addMeasurement(measurement: GyroMeasurementUtil) {
    this.gyro_measurements.push(new GyroMeasurementUtil(measurement));
  }

  get size() {
    return this.gyro_measurements.length;
  }

  get notEmpty() {
    return !_.isEmpty(this.gyro_measurements);
  }

  get notNull() {
    return !_.isNil(this.ip) && !_.isNil(this.position);
  }

  get valid() {
    return (
      this.notNull &&
      this.gyro_measurements.every((gm: GyroMeasurementUtil) => gm.valid)
    );
  }
}

export { SensorUtil };
