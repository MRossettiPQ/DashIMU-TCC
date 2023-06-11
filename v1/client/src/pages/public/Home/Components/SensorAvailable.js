import { Component, Prop, PropSync, Ref, Vue } from 'vue-property-decorator'
import { Request } from 'src/common/utils/AxiosUtils'
import { FormUtils } from 'src/common/utils/FormUtils'
import { Notify } from 'quasar'

@Component({
  name: 'sensor-available',
})
export default class SensorAvailable extends Vue {
  request = new Request()

  loaded = false

  loading = false

  loadingSave = false

  loadingMeasurement = false

  errorMeasurements = false

  @Ref('mainForm')
  mainForm

  @PropSync('sensor')
  sensorSync

  @Prop({ type: Boolean, default: false })
  init

  @Prop()
  suggestion

  config = {
    ssid: '',
    password: '',
    backend: '',
    backendPort: '',
    sensorName: '',
    wifiList: [],
  }

  measurement = {
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
  }

  async created() {
    let api = {}
    try {
      if (this.init) {
        this.config = {
          ...this.sensorSync,
        }
        api = {
          timeout: 1000,
        }
      }

      this.request = this.request.create({
        baseURL: `http://${this.sensorSync?.ip}:80`,
        ...api,
      })
      // Solicita informações do sensor na rota do server dele
      await this.getSensorInfo()
      if (this.errorMeasurements) {
        this.loaded = true
      }
    } catch (e) {
      console.log(e)
    }
  }

  async getSensorInfo() {
    try {
      this.loading = true
      const { data } = await this.request.get('/api/configuration')
      this.config = {
        ...data,
      }
      this.loaded = true
    } catch (e) {
      console.log(e)
    } finally {
      this.loading = false
    }
  }

  async getSensorMeasurement() {
    try {
      this.loadingMeasurement = true
      const { data } = await this.request.get('/api/measurement')
      if (data?.type === 'UNIQUE_MEASUREMENT') {
        this.measurement = {
          ...data.message,
        }
      }
    } catch (e) {
      console.log(e)
    } finally {
      this.loadingMeasurement = false
    }
  }

  async postSensorConfig() {
    try {
      this.loadingSave = true
      await FormUtils.validateAsync(this.mainForm)

      await this.request.post(
        '/api/configuration',
        {},
        {
          params: {
            ...this.config,
          },
        }
      )

      Notify.create({
        message: 'Modulo será reiniciado e ficara temporariamente indisponível.',
        textColor: 'white',
        color: 'success',
      })
    } catch (e) {
      console.log(e)
    } finally {
      this.loadingSave = false
    }
  }
}
