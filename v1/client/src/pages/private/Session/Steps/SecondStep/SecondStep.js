import { Component, Mixins, Prop, PropSync } from 'vue-property-decorator'
import SensorRegistered from './Components/SensorConnected/SensorRegistered.vue'
import SensorAvailable from './Components/SensorAvailable/SensorAvailable.vue'
import { ScreenMixin } from 'src/common/mixins/ScreenMixin'

@Component({
  name: 'second-step',
  components: {
    SensorRegistered,
    SensorAvailable,
  },
})
export default class SecondStep extends Mixins(ScreenMixin) {
  @Prop()
  connection

  @PropSync('session')
  syncedSession
}
