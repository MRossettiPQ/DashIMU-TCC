import { Component, Prop, PropSync, Vue } from 'vue-property-decorator'
import RunningInfo from '../RunningInfo/RunningInfo.vue'
import { ExportCSV } from 'src/common/utils/CSVUtils'
import { Notify } from 'quasar'
import DialogUtils from 'src/common/utils/DialogUtils'
import CheckMeasurementsDialog from '../CheckMeasurementsDialog/CheckMeasurementsDialog.vue'

@Component({
  name: 'stepper-header',
  components: {
    RunningInfo,
  },
})
export default class StepperHeader extends Vue {
  exportFile = new ExportCSV()

  @Prop()
  sessionConnection

  @PropSync('session')
  syncedSession

  @Prop()
  navigation

  @Prop()
  patient

  get connected() {
    return this.sessionConnection?.isConnectedBackend
  }

  get showActualMovement() {
    return (
      !!this.syncedSession.actualRunningMovement?.label &&
      this.navigation.actualStepValue === 'run-procedure'
    )
  }

  notification(message, color) {
    Notify.create({
      message,
      color,
      textColor: 'white',
    })
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

  async openCheckMeasurements() {
    try {
      await DialogUtils.show(CheckMeasurementsDialog, {
        session: this.syncedSession,
      })
    } catch (e) {
      console.log(e)
    }
  }
}
