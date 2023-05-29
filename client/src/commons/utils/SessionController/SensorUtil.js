import _ from "lodash";
import { GyroMeasurement } from "src/commons/utils/SessionController/GyroMeasurementUtil";

class Sensor {
  // Bean
  sensorName = "";
  position = null;
  gyro_measurements = [];

  // Metadata
  ip = "";
  id = "";
  origin = "";
  uuid = "";
  available = false;
  counter = null;
  cmd = "";
  started = false;
  socket = null;
  room = null;
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

  constructor(sensor, socket) {
    this.uuid = sensor.uuid;
    this.ip = sensor.ip;
    this.id = sensor.id;
    this.origin = sensor.origin;
    this.sensorName = sensor.sensorName;
    this.available = sensor.available;
    this.counter = sensor.counter;
    this.socket = socket;

    this.socket.addEventListener(`measurements-${this.id}`, (arg) => {
      console.log("aqui", arg);
    });
    this.socket.addEventListener(`remove-${this.id}`, (arg) => {
      console.log("aqui", arg);
    });
    this.socket.addEventListener(`update-${this.id}`, (sensor) => this.update(sensor));
  }

  calibrate() {
    this.socket.emit("stop-all-room");
  }

  restart() {
    this.socket.emit("stop-all-room");
    // TODO limpar medições
  }

  disconnect() {
    this.socket.emit("stop-all-room");
    this.socket.emit("remove-listener");
  }

  connect() {
    console.log("id:", this.id);
    this.socket.emit("register-listener", this.id);
  }

  update(sensor) {
    console.log("update");
    this.ip = sensor.ip;
    this.id = sensor.id;
    this.sensorName = sensor.sensorName;
    this.counter = sensor.counter;
    this.available = sensor.available;
    this.started = sensor.started;
    this.room = sensor.room;
  }

  addMeasurement(measurement) {
    this.gyro_measurements.push(new GyroMeasurement(measurement));
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
    return this.notNull && this.gyro_measurements.every((gm) => gm.valid);
  }
}

export { Sensor };
