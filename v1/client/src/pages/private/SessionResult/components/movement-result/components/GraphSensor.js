import { Component, Mixins, Prop } from 'vue-property-decorator'
import { ScreenMixin } from 'src/common/mixins/ScreenMixin'

@Component({
  name: 'graph-sensor',
})
export default class GraphSensor extends Mixins(ScreenMixin) {
  @Prop()
  movement

  @Prop()
  sensors

  columns = [
    'Roll',
    'Pitch',
    'Yaw',
    // 'Quaternion_X',
    // 'Quaternion_Y',
    // 'Quaternion_Z',
    // 'Quaternion_W',
  ]
}
