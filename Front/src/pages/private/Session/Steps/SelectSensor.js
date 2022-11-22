import { Component, Prop, PropSync, Vue, Watch } from "vue-property-decorator";
import SensorItem from "../Components/SensorItem.vue";
import { Notify } from "quasar";
import _ from "lodash";

@Component({
  name: "select-sensor",
  components: {
    SensorItem,
  },
})
class SelectSensor extends Vue {
  @PropSync("session")
  syncedSession;

  @Prop()
  metadata;

  @Prop()
  tinyScreen;

  @Prop()
  actualProcedure;

  @Prop({ type: Array, default: [] })
  connectedSensors;

  @PropSync("sensorList")
  syncedSensorAvailableList;

  @PropSync("sensors")
  syncedSensors;

  @PropSync("numberOfValidConnection")
  syncedNumberOfValidConnection;

  @PropSync("registeredSensorId")
  syncedRegisteredSensorId;

  loading = false;

  connect(indexSensorList) {
    if (this.syncedSensorAvailableList[indexSensorList].available) {
      if (this.getSensorIndexConnectedList(indexSensorList)) {
        this.syncedRegisteredSensorId = this.syncedRegisteredSensorId + 1;

        const id = this.syncedRegisteredSensorId;
        this.syncedSensors.push({
          id: id,
          sensorName: "Sensor " + id,
          tab_name: "Sensor_" + id,
          label: "Connect Sensor " + id,
          device: {
            id: id,
            ip: this.syncedSensorAvailableList[indexSensorList].ip,
            active: false,
            connection: null,
            corBtn: "primary",
            classTab: "",
            measurement_in_progress: false,
          },
          gyro_measurements: [],
        });
      }

      const index = this.getSensorIndexConnectedList(indexSensorList);

      let url = `ws://${this.syncedSensors[index].device.ip}:80/socket/session`;
      this.syncedSensors[index].device.connection = new WebSocket(url);

      this.syncedSensors[index].device.connection.onmessage = (event) => {
        const jSonParsed = JSON.parse(event.data);
        console.log(jSonParsed);
        this.addMensuration(jSonParsed, index);
      };

      this.syncedSensors[index].device.connection.onclose = (event) => {
        this.setConnected(index);
        Notify.create({
          message: this.$t("socket.success"),
          textColor: "white",
          color: "positive",
        });
        clearInterval(this.syncedSensors[index].device.connection.interval);
      };

      this.syncedSensors[index].device.connection.onerror = (event) => {
        console.log("onerror");
        this.setDisconnected(index);

        Notify.create({
          message: this.$t("socket.error"),
          textColor: "white",
          color: "error",
        });

        clearInterval(this.syncedSensors[index].device.connection.interval);
      };

      this.syncedSensors[index].device.connection.onopen = (event) => {
        console.log("onopen");
        this.setDisconnected(index);
        Notify.create({
          message: this.$t("socket.close"),
          textColor: "white",
          color: "warning",
        });
      };

      this.syncedSensors[index].device.connection.interval = setInterval(() => {
        this.syncedSensors[index].device.connection.send(
          JSON.stringify({ origin: "FRONT", type: "PING" })
        );
      }, 1000);
    }
  }

  addMensuration(data, id) {
    data.map((campo, index) => {
      this.syncedSensors[id].gyro_measurements.push(campo);
    });
  }

  disconnect(indexSensorList) {
    const index = this.getSensorIndexConnectedList(indexSensorList);
    this.syncedSensors[index].device.connection.close();
  }

  removeSensor(id) {
    if (typeof id === "number") {
      if (this.syncedMeasurementInProgress === true) {
        this.sendStop();
      }
      this.syncedSensors.splice(Number(id), 1);
    }
  }

  getSensorIndexConnectedList(indexSensorList) {
    return this.syncedSensors.findIndex(
      (sensor) =>
        this.syncedSensorAvailableList[indexSensorList].ip === sensor.device.ip
    );
  }

  calibrate(indexSensorList) {
    const index = this.getSensorIndexConnectedList(indexSensorList);
    this.sensors[index].device.connection.send(
      JSON.stringify({ origin: "FRONT", type: "COMMAND", cmd: 4 })
    );
  }

  setConnected(id) {
    console.log("setConnected");
    this.syncedSensors[id].device.corBtn = "positive";
    this.syncedSensors[id].device.corTab = "text-green";
    this.syncedSensors[id].device.active = true;
    this.syncedNumberOfValidConnection = this.syncedNumberOfValidConnection + 1;
  }

  setDisconnected(id) {
    console.log("setDisconnected");
    this.syncedSensors[id].device.corBtn = "primary";
    this.syncedSensors[id].device.corTab = "";
    this.syncedSensors[id].device.active = false;
    this.syncedNumberOfValidConnection = this.syncedNumberOfValidConnection - 1;
  }

  get minSensor() {
    return this.actualProcedure?.min_sensor;
  }

  get menuSensor() {
    const menuSensor = [
      {
        label: "Calibrate",
        icon: "iso",
        action: (index) => this.calibrate(index),
      },
    ];
    return menuSensor;
  }
}

export default SelectSensor;
