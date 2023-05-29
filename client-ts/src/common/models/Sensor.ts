// Model do back
import { Socket } from 'socket.io-client';
import { GyroMeasurement } from 'src/common/models/GyroMeasurement';

export interface SensorBean {
  id?: number; // TODO: nunca setar id de nenhum bean no front, ação apenas deve ser realizada no back
  sensorName?: string;
  position?: string;
  type?: string; // TODO: por default é GYROSCOPE
}
//
export interface SensorMetadata {
  sensorSocketId?: string;
  origin?: string;
  ip?: string;
  uuid?: string;
  available?: boolean;
  started?: boolean;
  socket: Socket;
  cmd?: string;
  room?: string;
}
// Objeto retornado pelo backend pelo socket
export interface SensorSocket {
  id?: string;
  ip?: string;
  uuid?: string;
  origin?: string;
  sensorName?: string;
  available?: boolean;
  started?: boolean;
  room?: string;
  ssid?: string;
  password?: string;
  backend?: string;
  backendPort?: string;
  //
  type?: string;
  measurements?: GyroMeasurement;
}
