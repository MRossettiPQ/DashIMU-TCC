import _ from 'lodash';
import { GyroMeasurementUtil } from 'src/common/utils/SessionController/GyroMeasurementUtil';
import { Socket } from 'socket.io-client';
import {
  SensorBean,
  SensorMetadata,
  SensorSocket,
} from 'src/common/models/Sensor';
import { GyroMeasurement } from 'src/common/models/GyroMeasurement';

class SensorUtil implements SensorBean, SensorMetadata {
  // Bean
  sensorName?: string;
  position?: string;
  gyro_measurements?: GyroMeasurementUtil[] = [];

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
    // indisponivel e nessa sessão
    return !this.available && this.inThisRoom;
  }

  constructor(sensor: SensorSocket, socket: Socket) {
    this.uuid = sensor.uuid;
    this.ip = sensor.ip;
    this.sensorSocketId = sensor.id;
    this.origin = sensor.origin;
    this.sensorName = sensor.sensorName;
    this.available = sensor.available;
    this.socket = socket;

    this.socket.on(`measurements-${this.ip}`, (arg) => {
      console.log('aqui', arg);
    });
    this.socket.on(`remove-${this.ip}`, (arg) => {
      console.log('aqui', arg);
    });
    this.socket.on(`update-${this.ip}`, (sensor) => this.update(sensor));
  }

  calibrate() {
    this.socket.emit('stop-all-room');
  }

  restart() {
    this.socket.emit('stop-all-room');
    // TODO limpar medições
  }

  disconnect() {
    this.room = '';
    console.log('room', this.room);
    this.socket.emit('stop-all-room');
    this.socket.emit('remove-listener');
  }

  connect() {
    console.log('id:', this.sensorSocketId);
    this.socket.emit('register-listener', this.sensorSocketId);
  }

  update(sensor: SensorSocket) {
    console.log('update', sensor);
    this.ip = sensor.ip;
    this.sensorSocketId = sensor.id;
    this.sensorName = sensor.sensorName;
    this.available = sensor.available;
    this.started = sensor.started;
    this.room = sensor.room;
  }

  addMeasurement(measurement: GyroMeasurement) {
    this.gyro_measurements?.push(new GyroMeasurementUtil(measurement));
  }

  addListMeasurements(measurements: GyroMeasurement[]) {
    measurements.map((measurement: GyroMeasurement) =>
      this.addMeasurement(measurement)
    );
  }

  get size() {
    return this.gyro_measurements?.length || 0;
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
      this.gyro_measurements?.every((gm: GyroMeasurementUtil) => gm.valid)
    );
  }
}

export { SensorUtil };
