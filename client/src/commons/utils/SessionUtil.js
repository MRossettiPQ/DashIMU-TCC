import _ from "lodash";
import { Notify } from "quasar";
import { v4 as uuid } from "uuid";

const openMessage = "[WebSocket] Conexão com o sensor feita com websocket";
const closeMessage = "[WebSocket] Websocket desconectado do servidor";
const errorMessage = "[WebSocket] Erro no servidor websocket";
// class CsvUtil {
//
// }

class Storage {}

class BackEndSocketUtil {
  // Sensores disponíveis para conexão
  availableSensorsList = [];
  connected = false;
  loadingSensors = false;
  // Endereço do backend
  url = "";
  socket = null;
  // Callback para quando receber notificação de desconexão
  onDisconnect = null;

  constructor(onDisconnect = null) {
    this.onDisconnect = onDisconnect;
  }

  connect(socket_url = "localhost:8000") {
    // Conectar ao socket do backend, permite receber lista de sensores disponíveis e notificações de desconexões (caso o socket do client não perceba)
    this.socket = new WebSocket(`ws://${socket_url}/socket`, ["websocket"]);

    this.socket.onmessage = (event) => {
      this.handleMessage(JSON.parse(event?.data));
    };

    this.socket.onopen = () => {
      // Solicita a lista de sensores disponíveis
      this.connected = true;
      this.requestAvailableSensors();
      this.notify(openMessage, "positive");
    };

    this.socket.onclose = () => {
      this.notify(closeMessage, "warning");
      this.connected = false;
    };

    this.socket.onerror = () => {
      this.notify(errorMessage, "error");
      this.socket.close();
      this.connected = false;
    };
  }

  disconnect() {
    //
    this.socket.close();
    this.connected = false;
  }

  requestAvailableSensors() {
    // Solicita a lista de sensores disponíveis
    this.send(this.socket, "GET_UPDATE_CLIENT_LIST");
    this.loadingSensors = true;
  }

  send(socket, type, message = null) {
    if (socket !== null) {
      socket.send(JSON.stringify({ origin: "FRONT", type, message }));
    }
  }

  handleMessage(json) {
    // Gerencia a mensagem baseado no tipo enviado pelo backend
    console.log("nova mensagem", json);
    switch (json?.type) {
      case "UPDATE_CLIENT_LIST":
        this.mergeSensorList(json?.message);
        this.loadingSensors = false;
        break;
      case "SENSOR_DISCONNECTED":
        this.checkIfSensorIsConnected(json?.message);
        break;
      default:
        break;
    }
  }

  checkIfSensorIsConnected(sensor) {
    // Notifica o usuario caso o sensor desconectado seja um conectado a sessão
    // Também chama o callback que comanda o stop a todos os sensores da sessão
    const result = this.getIndexSensorInConnectedList(sensor);
    if (result !== -1) {
      Notify.create({
        message: "Um sensor conectado a está sessão foi desconectado inesperadamente",
        textColor: "white",
        color: "error",
      });
      // this.stop();
      this.onDisconnect?.();
    }
  }

  getIndexSensorInConnectedList(sensor) {
    return this.registeredSensorsList?.findIndex((s) => s.uuid === sensor.uuid);
  }

  notify(message, color) {
    Notify.create({
      message,
      color,
      textColor: "white",
    });
  }

  mergeSensorList(jsonList) {
    return jsonList.filter((s) => !this.availableIps.includes(s.ip)).map((s) => this.availableSensorsList.push(new Sensor(s)));
  }

  get availableIps() {
    // Ips disponiveis, apenas para filtrar ao receber novos sensores
    return this.availableSensorsList.map((a) => a.ip);
  }

  get registeredSensorsList() {
    // Todos sensores conectados a sessão, aqueles que irão receber os comandos e enviar as leituras
    return this.availableSensorsList.filter((s) => !s.connected);
  }

  get allConnectedAndPositioned() {
    console.log(
      "allConnectedAndPositioned",
      this.registeredSensorsList,
      this.registeredSensorsList.every((rs) => rs.connectedAndPositioned)
    );
    return this.registeredSensorsList.every((rs) => rs.connectedAndPositioned);
  }
}

class NavigationUtil {
  selectedStep = null;

  // Declaração das etapas
  steps = [
    {
      order: 0,
      value: "first-step",
      label: "Selecionar procedimento",
      action: "select-procedures",
      next_icon: "arrow_forward_ios",
    },
    {
      order: 1,
      value: "second-step",
      label: "Ativar sensores",
      action: "connect-sensors",
      next_icon: "arrow_forward_ios",
    },
    {
      order: 2,
      value: "third-step",
      label: "Captar medições",
      action: "receiver-measurements",
      next_icon: "save",
    },
  ];

  constructor() {
    this.selectedStep = this.steps[0];
  }

  get maxOrder() {
    return this.steps.length;
  }

  get actualStep() {
    return this.selectedStep;
  }

  get actualStepOrder() {
    return this.actualStep?.order;
  }

  get actualStepAction() {
    return this.actualStep?.action;
  }

  get actualNextIcon() {
    return this.actualStep?.next_icon;
  }

  get actualStepValue() {
    return this.actualStep?.value;
  }

  get actualStepLabel() {
    return this.actualStep?.label;
  }

  get validNext() {
    return this.actualStepOrder < this.maxOrder;
  }

  get validPrev() {
    return this.actualStepOrder >= 0;
  }

  next() {
    if (this.validNext) {
      switch (this.actualStepOrder) {
        case 0:
        case 1:
        case 2:
          this.nextStep();
          break;
      }
    }
  }

  nextStep() {
    this.selectedStep = this.steps.find(({ order }) => order === this.selectedStep?.order + 1);
  }

  prev() {
    if (this.validPrev) {
      switch (this.actualStepOrder) {
        case 0:
          break;
        case 1:
        case 2:
          this.prevStep();
          break;
      }
    }
  }

  prevStep() {
    this.selectedStep = this.steps.find(({ order }) => order === this.selectedStep?.order - 1);
  }
}

class GyroMeasurement {
  uuid = "";

  constructor(measurement = null) {
    if (!_.isNil(measurement)) {
      this.setData(measurement);
      this.uuid = uuid(null, null, null);
    }
  }

  get valid() {
    return false;
  }

  setData(measurement) {
    this.sensorName = measurement.sensorName;
    this.numberMensuration = measurement.numberMensuration;
    this.hourMensuration = measurement.hourMensuration;
  }

  sensorName = null;
  numberMensuration = null;
  hourMensuration = null;
  //
  Acc_X = null;
  Acc_Y = null;
  Acc_Z = null;
  //
  AccelX_mss = null;
  AccelY_mss = null;
  AccelZ_mss = null;
  //
  Gyr_X = null;
  Gyr_Y = null;
  Gyr_Z = null;
  //
  Mag_X = null;
  Mag_Y = null;
  Mag_Z = null;
  //
  Roll = null;
  Pitch = null;
  Yaw = null;
  //
  Euler_X = null;
  Euler_Y = null;
  Euler_Z = null;
  //
  Quaternion_X = null;
  Quaternion_Y = null;
  Quaternion_Z = null;
  Quaternion_W = null;
}

class Sensor {
  // Bean
  sensorName = "";
  position = null;
  gyro_measurements = [];

  // Metadata
  ip = "";
  origin = "";
  uuid = "";
  available = false;
  measurementInProgress = false;

  socket = null;

  constructor(sensor) {
    this.uuid = sensor.uuid;
    this.ip = sensor.ip;
    this.origin = sensor.origin;
    this.sensorName = sensor.sensorName;
    this.available = sensor.available;
  }

  get connected() {
    return this.socket?.readyState === 1;
  }

  connect() {
    // Configura a conexão com o sensor
    this.socket = new WebSocket(`ws://${this.ip}:80/socket/session`, ["websocket"]);

    this.socket.onmessage = (event) => {
      console.log(event);
      // this.handleMessage(JSON.parse(event?.data));
    };

    this.socket.onopen = () => {
      this.available = false;
      console.log("onopen");
      // this.send(this.socket, "GET_UPDATE_CLIENT_LIST");
      // this.notify(openMessage, "positive");
    };

    this.socket.onclose = () => {
      console.log("onclose");
      // this.notify(closeMessage, "warning");
      this.available = true;
    };

    this.socket.onerror = () => {
      // this.notify(errorMessage, "error");
      this.socket.close();
      this.available = true;
    };
  }

  disconnect() {
    this.socket.close();
  }

  calibrate() {}

  send() {
    // Update da situação do sensor -> 'available'
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

  get connectedAndPositioned() {
    console.log("connectedAndPositioned", this.connected && this.notNull, this.connected, this.notNull);
    return this.connected && this.notNull;
  }
}

class Movement {
  // Bean
  sensors = [];
  movement = null;
  observation = "";

  // Metadata
  name = "";
  image = null;
  description = null;
  angle = null;
  uuid = "";

  constructor() {
    this.uuid = uuid(null, null, null);
  }

  selectMovement(movement, movements) {
    this.movement = movement;
    // Seta os metadata desse movimento
    const foundMovement = movements.find((m) => m.value === movement);
    if (foundMovement) {
      this.name = foundMovement.movement_name;
      this.image = `/procedures/${foundMovement.image}`;
      this.angle = foundMovement.angle;
      this.description = foundMovement.description;
    }
  }

  get size() {
    return this.sensors.length;
  }

  get notEmpty() {
    return !_.isEmpty(this.sensors);
  }

  get notNull() {
    return !_.isNil(this.movement);
  }

  get valid() {
    return this.notNull && this.notEmpty && this.sensors.every((m) => m.valid);
  }
}

class Procedure {
  // Bean
  movements = [];
  procedure = null;
  observation = "";

  // Metadata
  movementsOptions = [];
  positionOptions = [];
  name = "";
  minSensor = null;
  uuid = "";

  constructor() {
    this.uuid = uuid(null, null, null);
  }

  addMovement() {
    this.movements.push(new Movement());
  }

  removeMovement(uuid) {
    const rIndex = this.movements.findIndex((m) => m.uuid === uuid);
    if (rIndex !== -1) {
      this.movements.splice(rIndex, 1);
    }
  }

  selectProcedure(procedure, procedures) {
    this.procedure = procedure;
    // Seta os metadata desse procedimento
    const foundProcedure = procedures.find((p) => p.value === procedure);
    if (foundProcedure) {
      this.movementsOptions = foundProcedure.rules;
      this.positionOptions = foundProcedure.sensor_positions;
      this.minSensor = foundProcedure.min_sensor;
      this.name = foundProcedure.articulation_name;
    }
  }

  get notNull() {
    return !_.isNil(this.procedure);
  }

  get notEmpty() {
    return !_.isEmpty(this.movements);
  }

  get size() {
    return this.movements.length;
  }

  get valid() {
    return this.notNull && this.notEmpty && this.movements.every((m) => m.valid);
  }
}

class Session {
  procedures = [];
  patientId = null;
  uuid = "";

  get minSensor() {
    return this.procedures.map((p) => p.minSensor)?.join(" | ");
  }

  constructor() {
    this.uuid = uuid(null, null, null);
  }

  addProcedure() {
    this.procedures.push(new Procedure());
  }

  removeProcedure(uuid) {
    const rIndex = this.procedures.findIndex((p) => p.uuid === uuid);
    if (rIndex !== -1) {
      this.procedures.splice(rIndex, 1);
    }
  }

  get notEmpty() {
    return !_.isEmpty(this.procedures);
  }

  get size() {
    return this.procedures.length;
  }

  get valid() {
    return this.notEmpty && this.procedures.every((p) => p.valid);
  }

  get procedurePositionsWithMoreOptions() {
    return this.procedures.reduce(({ positionOptions: prev }, { positionOptions: current }) => (prev.length > current.length ? prev : current)).positionOptions || [];
  }
}

class SessionUtil {
  navigation = new NavigationUtil();
  backEndSocket = new BackEndSocketUtil(() => {
    this.stop();
  });
  bean = new Session();
  storage = new Storage();

  temp = null;

  // Procedimentos, Url Socket etc
  metadata = null;
  // Infos do paciente
  patient = null;

  saving = false;

  constructor() {}

  print() {
    // Realiza impressão do bean no console do navegador, desabilitar botão quando não estiver em dev
    console.dir(this.bean);
  }

  setPatientId(id) {
    // Seta o id do paciente no bean (sessão)
    this.bean.patientId = Number(id);
  }

  setMetadata(metadata) {
    // Seta o metadata para sessões. ip da maquina do backend por ex.
    this.metadata = metadata;
  }

  setPatient(patient) {
    // Seta o paciente da sessão, para metadata. caso necessite exibir alguma informação.
    this.patient = patient;
  }

  get disableNext() {
    // Desabilita navegação para o next, considerando o passo da sessão
    const proceduresNotNullAndMovementsNotNull = !(this.bean.notEmpty && this.bean.procedures.every((p) => p.notNull && p.notEmpty && p.movements.every((m) => m.notNull)));
    switch (this.navigation.actualStepOrder) {
      case 0:
        // Bloqueia a navegação para o proximo caso não tenha adicionado o/os procedimentos e os movimentos que vão ser realizados
        // return !this.navigation.validNext || !this.bean.proceduresNotNullAndMovementsNotNull;
        return !this.navigation.validNext || proceduresNotNullAndMovementsNotNull;
      case 1:
        // Bloqueia a navegação para o proximo caso não tenha adicionado o/os procedimentos que vão ser realizados
        return !this.navigation.validNext || proceduresNotNullAndMovementsNotNull || !this.backEndSocket.allConnectedAndPositioned;
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
    return this.navigation.actualStepAction === "receiver-measurements";
  }

  get numberOfValidConnection() {
    // Computado com o numero de conexões a sensores considerada válida
    console.log(this.backEndSocket.registeredSensorsList, this.backEndSocket.registeredSensorsList.length);
    return this.backEndSocket.registeredSensorsList.length;
  }

  get inDev() {
    return process.env.DEV;
  }

  start() {
    // Envia o comando de start para todos os sensores conectados
    console.log("start todos");
  }

  stop() {
    // Envia o comando de stop para todos os sensores conectados
    console.log("stop todos");
  }

  restart() {
    // Envia o comando de restart para todos os sensores conectados
    console.log("restart todos");
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
    console.log("beforeUnmount");
  }
}

export { SessionUtil };
