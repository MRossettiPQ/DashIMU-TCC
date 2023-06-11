import { Component, Mixins, Prop, PropSync } from 'vue-property-decorator'
import SensorRegistered from './Components/SensorConnected/SensorRegistered.vue'
import SensorAvailable from './Components/SensorAvailable/SensorAvailable.vue'
import { ScreenMixin } from 'src/common/mixins/ScreenMixin'

@Component({
  name: 'select-sensor',
  components: {
    SensorRegistered,
    SensorAvailable,
  },
})
export default class SelectSensor extends Mixins(ScreenMixin) {
  @Prop()
  sessionConnection

  @PropSync('session')
  syncedSession
}
