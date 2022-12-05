import { Component, Prop, Vue } from "vue-property-decorator";
import axios from "axios";
import FormUtils from "src/commons/utils/FormUtils";
import { Notify } from "quasar";

@Component({
  name: "sensor-options",
})
class SensorOptions extends Vue {
  Axios = null;
  loading = false;
  loadingSave = false;
  loadingMeasurement = false;
  loaded = false;

  config = {
    ssid: "",
    password: "",
    backend: "",
    backendPort: "",
    nameSensor: "",
    wifiList: [],
  };

  measurement = {
    Roll: 0,
    Pitch: 0,
    Yaw: 0,
  };

  @Prop()
  sensor;

  @Prop({ type: Boolean, default: false })
  connectToSensor;

  get showCard() {
    if (this.connectToSensor) {
      return this.loaded;
    }
    return true;
  }

  async mounted() {
    if (this.connectToSensor) {
      this.sensor.ip = "192.168.4.1";
    } else {
      this.sensor.ip = this.sensor.ip.replace(/['"!@#$%^&*]/g, "");
    }
    if (this.sensor !== null) {
      this.Axios = axios.create({
        baseURL: `http://${this.sensor.ip}:80`,
      });
      await this.getSensorInfo();
    }
    console.log(this.sensor);
  }

  async getSensorInfo() {
    try {
      this.loadingMeasurement = true;
      const result = await this.Axios.get("/api/measurement");
      const parsed = JSON.parse(result?.data);
      this.config = {
        ...parsed,
      };
      this.loaded = true;
      console.log(parsed);
    } catch (e) {
      console.log(e);
    } finally {
      this.loadingMeasurement = false;
    }
  }

  async getSensorMeasurement() {
    try {
      this.loading = true;
      const result = await this.Axios.get("/api/configuration");
      const parsed = JSON.parse(result?.data);
      this.measurement = {
        ...parsed,
      };
    } catch (e) {
      console.log(e);
    } finally {
      this.loading = false;
    }
  }

  async postSensorConfig() {
    try {
      this.loadingSave = true;
      await FormUtils.validateAsync(this.$refs.mainForm);
      const result = await this.Axios.post(
        "/api/configuration",
        JSON.stringify(this.config)
      );
      Notify.create({
        message:
          "Modulo será reiniciado e ficara temporariamente indisponível.",
        textColor: "white",
        color: "success",
      });
      console.log(result);
    } catch (e) {
      console.log(e);
    } finally {
      this.loadingSave = false;
    }
  }
}

export default SensorOptions;
