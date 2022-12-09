import {Component, Prop, Vue} from "vue-property-decorator";
import axios from "axios";
import FormUtils from "src/commons/utils/FormUtils";
import {Notify} from "quasar";

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

  @Prop()
  suggestion;

  @Prop({type: Boolean, default: false})
  connectToSensor;

  get showCard() {
    if (this.connectToSensor) {
      return this.loaded;
    }
    return true;
  }

  async created() {
    try {
      if (this.connectToSensor) {
        this.sensor['ip'] = "192.168.4.1";
      } else {
        this.sensor.ip = this.sensor.ip.replace(/['"!@#$%^&*]/g, "");
      }
      if (this.sensor !== null) {
        this.Axios = axios.create({
          baseURL: `http://${this.sensor.ip}:80`,
        });
        await this.getSensorInfo();
      }
    } catch (e) {
      console.log(e)
    }
  }

  async getSensorInfo() {
    try {
      this.loading = true;
      const { data } = await this.Axios.get("/api/configuration");
      this.config = {
        ...data,
      };
      this.loaded = true;
    } catch (e) {
      console.log(e);
    } finally {
      this.loading = false;
    }
  }

  async getSensorMeasurement() {
    try {
      this.loadingMeasurement = true;
      const { data } = await this.Axios.get("/api/measurement");
      if(data?.type === "UNIQUE_MEASUREMENT"){
        this.measurement = {
          ...data.message,
        };
      }
    } catch (e) {
      console.log(e);
    } finally {
      this.loadingMeasurement = false;
    }
  }

  async postSensorConfig() {
    try {
      this.loadingSave = true;
      await FormUtils.validateAsync(this.$refs.mainForm);
      const form = {
        ssid: this.config.ssid,
        password: this.config.password,
        backend: this.config.backend,
        backendPort: this.config.backendPort,
        nameSensor: this.config.nameSensor,
      };
      const result = await this.Axios.post(
        "/api/configuration", {}, {
          params: {
            ...form
          }
        }
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
  changeSSID(){
    this.config.password = ""
  }
}

export default SensorOptions;
