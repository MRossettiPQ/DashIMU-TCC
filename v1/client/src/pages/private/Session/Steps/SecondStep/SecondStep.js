import { Component, Mixins, PropSync } from 'vue-property-decorator'
import SensorAvailable from './SensorAvailable.vue'
import { ScreenMixin } from 'src/common/mixins/ScreenMixin'

@Component({
  name: 'second-step',
  components: {
    SensorAvailable,
  },
})
export default class SecondStep extends Mixins(ScreenMixin) {
  @PropSync('connection')
  syncedConnection

  @PropSync('session')
  syncedSession
}
