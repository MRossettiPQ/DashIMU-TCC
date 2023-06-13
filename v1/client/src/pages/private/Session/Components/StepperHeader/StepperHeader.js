import { Component, Prop, PropSync, Vue } from 'vue-property-decorator'
import RunningInfo from '../RunningInfo/RunningInfo.vue'

@Component({
  name: 'stepper-header',
  components: {
    RunningInfo,
  },
})
export default class StepperHeader extends Vue {
  @Prop()
  menuRef

  @PropSync('connection')
  syncedConnection

  @PropSync('session')
  syncedSession

  @Prop()
  navigation

  get connected() {
    return this.syncedConnection?.isConnectedBackend
  }

  get showActualMovement() {
    return (
      !!this.syncedSession.actualRunningMovement?.label &&
      this.navigation.actualStepValue === 'third-step'
    )
  }

  openDrawer() {
    this.menuRef?.toggle()
  }
}
