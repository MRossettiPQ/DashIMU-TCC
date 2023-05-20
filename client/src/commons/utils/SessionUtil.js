import _ from "lodash";
import { Notify } from "quasar";

const { v4: uuid } = require("uuid");

const openMessage = "[WebSocket] Conexão com o sensor feita com websocket";
const closeMessage = "[WebSocket] Websocket desconectado do servidor";
const errorMessage = "[WebSocket] Erro no servidor websocket";
// class CsvUtil {
//
// }

class SensorSocket {
  connected = false;
  url = "";
  socket = null;
  onDisconnect = null;
}

class Storage {}

class BackEndSocketUtil {
  availableSensorsList = [];
  registeredSensorsList = [];
  connected = false;
  loadingSensors = false;
  url = "";
  socket = null;
  onDisconnect = null;

  constructor(onDisconnect = null) {
    this.onDisconnect = onDisconnect;
  }

  connect(socket_url = "localhost:8000") {
    this.socket = new WebSocket(`ws://${socket_url}/socket`, ["websocket"]);

    this.socket.onmessage = (event) => {
      this.handleMessage(JSON.parse(event?.data));
    };

    this.socket.onopen = () => {
      this.connected = true;
      this.send(this.socket, "GET_UPDATE_CLIENT_LIST");
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
    this.socket.close();
    this.connected = false;
  }

  requestAvailableSensors() {
    this.send(this.socket, "GET_UPDATE_CLIENT_LIST");
    this.loadingSensors = true;
  }

  send(socket, type, message = null) {
    if (socket !== null) {
      socket?.send(JSON.stringify({ origin: "FRONT", type, message }));
    }
  }

  handleMessage(json) {
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
    return this.registeredSensorsList?.findIndex(({ device }) => device.uuid === sensor.uuid);
  }

  notify(message, color) {
    Notify.create({
      message,
      color,
      textColor: "white",
    });
  }

  mergeSensorList(jsonList) {
    this.availableSensorsList = jsonList.map((s) => new Sensor(s));
  }
}

class NavigationUtil {
  selectedStep = null;

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

  next() {
    if (this.actualStepOrder < this.steps.length) {
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
    if (this.actualStepOrder >= 0) {
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
  position = "";
  gyro_measurements = [];

  // Metadata
  ip = "";
  origin = "";
  uuid = "";
  active = false;
  measurementInProgress = false;

  constructor(sensor) {
    this.uuid = sensor.uuid;
    this.ip = sensor.ip;
    this.origin = sensor.origin;
  }

  addMeasurement(measurement) {
    this.gyro_measurements.push(new GyroMeasurement(measurement));
  }

  get size() {
    return this.gyro_measurements.length;
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
    console.log(foundMovement);
  }

  addSensor() {
    this.sensors.push(new Sensor());
  }

  get size() {
    return this.sensors.length;
  }

  get notNull() {
    return !_.isNil(this.movement);
  }

  get valid() {
    return this.notNull && this.sensors.length > 0;
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

  get size() {
    return this.movements.length;
  }

  get valid() {
    return this.notNull && this.movements.length > 0;
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

  get size() {
    return this.procedures.length;
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
}

class SessionUtil {
  navigation = new NavigationUtil();
  backEndSocket = new BackEndSocketUtil();
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
    console.dir(this.bean);
  }

  setPatientId(id) {
    this.bean.patientId = Number(id);
  }

  setMetadata(metadata) {
    this.metadata = metadata;
  }

  setPatient(patient) {
    this.patient = patient;
  }

  get disableNext() {
    switch (this.navigation.actualStepOrder) {
      case 0:
        // Bloqueia a navegação para o proximo caso não tenha adicionado o/os procedimentos que vão ser realizados
        return this.navigation.actualStepOrder === this.navigation.maxOrder || this.bean.procedures.length === 0;
      default:
        return this.navigation.actualStepOrder === this.navigation.maxOrder;
    }
  }

  get disablePrev() {
    return this.navigation.actualStepOrder === 0;
  }

  get disableStartBtn() {
    return false;
  }

  get disableStopBtn() {
    return false;
  }

  get disableRestartBtn() {
    return false;
  }

  get showCommandMenu() {
    return this.navigation.actualStepAction === "receiver-measurements";
  }

  get numberOfValidConnection() {
    return 0;
  }

  start() {}

  stop() {}

  restart() {}

  save() {
    try {
      this.saving = true;
    } catch (e) {
      console.log(e);
    } finally {
      this.saving = false;
    }
  }
}

export { SessionUtil };
