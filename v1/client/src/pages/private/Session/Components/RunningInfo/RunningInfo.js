import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { throttle } from 'quasar'

@Component({
  name: 'running-info',
})
export default class RunningInfo extends Vue {
  @Prop()
  connection

  @Watch('connection.registeredSensorsList', { deep: true })
  calcAngle = throttle(() => this.calc(), 400)

  angle = 0

  calc() {
    const pos = this.connection.numberOfMeasurements
    if (this.connection.numberOfMeasurements === 0) {
      this.angle = 0
    }
    if (this.connection.registeredSensorsList?.[0]) {
      const measurement1 = this.connection.registeredSensorsList[0]?.gyro_measurements?.[pos - 1]
      const measurement2 = this.connection.registeredSensorsList[1]?.gyro_measurements?.[pos - 1]
      if (!!measurement1 && !!measurement2) {
        const value = this.connection.calculateQuaternionAngle(measurement1, measurement2)
        this.angle = Number(value).toFixed(3)
      }
    }
  }
}
