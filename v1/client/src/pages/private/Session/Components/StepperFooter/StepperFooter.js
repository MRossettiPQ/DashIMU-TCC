import { Component, Prop, PropSync, Vue } from 'vue-property-decorator'
import { Notify } from 'quasar'

@Component({
  name: 'stepper-footer',
})
export default class StepperFooter extends Vue {
  @Prop()
  sessionConnection

  @Prop()
  navigation

  @Prop()
  loadingSave

  @PropSync('session')
  syncedSession

  get disableAddMeasurement() {
    if (this.sessionConnection.numberOfMeasurements > 0) {
      if (this.sessionConnection.disableStartBtn) {
        return this.sessionConnection.inProgress
      }
      return false
    } else {
      return true
    }
  }

  addMeasurement() {
    if (this.sessionConnection.numberOfMeasurements > 0) {
      if (this.syncedSession.running_movement !== null) {
        this.syncedSession.addSensorsToMovement(this.sessionConnection.registeredSensorsList)
        Notify.create({
          message: 'Medições adicionadas ao movimento',
          textColor: 'white',
          color: 'success',
        })
      } else {
        Notify.create({
          message:
            'Você deve selecionar o procedimento que esta sendo realizado, botão de configuração no topo!',
          textColor: 'white',
          color: 'warning',
        })
      }
    } else {
      Notify.create({
        message: 'Você deve ter captado alguma medição para completar esse procedimento!',
        textColor: 'white',
        color: 'warning',
      })
    }
  }

  get disablePrevButton() {
    switch (this.navigation.actualStepValue) {
      case 'first-step':
        return true
      case 'run-procedure':
        return this.sessionConnection?.inProgress
      case 'select-sensor':
      default:
        return false
    }
  }

  get disableNextButton() {
    switch (this.navigation.actualStepValue) {
      case 'first-step':
        if (this.syncedSession?.values?.movements.length < 1) {
          return true
        }
        return (
          this.syncedSession?.values?.procedure === '' ||
          this.syncedSession?.values?.movements?.some((m) => m.type === '')
        )
      case 'select-sensor':
        return (
          this.sessionConnection?.numberOfValidConnection < this.syncedSession?.minSensor ||
          this.sessionConnection?.numberOfValidConnection > this.syncedSession?.minSensor ||
          this.checkPositionBlank
        )
      case 'run-procedure':
        if (this.sessionConnection?.blockSave) {
          return true
        } else {
          return this.checkMovementsMeasurements
        }
      default:
        return false
    }
  }

  get checkMovementsMeasurements() {
    if (this.syncedSession?.values?.movements.length < 1) {
      return true
    }
    return this.syncedSession?.values?.movements?.some((m) => {
      if (m.sensors.length < 1) {
        return true
      }
      return m.sensors.some((s) => s.gyro_measurements.length < 1)
    })
  }

  get checkPositionBlank() {
    return this.sessionConnection.registeredSensorsList.some((sr) => sr.position === '')
  }
}
