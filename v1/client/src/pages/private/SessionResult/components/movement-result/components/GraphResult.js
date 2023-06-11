import { Component, Mixins, Prop, Ref, Watch } from 'vue-property-decorator'
import { ScreenMixin } from 'src/common/mixins/ScreenMixin'
import { GenericChartUtils } from 'src/common/utils/ChartUtils'

@Component({
  name: 'graph-result',
})
export default class GraphResult extends Mixins(ScreenMixin) {
  @Ref('chartElement')
  chartElement

  @Prop()
  movement

  @Prop()
  calculation

  chartState

  async mounted() {
    this.chartState = new GenericChartUtils(this.columns)
    this.update()
  }

  @Watch('numberOfMeasurements')
  @Watch('calculation', { deep: true })
  update() {
    if (this.chartElement) {
      if (!this.chartState?.loaded) {
        this.chartState.setChart(this.chartElement)
      }
      console.log('aqui', this.numberOfMeasurements)
      if (this.chartState?.loaded && this.numberOfMeasurements > 0) {
        this.chartState.setData(this.means, this.movement.type, true)
      }
    }
  }

  resize() {
    if (this.chartState?.loaded) {
      this.chartState.resize()
    }
  }

  get means() {
    return this.calculation?.atorn || []
  }

  get numberOfMeasurements() {
    return this.means?.length || 0
  }
}
