import { Component, Mixins, Prop } from 'vue-property-decorator'
import { ScreenMixin } from 'src/common/mixins/ScreenMixin'

@Component({
  name: 'table-measurements',
})
export default class TableMeasurements extends Mixins(ScreenMixin) {
  @Prop()
  sensor

  @Prop()
  columns

  mounted() {
    console.log('mounted', this.sensor)
  }
}
