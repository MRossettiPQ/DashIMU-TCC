import { Component, Mixins, Prop, PropSync } from 'vue-property-decorator'
import { ScreenMixin } from 'src/common/mixins/ScreenMixin'

@Component({
  name: 'movement',
})
export default class Movement extends Mixins(ScreenMixin) {
  @PropSync('movement')
  syncedMovement

  @Prop()
  order

  @PropSync('session')
  syncedSession
}
