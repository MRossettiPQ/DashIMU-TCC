import { Component, Prop, PropSync, Vue } from "vue-property-decorator";
import SocketService from "src/commons/services/SocketService";
import { Notify } from "quasar";

@Component({
  name: "sensor-expansion",
})
class SensorExpansion extends Vue {
  loading = false;
  tab = "Sensor_1";

  @PropSync("sensors")
  syncedSensors;

  @PropSync("registredSensorId")
  syncedRegistredSensorId;

  @PropSync("measurementInProgress")
  syncedMeasurementInProgress;

  @Prop()
  metadata;

  @Prop({ type: Array, default: [] })
  positions;

  sensorsOptions = [];

  async mounted() {
    await this.listSensorsLoad();
  }

  async listSensorsLoad() {
    try {
      this.loading = true;
      this.sensorsOptions = await SocketService.getSensorsList();
    } catch (e) {
      console.log(e);
    } finally {
      this.loading = false;
    }
  }

  connect(id) {
    if (id) {
      let url = `ws://${this.syncedSensors[id].device.ip}:8080`;
      this.syncedSensors[id].device.connection = new WebSocket(url);

      this.syncedSensors[id].device.connection.onmessage = (event) => {
        const jSonParsed = JSON.parse(event.data);
        console.log(jSonParsed);
        this.addMensuration(jSonParsed, id);
      };

      // eslint-disable-next-line no-unused-vars
      this.syncedSensors[id].device.connection.onopen = (event) => {
        this.setConnected(id);
        Notify.create({
          message: this.$t("socket.success"),
          textColor: "white",
          color: "positive",
        });
      };

      // eslint-disable-next-line no-unused-vars
      this.syncedSensors[id].device.connection.onerror = (event) => {
        this.setDisconnected(id);

        Notify.create({
          message: this.$t("socket.error"),
          textColor: "white",
          color: "error",
        });
      };

      // eslint-disable-next-line no-unused-vars
      this.syncedSensors[id].device.connection.onclose = (event) => {
        this.setDisconnected(id);
        Notify.create({
          message: this.$t("socket.close"),
          textColor: "white",
          color: "warning",
        });
      };
    }
  }

  disconnect(index) {
    this.syncedSensors[index].device.connection.close();
    this.setDisconnected(index);
  }

  addSensor() {
    this.syncedRegistredSensorId = this.syncedRegistredSensorId + 1;

    const id = this.syncedRegistredSensorId;
    this.syncedSensors.push({
      id: id,
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
      if (this.syncedMeasurementInProgress === true) {
        this.sendStop();
      }
      this.syncedSensors.splice(Number(id), 1);
    }
  }

  calibrate(index) {
    this.sensors[index].device.connection.send(JSON.stringify({ cmd: 4 }));
  }

  addMensuration(data, id) {
    data.map((campo, index) => {
      this.syncedSensors[id].gyro_measurements.push(campo);
    });
  }

  setConnected(id) {
    this.syncedSensors[id].device.corBtn = "positive";
    this.syncedSensors[id].device.corTab = "text-green";
    this.syncedSensors[id].device.active = true;
    this.numberOfConnections = this.numberOfConnections + 1;
  }

  setDisconnected(id) {
    this.syncedSensors[id].device.corBtn = "primary";
    this.syncedSensors[id].device.corTab = "";
    this.syncedSensors[id].device.active = false;
    this.numberOfConnections = this.numberOfConnections - 1;
  }
}

export default SensorExpansion;
