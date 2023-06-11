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
    {
      field: 'Roll',
      label: 'Roll',
    },
    {
      field: 'Pitch',
      label: 'Pitch',
    },
    {
      field: 'Yaw',
      label: 'Yaw',
    },
    {
      field: 'Euler_X',
      label: 'Euler X',
    },
    {
      field: 'Euler_Y',
      label: 'Euler Y',
    },
    {
      field: 'Euler_Z',
      label: 'Euler Z',
    },
    {
      field: 'Quaternion_X',
      label: 'Quaternion X',
    },
    {
      field: 'Quaternion_Y',
      label: 'Quaternion Y',
    },
    {
      field: 'Quaternion_Z',
      label: 'Quaternion Z',
    },
    {
      field: 'Quaternion_W',
      label: 'Quaternion W',
    },
  ]
}
