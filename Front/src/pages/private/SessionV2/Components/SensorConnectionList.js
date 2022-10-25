import { Component, Emit, Vue } from "vue-property-decorator";
import SocketService from "src/commons/services/SocketService";

@Component({
  name: "sensor-connection-list",
})
class SensorConnectionList extends Vue {
  loadingSensorList = false;
  actual = null;

  async mounted() {
    await this.listSensorsLoad();
    console.log(this.sensorListOptions);
  }

  async listSensorsLoad() {
    try {
      this.loadingSensorList = true;
      this.sensorListOptions = await SocketService.getSensorsList();
      console.log(this.sensorListOptions);
    } catch (e) {
      console.log(e);
    } finally {
      this.loadingSensorList = false;
    }
  }

  onLeft({ reset }) {
    this.$q.notify("Left action triggered. Resetting in 1 second.");
    reset();
  }

  onRight({ reset }) {
    this.$q.notify("Right action triggered. Resetting in 1 second.");
    reset();
  }

  @Emit("connectSensor")
  connect() {
    return this.actual;
  }
}

export default SensorConnectionList;
