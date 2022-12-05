import { Notify } from "quasar";
import WebSocket from "isomorphic-ws";
import dayjs from "dayjs";

const openMessage = "[WebSocket] Conexão com o sensor feita com websocket";
const closeMessage = "[WebSocket] Websocket desconectado do servidor";
const errorMessage = "[WebSocket] Erro no servidor websocket";
class SessionWebSocket {
  constructor(
    onSensorConnect = null,
    onSensorDisconnect = null,
    onSensorError = null,
    onSessionConnect = null,
    onSessionDisconnect = null,
    onSessionError = null,
    onAddInDev = null
  ) {
    // Session
    this.availableSensorsList = [];
    this.registeredSensorsList = [];
    this.registeredSensorsIdList = [];
    this.sessionSocket = null;

    // Command
    this.sessionLoadingRequest = false;
    this.connectedBackend = false;
    this.disableStart = false;
    this.disableStop = true;
    this.disableRestart = true;
    this.measurementInProgress = false;

    // Timing
    this.timeout = null;
    this.runTimer = null;
    this.time = null;

    // Callbacks
    this.onSensorConnect = onSensorConnect;
    this.onSensorDisconnect = onSensorDisconnect;
    this.onSensorError = onSensorError;
    this.onSessionConnect = onSessionConnect;
    this.onSessionDisconnect = onSessionDisconnect;
    this.onSessionErro = onSessionError;
    this.onAddInDev = onAddInDev;

    this.useAlarm = false;
    this.alarmTime = 0;
  }

  // General
  notify(message, color) {
    Notify.create({
      message,
      color,
      textColor: "white",
    });
  }

  sendSocketMessage(socket, type, message = null) {
    if (socket !== null) {
      socket?.send(JSON.stringify({ origin: "FRONT", type, message }));
    }
  }

  // Session handler socket
  // Computed
  get loadingRequest() {
    return this.sessionLoadingRequest;
  }

  get numberOfMeasurements() {
    return this.registeredSensorsList?.[0]?.gyro_measurements?.length;
  }

  get blockSave() {
    return this.measurementInProgress;
  }

  get inProgress() {
    return this.measurementInProgress;
  }

  get isConnectedBackend() {
    return this.connectedBackend;
  }

  get timeRunning() {
    return this.time;
  }

  get disableStartBtn() {
    return this.disableStart || this.numberOfMeasurements > 0;
  }

  get disableStopBtn() {
    return this.disableStop;
  }

  get disableRestartBtn() {
    return this.disableRestart;
  }

  // Function
  connectSession(socket_url = "localhost:8000") {
    this.sessionSocket = new WebSocket(`ws://${socket_url}/socket`, [
      "websocket",
    ]);

    this.sessionSocket.onmessage = (event) => {
      this.handleSessionMessage(JSON.parse(event?.data));
    };

    this.sessionSocket.onopen = () => {
      this.connectedBackend = true;
      this.sendSocketMessage(this.sessionSocket, "GET_UPDATE_CLIENT_LIST");
      this.notify(openMessage, "positive");
      this.onSessionConnect?.();
    };

    this.sessionSocket.onclose = () => {
      this.notify(closeMessage, "warning");
      this.connectedBackend = false;
      this.onSessionDisconnect?.();
    };

    this.sessionSocket.onerror = () => {
      this.notify(errorMessage, "error");
      this.sessionSocket.close();
      this.connectedBackend = false;
      this.onSessionErro?.();
    };
  }

  requestAvailableSensors() {
    this.sendSocketMessage(this.sessionSocket, "GET_UPDATE_CLIENT_LIST");
    this.sessionLoadingRequest = true;
  }

  handleSessionMessage(json) {
    switch (json?.type) {
      case "UPDATE_CLIENT_LIST":
        this.availableSensorsList = json?.message;
        this.sessionLoadingRequest = false;
        break;
      case "SENSOR_DISCONNECTED":
        this.checkIfConnectedSession(json?.message);
        break;
      default:
        break;
    }
  }

  updateSensor({ position, sensor }) {
    const result = this.getIndexSensorInConnectedList(sensor);
    if (this.inProgress) {
      this.stop();
      this.restart();
    }
    this.registeredSensorsList[result].position = position;
  }

  // Sensors handler socket
  get numberOfValidConnection() {
    return this.registeredSensorsList?.filter((s) => s.device.active)?.length;
  }

  get filterSensorsConnected() {
    return this.availableSensorsList?.filter(({ ip }) =>
      this.checkSensorConnected(ip)
    );
  }

  checkSensorConnected(ip) {
    return (
      this.registeredSensorsList?.findIndex(
        ({ device }) => device?.ip === ip
      ) === -1
    );
  }

  checkIfConnectedSession(sensor) {
    const result = this.getIndexSensorInConnectedList(sensor);
    if (result !== -1) {
      this.stop();
    }
  }

  getIndexSensorInConnectedList(sensor) {
    return this.registeredSensorsList?.findIndex(
      ({ device }) => device.ip === sensor.ip
    );
  }

  checkIdInList(checkId) {
    const checked = this.registeredSensorsIdList?.findIndex(
      (id) => id === checkId
    );
    if (checked === -1) {
      return checkId;
    }
    return this.checkIdInList(checkId + 1);
  }

  async connect(sensor) {
    // Verifica se o sensor já realizou alguma conexão anteriormente
    const isNew = this.getIndexSensorInConnectedList(sensor);
    if (isNew === -1) {
      // Caso não tenha realizado uma conexão anteriormente, adiciona ao array de sensores da sessão
      // Verifica e encontra o id do sensor na sessão
      const id = this.checkIdInList(0);
      this.registeredSensorsIdList.push(id);
      this.registeredSensorsList.push({
        sensorName: sensor.nameSensor,
        tabName: "Sensor_" + id,
        position: "",
        device: {
          id: id,
          active: false,
          measurementInProgress: false,
          connection: null,
          ...sensor,
        },
        gyro_measurements: [],
      });
    }

    // Resgata o index do sensor na lista de conectados para trabalhar diretamente com item especifico
    const index = this.getIndexSensorInConnectedList(sensor);
    let url = `ws://${this.registeredSensorsList[index].device.ip}:80/socket/session`;
    this.registeredSensorsList[index].device.connection = new WebSocket(url, [
      "websocket",
    ]);
    // Event listener
    this.registeredSensorsList[index].device.connection.onmessage = (event) => {
      this.handlerSensorMessage(JSON.parse(event.data), index);
    };

    this.registeredSensorsList[index].device.connection.onclose = () => {
      this.notify(closeMessage + " do sensor", "warning");
      this.setDisconnected(index);
      this.onSensorDisconnect?.({
        index,
        sensor: this.registeredSensorsList[index].device,
      });
    };

    this.registeredSensorsList[index].device.connection.onerror = () => {
      this.notify(errorMessage + " do sensor", "error");
      this.registeredSensorsList[index].device.connection.close();
      this.setDisconnected(index);
      this.onSensorError?.({
        index,
        sensor: this.registeredSensorsList[index].device,
      });
    };

    this.registeredSensorsList[index].device.connection.onopen = () => {
      this.notify(openMessage + " do sensor", "positive");
      this.setConnected(index);
      this.onSensorConnect?.({
        index,
        sensor: this.registeredSensorsList[index].device,
      });
    };
  }

  disconnect(sensor) {
    const index = this.getIndexSensorInConnectedList(sensor);
    this.registeredSensorsList[index]?.device?.connection?.close();
  }

  calibrate(sensor) {
    const index = this.getIndexSensorInConnectedList(sensor);
    this.sendSocketMessage(
      this.registeredSensorsList[index]?.device?.connection,
      "CALIBRATE",
      {
        cmd: 4,
      }
    );
  }

  closeAll() {
    if (this.registeredSensorsList.length) {
      this.registeredSensorsList
        .filter((s) => s?.device?.active)
        ?.forEach((s) => {
          s?.device?.connection?.stop();
          s?.device?.connection?.close();
        });
    }
    if (this.timeout !== null) {
      this.endTimer();
    }
    this.sessionSocket?.close();
  }

  remove(sensor) {
    const index = this.getIndexSensorInConnectedList(sensor);
    if (this.inProgress) {
      this.stop();
      this.restart();
    }
    this.registeredSensorsList.splice(index, 1);
  }

  handlerSensorMessage(json, index) {
    if (json?.origin === "SENSOR") {
      switch (json?.type) {
        case "MEASUREMENT_LIST":
          this.addMensuration(json?.message, index);
          break;
        default:
          break;
      }
    }
  }

  addMensuration(json, index) {
    if (json?.message?.length) {
      this.registeredSensorsList[index]?.gyro_measurements?.push(...json);
    }
  }

  setDisconnected(index) {
    this.registeredSensorsList[index].device.active = false;
  }

  setConnected(index) {
    this.registeredSensorsList[index].device.active = true;
  }

  start() {
    try {
      if (this.useAlarm && this.alarmTime < 1) {
        Notify.create({
          message: "O valor do timer deve ser maior que 0",
          textColor: "white",
          color: "warning",
        });
        return;
      }
      let changed = false;
      this.registeredSensorsList.map((item, index) => {
        if (this.registeredSensorsList[index]?.device?.active === true) {
          this.sendSocketMessage(
            this.registeredSensorsList[index]?.device?.connection,
            "START",
            {
              cmd: 1,
            }
          );
          this.registeredSensorsList[index].device.measurementInProgress = true;
          this.measurementInProgress = true;
          changed = true;
        }
      });
      if (changed) {
        this.startTimer();
        this.disableStart = true;
        this.disableStop = false;
        this.disableRestart = false;
        this.disablePrev = true;
      }
    } catch (e) {
      console.log(e);
    }
  }

  restart() {
    let changed = false;
    this.registeredSensorsList.map((item, index) => {
      if (this.registeredSensorsList[index].device.active === true) {
        this.sendSocketMessage(
          this.registeredSensorsList[index]?.device?.connection,
          "RESTART",
          {
            cmd: 3,
          }
        );
        this.registeredSensorsList[index].device.measurementInProgress = false;
        this.measurementInProgress = false;
        this.registeredSensorsList[index].gyro_measurements = [];
        changed = true;
      }
    });
    if (changed) {
      this.endTimer();
      this.disableStart = false;
      this.disableStop = true;
      this.disableRestart = true;
      this.disablePrev = false;
    }
  }

  stop() {
    let changed = false;
    this.registeredSensorsList.map((item, index) => {
      if (this.registeredSensorsList[index].device.active === true) {
        this.sendSocketMessage(
          this.registeredSensorsList[index]?.device?.connection,
          "START",
          {
            cmd: 2,
          }
        );
        this.registeredSensorsList[index].device.measurementInProgress = false;
        this.measurementInProgress = false;
        changed = true;
      }
    });
    if (changed) {
      this.endTimer();
      this.disableStart = false;
      this.disableStop = true;
      this.disableRestart = false;
      this.disablePrev = false;
    }
  }

  startTimer() {
    this.runTimer = 0;
    this.time = null;

    this.timeout = setInterval(() => {
      this.runTimer = this.runTimer + 1;
      this.time = dayjs()
        .set("hour", 0)
        .set("minute", 0)
        .set("second", this.runTimer)
        .format("HH:mm:ss");
      console.log(this.time);
      if (this.useAlarm) {
        if (this.runTimer >= this.alarmTime) {
          this.stop();
          this.useAlarm = false;
        }
      }
    }, 1000);
  }

  endTimer() {
    clearTimeout(this.timeout);
    this.timeout = null;
    this.runTimer = null;
    this.time = null;
  }

  addTestReading(sensorN = 2) {
    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }

    if (this.registeredSensorsList.length === 0) {
      let addIterator = 0;
      while (addIterator < sensorN) {
        addIterator++;
        const id = this.registeredSensorsList.length;
        this.registeredSensorsList.push({
          sensorName: "Sensor_" + id,
          position: "",
          tabName: "Sensor_" + id,
          device: {
            id: id,
            active: true,
            measurementInProgress: false,
            connection: null,
            ip: `192.168.16.10${id}`,
          },
          gyro_measurements: [],
        });
      }
      this.disableRestart = false;
    }

    let iterator = 0;
    while (iterator < 365) {
      iterator++;
      this.registeredSensorsList?.map((sensor, index) => {
        const number = sensor.gyro_measurements.length
          ? sensor.gyro_measurements.length
          : 0;
        sensor.gyro_measurements.push({
          sensorName: sensor.sensorName,
          hourMensuration: index,
          numberMensuration: number,
          Acc_X: index,
          Acc_Y: index,
          Acc_Z: index,
          AccelX_mss: index,
          AccelY_mss: index,
          AccelZ_mss: index,
          Gyr_X: index,
          Gyr_Y: index,
          Gyr_Z: index,
          Mag_X: index,
          Mag_Y: index,
          Mag_Z: index,
          Roll: getRandomArbitrary(90, 80),
          Pitch: getRandomArbitrary(90, 70),
          Yaw: getRandomArbitrary(90, 70),
        });
      });
    }
    this.onAddInDev?.();
  }
}

export class WebSocketSensorsUtils {
  static createSession({
    onSensorConnect = null,
    onSensorDisconnect = null,
    onSensorError = null,
    onSessionConnect = null,
    onSessionDisconnect = null,
    onSessionError = null,
    onAddInDev = null,
  } = {}) {
    return new SessionWebSocket(
      onSensorConnect,
      onSensorDisconnect,
      onSensorError,
      onSessionConnect,
      onSessionDisconnect,
      onSessionError,
      onAddInDev
    );
  }
}
