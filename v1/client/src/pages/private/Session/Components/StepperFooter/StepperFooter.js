import { Component, Prop, PropSync, Vue } from 'vue-property-decorator'
import { Notify } from 'quasar'

@Component({
  name: 'stepper-footer',
})
export default class StepperFooter extends Vue {
  @PropSync('connection')
  syncedConnection

  @Prop()
  navigation

  @Prop()
  loadingSave

  @PropSync('session')
  syncedSession

  get disableAddMeasurement() {
    // Desabilita botão que adiciona as medições temporarias ao movimento
    // Caso tenha medições liberar
    if (this.syncedConnection.numberOfMeasurements > 0) {
      if (this.syncedConnection.disableStartBtn) {
        // Caso o botão de start esteja desabilitado, desabilita se a medição estiver em progresso
        return this.syncedConnection.inProgress
      }
      return false
    } else {
      // Caso não tenha qualquer medição a um sensor
      return true
    }
  }

  addMeasurement() {
    // Adiciona as medições temporarias exibidas na tela a um movimento escolhido no input do drawer menu
    if (this.syncedConnection.numberOfMeasurements > 0) {
      if (this.syncedSession.running_movement !== null) {
        let sensors = []
        for (let sensor of this.syncedConnection.registeredSensorsList) {
          sensors.push({
            ...sensor,
          })
        }
        this.syncedSession.addSensorsToMovement(sensors)
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
      case 'third-step':
        return this.syncedConnection?.inProgress
      case 'second-step':
      default:
        return false
    }
  }

  get disableNextButton() {
    switch (this.navigation.actualStepValue) {
      case 'first-step':
        // Bloqueia caso não tenha movimentos
        if (this.syncedSession?.values?.movements.length < 1) {
          return true
        }
        // Bloqueia caso o procedimento esteja vazio ou tenha algum movimento sem o tipo
        return (
          this.syncedSession?.values?.procedure === '' ||
          this.syncedSession?.values?.movements?.some((m) => m.type === '')
        )
      case 'second-step':
        return (
          this.syncedConnection?.numberOfValidConnection < this.syncedSession?.minSensor ||
          this.syncedConnection?.numberOfValidConnection > this.syncedSession?.minSensor ||
          this.checkPositionBlank
        )
      case 'third-step':
        return this.syncedConnection?.blockSave || this.blockIfMovementsMeasurementsEmpty
      default:
        return false
    }
  }

  get blockIfMovementsMeasurementsEmpty() {
    // Bloqueia caso não tenha movimentos registrados
    if (this.syncedSession?.values?.movements.length < 1) {
      return true
    }
    // Bloqueia caso algum movimento não tenha sensor ou os sensores não tenham medições
    return this.syncedSession?.values?.movements?.some((m) => {
      // Bloqueia caso não tenha sensores registrados
      if (m.sensors.length < 1) {
        return true
      }
      // Bloqueia caso não tenha medições em algum sensor
      return m.sensors.some((s) => s.gyro_measurements.length < 1)
    })
  }

  get checkPositionBlank() {
    // Verifica se algum sensor registrado está com o campo position em branco, *este campo é obrigatorio
    return this.syncedConnection.registeredSensorsList.some((sr) => sr.position === '')
  }
}
