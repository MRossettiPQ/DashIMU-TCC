import { Component, Mixins, Prop, Ref, Watch } from 'vue-property-decorator'
import { ChartUtils } from 'src/common/utils/ChartUtils'
import { ScreenMixin } from 'src/common/mixins/ScreenMixin'

@Component({
  name: 'chart-visualizer',
})
export default class ChartVisualizer extends Mixins(ScreenMixin) {
  chartState

  @Prop()
  sensors

  @Prop()
  tableColumns

  columns = ['Roll', 'Pitch', 'Yaw']

  @Ref('chartElement')
  chartElement

  @Prop()
  smooth

  async mounted() {
    if (this.tableColumns.length) {
      this.columns = this.tableColumns
    }
    this.chartState = new ChartUtils(this.tableColumns)
    this.update()
  }

  @Watch('sensors', { deep: true })
  update() {
    if (this.chartElement) {
      if (!this.chartState?.loaded) {
        this.chartState.setChart(this.chartElement)
        // window.onresize = this.chartState.resize;
      }
      console.log('aqui')
      if (this.chartState?.loaded && this.numberOfMeasurements > 0) {
        this.chartState.setData(this.sensors, this.columns, this.smooth)
      }
    }
  }

  resize() {
    if (this.chartState?.loaded && this.numberOfMeasurements > 0) {
      this.chartState.resize()
    }
  }

  get numberOfMeasurements() {
    return this.sensors[0]?.gyro_measurements?.length || 0
  }
}
