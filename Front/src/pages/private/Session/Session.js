import { Component, Prop, Ref, Vue } from "vue-property-decorator";
import TabGraph from "./Components/TabGraph.vue";
import TabMeasurementTable from "./Components/TabMeasurementTable.vue";
import PatientExpansion from "./Components/PatientExpansion.vue";
import SensorExpansion from "./Components/SensorExpansion.vue";
import CompleteSessionExpansion from "./Components/CompleteSessionExpansion.vue";
import { Notify } from "quasar";
import PatientService from "src/commons/services/PatientService";
import SessionService from "src/commons/services/SessionService";

@Component({
  name: "session",
  components: {
    TabMeasurementTable,
    TabGraph,
    PatientExpansion,
    SensorExpansion,
    CompleteSessionExpansion,
  },
})
class Session extends Vue {
  tabPanel = "Tab_1";
  bean = {};
  sessionBean = {};
  numberOfConnections = 0;
  loadingSave = false;

  @Prop()
  idPatient;

  get numberOfMeasurements() {
    return this.sensors[0].measurements.length;
  }

  async mounted() {
    try {
      const { idPatient } = this.$route.query;
      await this.dataLoad(idPatient);
      console.log(this.bean);
    } catch (e) {
      console.log(e);
    }
  }

  renderRows = [
    {
      name: "numberMensuration",
      data: [],
    },
    {
      name: "Roll",
      data: [],
    },
    {
      name: "Pitch",
      data: [],
    },
    {
      name: "Yaw",
      data: [],
    },
  ];

  sensors = [
    {
      sensorName: "Sensor 1",
      tab_name: "Sensor_1",
      label: "Connect Sensor 1",
      device: {
        ip: "",
        active: false,
        connection: null,
        corBtn: "primary",
        corTab: "",
      },
      measurements: [],
    },
    {
      sensorName: "Sensor 2",
      tab_name: "Sensor_2",
      label: "Connect Sensor 2",
      device: {
        ip: "",
        active: false,
        connection: null,
        corBtn: "primary",
        classTab: "",
      },
      measurements: [],
    },
  ];

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
      const message = "Conexão com o sensor realizada com websocket...";
      Notify.create({
        message,
        textColor: "white",
        color: "positive",
      });
    };

    // eslint-disable-next-line no-unused-vars
    this.sensors[id].device.connection.onerror = (event) => {
      this.setDisconnected(id);
      const message = "Error no websocket server...";

      Notify.create({
        message,
        textColor: "white",
        color: "error",
      });
    };

    // eslint-disable-next-line no-unused-vars
    this.sensors[id].device.connection.onclose = (event) => {
      this.setDisconnected(id);
      const message = "Websocket desconectado do server...";
      Notify.create({
        message,
        textColor: "white",
        color: "warning",
      });
    };
  }

  disconnectSensor(id) {
    this.sensors[id].device.connection.close();
    this.setDisconnected(id);
  }

  addMensuration(data, id) {
    // Reinicia grafico para ultimo json recebido
    this.renderRows[1].data = [];
    this.renderRows[2].data = [];
    this.renderRows[3].data = [];
    this.renderRows[4].data = [];
    this.renderRows[5].data = [];
    // eslint-disable-next-line no-unused-vars
    data.map((campo, index) => {
      // adiciona leitura ao sensor recebido
      this.sensors[id].measurements.push(campo);
      // adiciona leitura ao grafico
      this.renderRows[1].data.push(campo.numberMensuration);
      this.renderRows[2].data.push(campo.Roll);
      this.renderRows[3].data.push(campo.Pitch);
      this.renderRows[4].data.push(campo.Yaw);
      this.renderRows[5].data.push(campo.sensorName);
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
      }
    });
  }

  sendStop() {
    this.sensors.map((item, index) => {
      if (item.device.active === true) {
        item.device.connection.send(JSON.stringify({ cmd: 2 }));
      }
    });
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

      const data = await SessionService.postSession({
        sessionParams: {
          ...this.sessionBean,
          patientIdPatient: this.bean.idPatient,
        },
        gyro_sensors: this.sensors,
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
    const id = this.sensors.length + 1;
    this.sensors.push({
      sensorName: "Session " + id,
      tab_name: "Sensor_" + id,
      label: "Connect Sensor " + id,
      device: {
        ip: "",
        active: false,
        connection: null,
        corBtn: "primary",
        classTab: "",
      },
      measurements: [],
    });
  }

  addLeituraTeste() {
    console.log("addLeituraTeste");
    let iterator = 0;
    while (iterator < 1000) {
      iterator++;
      this.sensors.map((sensor, index) => {
        sensor.measurements.push({
          sensorName: sensor.sensorName,
          hourMensuration: index,
          numberMensuration: sensor.measurements.length,
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
          Roll: this.getRandomArbitrary(90, 80),
          Pitch: this.getRandomArbitrary(90, 70),
          Yaw: this.getRandomArbitrary(90, 70),
        });
      });
    }
  }

  getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
}

export default Session;
