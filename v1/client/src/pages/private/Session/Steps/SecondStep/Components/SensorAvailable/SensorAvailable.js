import { Component, Emit, Prop, PropSync, Vue } from 'vue-property-decorator'

@Component({
  name: 'sensor-available',
})
class SensorAvailable extends Vue {
  @Prop({ type: Object })
  sensor

  @Prop({ type: Boolean })
  isTinyScreen

  @PropSync('registeredSensorsList', { type: Array, default: [] })
  syncRegisteredSensorsList

  @PropSync('session')
  syncedSession

  get stateSensorInConnectedList() {
    return this.syncRegisteredSensorsList?.find((sensor) => sensor?.device?.ip === this.sensor?.ip)
  }

  get connected() {
    return !!this.stateSensorInConnectedList?.device?.active
  }

  get nameSensor() {
    return this.sensor?.nameSensor
  }

  get measurementNumber() {
    return this.stateSensorInConnectedList?.gyro_measurements?.length
  }

  @Emit('connect')
  connect() {
    return this.sensor
  }

  @Emit('disconnect')
  disconnect() {
    return this.sensor
  }

  @Emit('calibrate')
  calibrate() {
    return this.sensor
  }

  get menuSensor() {
    return [
      {
        label: 'Calibrate',
        icon: 'iso',
      },
    ]
  }
}

export default SensorAvailable
