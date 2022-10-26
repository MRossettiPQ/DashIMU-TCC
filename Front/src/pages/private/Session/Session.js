import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import TabGraph from "./Components/TabGraph.vue";
import TabMeasurementTable from "./Components/TabMeasurementTable.vue";
import PatientExpansion from "./Components/PatientExpansion.vue";
import SensorExpansion from "./Components/SensorExpansion.vue";
import { Notify } from "quasar";
import PatientService from "src/commons/services/PatientService";
import SessionService from "src/commons/services/SessionService";

@Component({
  name: "old-session",
  components: {
    TabMeasurementTable,
    TabGraph,
    PatientExpansion,
    SensorExpansion,
  },
})
class Session extends Vue {
  // Se esta sendo realizada a medição
  measurement_in_progress = false;
  // Basicamente o paciente
  bean = {};
  // Os sensores conectados
  sensors = [];

  // Dados sobre a sessão
  sessionBean = {
    procedure: null,
    movement: null,
  };

  // Quantidade de sensores conectados
  numberOfConnections = 0;
  loading = false;
  loadingSave = false;
  loadingMetadata = false;

  metadata = null;
  // Movimentos disponiveis
  movements = [];
  // Movimento escolhido
  movement = null;
  // Imagem do movimento escolhido
  movementImg = null;
  // Posições para o sensor, para cada procedimento tera uma lista diferente
  positions = [];

  @Prop()
  idPatient;

  // Auxiliares
  registredSensorId = 0;
  step = 1;
  tabPanel = "Tab_1";
  timeout = null;
  runTime = null;

  get procedure() {
    return this.sessionBean?.procedure;
  }

  get getMovementImg() {
    return this.movementImg;
  }

  @Watch("procedure")
  updateMovementsList() {
    // Atualiza a lista de movimentos para o procedimento escolhido
    this.sessionBean.movement = null;
    this.movementImg = null;
    this.movements = this.metadata?.procedures?.find(
      (procedure) => procedure.value === this.procedure
    )?.rules;
  }

  @Watch("procedure")
  updatePositions() {
    // Atualiza a lista de posições para o movimento escolhido
    this.positions = [];
    this.positions = this.metadata?.procedures?.find(
      (procedure) => procedure.value === this.procedure
    )?.sensor_positions;
  }

  @Watch("sessionBean.movement")
  updateMovementsImg() {
    // Atualiza a imagem do movimento para o movimento escolhido
    this.movement = null;
    this.movement = this.movements?.find(
      (rule) => rule.value === this.sessionBean.movement
    );
    if (this.movement.image) {
      this.movementImg = require(`src/assets/procedures/${this.movement.image}`);
    } else {
      this.movementImg = "https://cdn.quasar.dev/img/boy-avatar.png";
    }
  }

  get getMovements() {
    return this.movements;
  }

  get numberOfMeasurements() {
    // Quantidade de medições realizadas
    if (this.sensors.length) {
      return this.sensors[0]?.gyro_measurements?.length;
    }
    return 0;
  }

  get inDev() {
    return process.env.DEV;
  }

  async mounted() {
    try {
      this.loading = true;
      const { idPatient } = this.$route.query;
      await this.metadataLoad();
      await this.dataLoad(idPatient);
    } catch (e) {
      console.log(e);
    } finally {
      this.loading = false;
    }
  }

  get sensorsData() {
    return this.sensors;
  }

  connectSensor(id) {
    let url = `ws://${this.sensors[id].device.ip}:8080`;
    this.sensors[id].device.connection = new WebSocket(url);

    this.sensors[id].device.connection.onmessage = (event) => {
      const jSonParsed = JSON.parse(event.data);
      this.addMensuration(jSonParsed, id);
    };

    // eslint-disable-next-line no-unused-vars
    this.sensors[id].device.connection.onopen = (event) => {
      this.setConnected(id);
      Notify.create({
        message: this.$t("socket.success"),
        textColor: "white",
        color: "positive",
      });
    };

    // eslint-disable-next-line no-unused-vars
    this.sensors[id].device.connection.onerror = (event) => {
      this.setDisconnected(id);

      Notify.create({
        message: this.$t("socket.error"),
        textColor: "white",
        color: "error",
      });
    };

    // eslint-disable-next-line no-unused-vars
    this.sensors[id].device.connection.onclose = (event) => {
      this.setDisconnected(id);
      Notify.create({
        message: this.$t("socket.close"),
        textColor: "white",
        color: "warning",
      });
    };
  }

  disconnectSensor(id) {
    this.sensors[id].device.connection.close();
    this.setDisconnected(id);
  }

  calibrateSensor(id) {
    this.sensors[id].device.connection.send(JSON.stringify({ cmd: 4 }));
  }

  addMensuration(data, id) {
    data.map((campo, index) => {
      this.sensors[id].gyro_measurements.push(campo);
    });
  }

  setConnected(id) {
    this.sensors[id].device.corBtn = "positive";
    this.sensors[id].device.corTab = "text-green";
    this.sensors[id].device.active = true;
    this.numberOfConnections = this.numberOfConnections + 1;
  }

  setDisconnected(id) {
    this.sensors[id].device.corBtn = "primary";
    this.sensors[id].device.corTab = "";
    this.sensors[id].device.active = false;
    this.numberOfConnections = this.numberOfConnections - 1;
  }

  sendStart() {
    this.sensors.map((item, index) => {
      if (item.device.active === true) {
        item.device.connection.send(JSON.stringify({ cmd: 1 }));
        item.device.measurement_in_progress = true;
        this.measurement_in_progress = true;
      }
    });
    this.startTimer();
  }

  sendStop() {
    this.sensors.map((item, index) => {
      if (item.device.active === true) {
        item.device.connection.send(JSON.stringify({ cmd: 2 }));
        item.device.measurement_in_progress = false;
        this.measurement_in_progress = true;
      }
    });
    this.endTimer();
  }

  sendRestart() {
    this.sensors.map((item, index) => {
      if (item.device.active === true) {
        item.device.connection.send(JSON.stringify({ cmd: 3 }));
        item.measurements = [];
      }
    });
  }

  async saveSession() {
    try {
      this.loadingSave = true;
      if (!this.sensors[0].gyro_measurements.length) {
        Notify.create({
          message: "No measurement to be saved",
          textColor: "white",
          color: "warning",
        });
        return false;
      }
      const data = await SessionService.postSession({
        sessionParams: {
          ...this.sessionBean,
          patientIdPatient: this.bean.idPatient,
        },
        sensors: this.sensors,
      });
    } catch (e) {
      console.log(e);
    } finally {
      this.loadingSave = false;
    }
  }

  async dataLoad(id) {
    try {
      this.bean = await PatientService.getPatient(id);
    } catch (e) {
      console.log(e);
    }
  }

  addSensor() {
    this.registredSensorId = this.registredSensorId + 1;
    const id = this.registredSensorId;
    this.sensors.push({
      sensorName: "Sensor " + id,
      tab_name: "Sensor_" + id,
      label: "Connect Sensor " + id,
      device: {
        id: id,
        ip: "",
        active: false,
        connection: null,
        corBtn: "primary",
        classTab: "",
        measurement_in_progress: false,
      },
      gyro_measurements: [],
    });
  }

  removeSensor(id) {
    if (typeof id === "number") {
      this.sensors.splice(Number(id), 1);
      if (this.measurement_in_progress === true) {
        this.sendStop();
      }
    }
  }

  addLeituraTeste() {
    console.log("addLeituraTeste");

    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }

    let iterator = 0;
    while (iterator < 365) {
      iterator++;
      this.sensors.map((sensor, index) => {
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
  }

  startTimer() {
    /*
      this.runTimer = 0;
      this.timeout = setInterval(() => {
        this.runTimer = this.runTimer + 1;
        console.log("interval", this.runTimer, this.timeout);
      }, 1000);

     */
  }

  endTimer() {
    clearTimeout();
  }

  get timerRunning() {
    return this.runTimer;
  }

  next() {
    console.log(this.sessionBean?.procedure, this.sessionBean?.movement);
    if (
      this.sessionBean?.procedure !== null &&
      this.sessionBean?.movement !== null
    ) {
      console.log("aqui");
      this.$refs.stepper.next();
    } else {
      Notify.create({
        message: this.$t("session.next_error"),
        textColor: "white",
        color: "warning",
      });
    }
  }

  async metadataLoad() {
    try {
      this.loadingMetadata = true;
      this.metadata = await SessionService.getMetadata();
    } catch (e) {
      console.log(e);
    } finally {
      this.loadingMetadata = false;
    }
  }

  exportAll() {
    console.log("exportar tudo");
  }
}

export default Session;
