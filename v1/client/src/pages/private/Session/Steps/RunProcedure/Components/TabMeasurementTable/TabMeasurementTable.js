import { Component, Mixins, Prop } from 'vue-property-decorator'
import { ScreenMixin } from 'src/common/mixins/ScreenMixin'

@Component({
  name: 'tab-measurement-table',
})
class TabMeasurementTable extends Mixins(ScreenMixin) {
  @Prop()
  sensor

  @Prop({ type: Array, default: [] })
  tableColumns

  get dataTableMeasurement() {
    return this.sensor?.gyro_measurements
  }
}

export default TabMeasurementTable
