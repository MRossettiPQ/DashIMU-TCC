import { Component, Mixins, Prop, PropSync } from 'vue-property-decorator'
import { ScreenMixin } from 'src/common/mixins/ScreenMixin'

@Component({
  name: 'sensor-available',
})
class SensorAvailable extends Mixins(ScreenMixin) {
  @Prop({ type: Object })
  sensor

  @PropSync('registeredSensorsList', { type: Array, default: [] })
  syncRegisteredSensorsList

  @PropSync('session')
  syncedSession

  @PropSync('connection')
  syncedConnection

  get stateSensorInConnectedList() {
    return this.syncRegisteredSensorsList?.find((sensor) => sensor?.ip === this.sensor?.ip)
  }

  get connected() {
    return !!this.stateSensorInConnectedList?.active
  }

  // get connected() {
  //   return this.sensor?.device?.active
  // }
  //
  // get measurementNumber() {
  //   return this.sensor?.gyro_measurements?.length
  // }

  update(position) {
    this.connection.updateSensor({
      position,
      sensor: this.sensor,
    })
  }

  get nameSensor() {
    return this.sensor?.nameSensor
  }

  get measurementNumber() {
    return this.stateSensorInConnectedList?.gyro_measurements?.length
  }

  connect() {
    this.syncedConnection.connect(this.sensor)
  }

  disconnect() {
    this.syncedConnection.disconnect(this.sensor)
  }
}

export default SensorAvailable
