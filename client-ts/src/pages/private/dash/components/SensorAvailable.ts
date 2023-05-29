import { Component, Prop, PropSync, Ref, Vue } from 'vue-property-decorator';
import { SensorSocket } from 'src/common/models/Sensor';
import { QForm } from 'quasar';
import { FormUtils } from 'src/common/utils/FormUtils';
import NotifyUtils from 'src/common/utils/NotifyUtils';
import { GyroMeasurement } from 'src/common/models/GyroMeasurement';
import { AxiosInstance } from 'axios';

interface ResponseAxios {
  [key: string]: SensorSocket;
}

const success = 'Modulo será reiniciado e ficara temporariamente indisponível.';
@Component({ name: 'sensor-available' })
export default class SensorAvailable extends Vue {
  request: AxiosInstance = this.$axios;

  loaded = false;
  loading = false;
  loadingSave = false;
  loadingMeasurement = false;
  errorMeasurements = false;

  @Ref('mainForm')
  mainForm?: QForm;

  @PropSync('sensor')
  sensorSync?: SensorSocket;

  @Prop({ type: Boolean, default: false })
  init?: boolean;

  @Prop()
  suggestion?: unknown;

  config?: SensorSocket = {
    ssid: '',
    password: '',
    backend: '',
    backendPort: '',
    sensorName: '',
  };

  measurement: GyroMeasurement = {
    Roll: 0,
    Pitch: 0,
    Yaw: 0,
    sensorName: '',
    numberMensuration: 0,
    hourMensuration: '',
    Acc_X: 0,
    Acc_Y: 0,
    Acc_Z: 0,
    AccelX_mss: 0,
    AccelY_mss: 0,
    AccelZ_mss: 0,
    Gyr_X: 0,
    Gyr_Y: 0,
    Gyr_Z: 0,
    Mag_X: 0,
    Mag_Y: 0,
    Mag_Z: 0,
    Euler_X: 0,
    Euler_Y: 0,
    Euler_Z: 0,
    Quaternion_X: 0,
    Quaternion_Y: 0,
    Quaternion_Z: 0,
    Quaternion_W: 0,
  };

  async created() {
    let api = {};
    try {
      if (this.init) {
        this.config = {
          ...this.sensorSync,
        };
        api = {
          timeout: 1000,
        };
      }

      this.request = this.$api.create({
        baseURL: `http://${this.sensorSync?.ip}:80`,
        ...api,
      });
      // Solicita informações do sensor na rota do server dele
      await this.getSensorInfo();
      if (this.errorMeasurements) {
        this.loaded = true;
      }
    } catch (e) {
      console.log(e);
    }
  }

  async postSensorConfig() {
    // Enviar configuração para o sensor
    try {
      this.loadingSave = true;
      await FormUtils.validateAsync(this.mainForm);

      await this.request.post(
        '/api/configuration',
        {},
        {
          params: {
            ...this.config,
          },
        }
      );

      NotifyUtils.notifySuccess(success);
    } catch (e) {
      console.log(e);
    } finally {
      this.loadingSave = false;
    }
  }

  async getSensorInfo() {
    // Solicitar configurações do sensor
    try {
      this.loading = true;
      const { data }: ResponseAxios = await this.request.get(
        '/api/configuration'
      );
      if (typeof data === 'object') {
        this.config = data;
      }
      this.loaded = true;
    } catch (e) {
      console.log(e);
    } finally {
      this.loading = false;
    }
  }

  async getSensorMeasurement() {
    // Solicitar medição unica no sensor
    try {
      this.loadingMeasurement = true;
      const { data }: ResponseAxios = await this.request.get(
        '/api/measurement'
      );
      if (data.type === 'UNIQUE_MEASUREMENT') {
        this.measurement = {
          ...data.measurements,
        };
      }
    } catch (e) {
      console.log(e);
      this.errorMeasurements = true;
    } finally {
      this.loadingMeasurement = false;
    }
  }
}
