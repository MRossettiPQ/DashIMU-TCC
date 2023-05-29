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
    });

    this.socket.on('connect', () => {
      this.socket.emit('get-sensor-list');
      this.socket.emit('register-client');
      NotifyUtils.notifySuccess(openMessage);
    });

    this.socket.on('disconnect', () => {
      NotifyUtils.notifyError(closeMessage);
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
  get registeredSensorsList() {
    return this.availableSensorsList.filter((s) => !s.connected);
  }
}

class SessionController {
  navigation = new NavigationUtil();
  backEndSocket = new BackEndSocketUtil(() => {
    this.stop();
  });
  bean: SessionUtil = new SessionUtil(); // Esse objeto deve ser enviado para criar a sessão
  // storage = new Storage();

  temp = null;

  // Procedimentos, Url Socket etc
  metadata?: Metadata;
  // Infos do paciente
  patient?: Patient;

  saving = false;

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

  get showCommandMenu() {
    // Exibe o menu de comandos dos sensores (start, stop, restart)
    return this.navigation.actualStepAction === 'receiver-measurements' || true;
  }

  get numberOfValidConnection() {
    // Computado com o numero de conexões a sensores considerada válida
    return this.backEndSocket.registeredSensorsList.length;
  }

  get inDev() {
    return process.env.DEV;
  }

  start() {
    // Envia o comando de start para todos os sensores conectados
    console.log('start todos');
    this.backEndSocket.socket.emit('start-all-room');
  }

  stop() {
    // Envia o comando de stop para todos os sensores conectados
    console.log('stop todos');
    this.backEndSocket.socket.emit('stop-all-room');
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
    this.backEndSocket.disconnect();
  }
}

export { SessionController, BackEndSocketUtil };
