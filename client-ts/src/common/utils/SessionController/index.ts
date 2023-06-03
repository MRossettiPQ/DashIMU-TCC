import { io, Socket } from 'socket.io-client';
import { NavigationUtil } from 'src/common/utils/SessionController/NavigationUtil';
import { SessionUtil } from 'src/common/utils/SessionController/SessionUtil';
import { SensorUtil } from 'src/common/utils/SessionController/SensorUtil';
import NotifyUtils from 'src/common/utils/NotifyUtils';
import { MovementUtil } from 'src/common/utils/SessionController/MovementUtil';
import { Patient } from 'src/common/models/Patient';
import { Metadata } from 'src/common/models/Metadata';
import { ProcedureUtil } from './ProcedureUtil';
import { SensorSocket } from 'src/common/models/Sensor';
import dayjs from 'dayjs';
import Timeout = NodeJS.Timeout;
import { BlobDownloader, ExportCSV } from 'src/common/utils/CSVUtils';

const openMessage = '[WebSocket] Conexão com o sensor feita com websocket';
const closeMessage = '[WebSocket] Websocket desconectado do servidor';

class BackEndSocketUtil {
  // Sensores disponíveis para conexão
  availableSensorsList: SensorUtil[] = [];
  loadingSensors = false;
  // Endereço do backend
  socket: Socket = io({
    autoConnect: false,
  });
  // Callback para quando receber notificação de desconexão
  onDisconnect?: (params: unknown[]) => void;

  get connected() {
    return this.socket?.connected;
  }

  constructor(onDisconnect: (params: unknown[]) => void) {
    if (typeof onDisconnect === 'function') {
      this.onDisconnect = onDisconnect;
    }
  }

  // Conectar ao socket do backend, permite receber lista de sensores disponíveis e notificações de desconexões (caso o socket do client não perceba)
  connect(socket_url = 'localhost:8000') {
    this.socket = io(`ws://${socket_url}`, {
      path: '/socket/',
      reconnectionDelay: 15000,
    });

    this.socket.on('connect', () => {
      this.socket.emit('get-sensor-list');
      this.socket.emit('register-client');
      NotifyUtils.notifySuccess(openMessage);
    });

    this.socket.on('disconnect', () => {
      NotifyUtils.notifyError(closeMessage);
    });

    this.socket.on('error-event', (msg) => {
      NotifyUtils.notifyError(msg);
    });

    this.socket.on('sensor-list', (json) => {
      this.loadingSensors = false;
      this.mergeSensorList(json.data.list);
    });

    this.socket.connect();
  }

  disconnect() {
    if (this.connected) {
      this.socket.close();
    }
  }

  // Solicita a lista de sensores disponíveis
  requestAvailableSensors() {
    this.loadingSensors = true;
    this.socket.emit('get-sensor-list', {
      origin: 'FRONT',
      type: 'GET_UPDATE_CLIENT_LIST',
    });
  }

  mergeSensorList(array: SensorSocket[]) {
    console.log(array);
    for (const sensor of array) {
      const index = this.availableSensorsList.findIndex(
        (s) => s.ip === sensor.ip
      );
      if (index === -1) {
        this.availableSensorsList.push(new SensorUtil(sensor, this.socket));
      } else if (index >= 0) {
        this.availableSensorsList[index].update(sensor);
      }
    }
  }

  // Todos sensores conectados a sessão, aqueles que irão receber os comandos e enviar as leituras
  get registeredSensorsList(): SensorUtil[] {
    return this.availableSensorsList.filter((s) => !s.connected);
  }

  get measurements(): string {
    return this.registeredSensorsList
      ?.map((s: SensorUtil) => s?.gyro_measurements?.length)
      ?.join(' - ');
  }

  devSensor(sensorN = 12) {
    function generator(id: number, sensorName: string) {
      return {
        id,
        sensorName,
        Acc_X: getRandomArbitrary(0, 90),
        Acc_Y: getRandomArbitrary(0, 90),
        Acc_Z: getRandomArbitrary(0, 90),
        AccelX_mss: getRandomArbitrary(0, 90),
        AccelY_mss: getRandomArbitrary(0, 90),
        AccelZ_mss: getRandomArbitrary(0, 90),
        Euler_X: getRandomArbitrary(0, 90),
        Euler_Y: getRandomArbitrary(0, 90),
        Euler_Z: getRandomArbitrary(0, 90),
        Gyr_X: getRandomArbitrary(0, 90),
        Gyr_Y: getRandomArbitrary(0, 90),
        Gyr_Z: getRandomArbitrary(0, 90),
        Mag_X: getRandomArbitrary(0, 90),
        Mag_Y: getRandomArbitrary(0, 90),
        Mag_Z: getRandomArbitrary(0, 90),
        hourMensuration: '',
        Pitch: getRandomArbitrary(0, 90),
        Yaw: getRandomArbitrary(0, 90),
        Roll: getRandomArbitrary(0, 90),
        numberMensuration: id,
        Quaternion_W: getRandomArbitrary(0, 90),
        Quaternion_X: getRandomArbitrary(0, 90),
        Quaternion_Y: getRandomArbitrary(0, 90),
        Quaternion_Z: getRandomArbitrary(0, 90),
      };
    }

    function getRandomArbitrary(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    if (this.registeredSensorsList.length === 0) {
      let addIterator = 0;
      while (addIterator < sensorN) {
        const id = this.registeredSensorsList?.length;
        const sensorName = `SENSOR_${id}`;
        let measurementIterator = 0;
        const measurements = [];
        while (measurementIterator < 50) {
          measurements.push(generator(measurementIterator, sensorName));
          measurementIterator++;
        }

        const sensorInfo: SensorSocket | SensorUtil = {
          id: 's' + id,
          ip: `192.159.13.${id}`,
          backend: '192.159.13.16',
          backendPort: '8000',
          sensorName,
          type: 'SENSOR',
          ssid: '',
          password: '',
          available: false,
          started: false,
          room: this.socket.id,
        };
        const sensor = new SensorUtil(sensorInfo, this.socket);
        sensor.position = '';
        // sensor.addListMeasurements(measurements);
        this.availableSensorsList.push(sensor);
        addIterator++;
      }
    } else {
      this.registeredSensorsList.map((sensor: SensorUtil) => {
        let measurementIterator = 0;
        const measurements = [];
        while (measurementIterator < 50) {
          const n = sensor.gyro_measurements?.length || 0;
          measurements.push(
            generator(n + measurementIterator, sensor?.sensorName || '')
          );
          measurementIterator++;
        }
        sensor.addListMeasurements(measurements);
      });
    }
  }
}

class SessionController {
  navigation = new NavigationUtil();
  sockets = new BackEndSocketUtil(() => {
    this.stop();
  });
  bean: SessionUtil = new SessionUtil(); // Esse objeto deve ser enviado para criar a sessão
  csv: ExportCSV = new ExportCSV();

  temp = null;

  // Procedimentos, Url Socket etc
  metadata?: Metadata;
  // Infos do paciente
  patient?: Patient;

  saving = false;
  smooth = false; // Echart option

  toggleSmooth() {
    this.smooth = !this.smooth;
    console.log('toggleSmooth', this.smooth);
  }

  print() {
    // Realiza impressão do bean no console do navegador, desabilitar botão quando não estiver em dev
    console.dir(this.bean);
  }

  setPatientId(id: number) {
    // Seta o id do paciente no bean (sessão)
    this.bean.patientId = Number(id);
  }

  setMetadata(metadata: Metadata) {
    // Seta o metadata para sessões. ip da maquina do backend por ex.
    this.metadata = metadata;
  }

  setPatient(patient: Patient) {
    // Seta o paciente da sessão, para metadata. caso necessite exibir alguma informação.
    this.patient = patient;
  }

  get disableNext() {
    // Desabilita navegação para o next, considerando o passo da sessão
    const proceduresNotNullAndMovementsNotNull = !(
      this.bean.notEmpty &&
      this.bean.procedures.every(
        (p: ProcedureUtil) =>
          p.notNull &&
          p.notEmpty &&
          p.movements.every((m: MovementUtil) => m.notNull)
      )
    );
    switch (this.navigation.actualStepOrder) {
      case 0:
        // Bloqueia a navegação para o proximo caso não tenha adicionado o/os procedimentos e os movimentos que vão ser realizados
        // return !this.navigation.validNext || !this.bean.proceduresNotNullAndMovementsNotNull;
        return (
          !this.navigation.validNext || proceduresNotNullAndMovementsNotNull
        );
      case 1:
        // Bloqueia a navegação para o proximo caso não tenha adicionado o/os procedimentos que vão ser realizados
        return (
          !this.navigation.validNext || proceduresNotNullAndMovementsNotNull
          // || !this.backEndSocket.allConnectedAndPositioned
        );
      case 2:
        // Bloqueia a navegação para o proximo caso não tenha adicionado o/os procedimentos que vão ser realizados
        return !this.navigation.validNext;
      default:
        return !this.navigation.validNext;
    }
  }

  get disablePrev() {
    // Desabilita navegação para o prev, considerando o passo da sessão
    return this.navigation.actualStepOrder === 0;
  }

  get disableStartBtn() {
    // Desabilita comando de start
    return false;
  }

  get disableStopBtn() {
    // Desabilita comando de stop
    return false;
  }

  get disableRestartBtn() {
    // Desabilita comando de restart
    return false;
  }

  get disableAddMeasurement() {
    // Desabilita comando de restart
    return false;
  }

  get showCommandMenu() {
    // Exibe o menu de comandos dos sensores (start, stop, restart)
    return this.navigation.actualStepAction === 'receiver-measurements' || true;
  }

  get numberOfValidConnection() {
    // Computado com o numero de conexões a sensores considerada válida
    return this.sockets.registeredSensorsList.length;
  }

  get inDev() {
    return process.env.DEV;
  }

  useAlarm = false;
  alarmTimer = 0;
  time?: string;
  runTimer = 0; // Tempo rodando
  timeout?: Timeout; // Set timeout do tempo rodando

  get timeRunning() {
    return this.time;
  }

  start() {
    // Envia o comando de start para todos os sensores conectados
    console.log('start todos');
    this.runTimer = 0;
    this.timeout = setInterval(() => {
      this.runTimer = this.runTimer + 1;
      this.time = dayjs()
        .set('hour', 0)
        .set('minute', 0)
        .set('second', this.runTimer)
        .format('HH:mm:ss');
      console.log(this.time);
      if (this.useAlarm) {
        if (this.runTimer >= this.alarmTimer) {
          this.stop();
          this.useAlarm = false;
          this.alarmTimer = 0;
        }
      }
    }, 1000);
    this.sockets.socket.emit('start-all-room');
  }

  restart() {
    // Envia o comando de start para todos os sensores conectados
    console.log('restart todos');
    this.sockets.socket.emit('restart-all-room');
    this.stop();
  }

  stop() {
    if (this.timeout) {
      // Envia o comando de stop para todos os sensores conectados
      console.log('stop todos');
      clearTimeout(this.timeout);
      this.time = '';
      this.runTimer = 0;

      this.sockets.socket.emit('stop-all-room');
    }
  }

  save() {
    // Salva o bean da sessão
    try {
      this.saving = true;
    } catch (e) {
      console.log(e);
    } finally {
      this.saving = false;
    }
  }

  async beforeUnmount() {
    // Desconecta de qualquer socket ainda conectado
    this.stop();
    this.sockets.disconnect();
  }

  addMeasurement() {
    console.log();
  }

  applyMeasurement(procedureIndex: number, movementIndex: number) {
    console.log(procedureIndex, movementIndex, this.bean);
    this.bean.procedures[procedureIndex].movements[movementIndex].sensors =
      this.sockets.registeredSensorsList;
  }

  export() {
    // this.applyMeasurement(0, 0);
    for (const procedure of this.bean.procedures) {
      if (procedure?.movements) {
        for (const movement of procedure.movements) {
          if (movement?.sensors) {
            for (const sensor of movement.sensors) {
              if (sensor?.gyro_measurements) {
                let fileName = '';
                if (typeof procedure?.procedure === 'string') {
                  fileName += procedure.procedure + '_';
                }
                if (typeof movement?.movement === 'string') {
                  fileName += movement.movement + '_';
                }
                if (typeof sensor.sensorName === 'string') {
                  fileName += sensor.sensorName + '_';
                }
                fileName += dayjs();
                this.csv.convertAndExport(sensor.gyro_measurements, fileName);
              }
            }
          }
        }
      }
    }
  }

  async exportJSON() {
    try {
      const blob = new BlobDownloader();
      blob.download(JSON.stringify(this.bean), 'Sessão', {
        type: 'application/json',
      });
    } catch (e) {
      console.log(e);
    }
  }
}

export { SessionController, BackEndSocketUtil };
