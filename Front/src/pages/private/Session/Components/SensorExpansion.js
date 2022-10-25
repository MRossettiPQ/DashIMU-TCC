import { Component, Prop, Vue } from "vue-property-decorator";
import SocketService from "src/commons/services/SocketService";
import SessionService from "src/commons/services/SessionService";

@Component({
  name: "sensor-expansion",
})
class SensorExpansion extends Vue {
  loading = false;
  tab = "Sensor_1";

  @Prop()
  sensors;

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

  connect(index) {
    this.$emit("connectSensor", index);
  }

  disconnect(index) {
    this.$emit("disconnectSensor", index);
  }

  addSensor() {
    this.$emit("addSensor");
  }

  removeSensor(index) {
    this.$emit("removeSensor", index);
  }

  calibrate(index) {
    this.$emit("calibrateSensor");
  }
}

export default SensorExpansion;
