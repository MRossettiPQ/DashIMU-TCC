import { Component, Prop, PropSync, Vue } from 'vue-property-decorator'
import RunningInfo from '../RunningInfo/RunningInfo.vue'
import { ExportCSV } from 'src/common/utils/CSVUtils'

@Component({
  name: 'stepper-header',
  components: {
    RunningInfo,
  },
})
export default class StepperHeader extends Vue {
  exportFile = new ExportCSV()

  @Prop()
  menuRef

  @Prop()
  connection

  @PropSync('session')
  syncedSession

  @Prop()
  navigation

  get connected() {
    return this.connection?.isConnectedBackend
  }

  get showActualMovement() {
    return (
      !!this.syncedSession.actualRunningMovement?.label &&
      this.navigation.actualStepValue === 'run-procedure'
    )
  }

  openDrawer() {
    this.menuRef?.toggle()
  }
}
