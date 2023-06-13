import { Component, Mixins, Prop, Ref, Watch } from 'vue-property-decorator'
import { ScreenMixin } from 'src/common/mixins/ScreenMixin'
import { GenericChartUtils } from 'src/common/utils/ChartUtils'

@Component({
  name: 'graph-angles',
})
export default class GraphAngles extends Mixins(ScreenMixin) {
  @Ref('chartElement')
  chartElement

  @Prop()
  movement

  @Prop()
  calculation

  chartState

  async mounted() {
    this.chartState = new GenericChartUtils(['eulerAngle', 'quaternionAngle', 'rollPitchYawAngle'])
    this.update()
  }

  @Watch('numberOfMeasurements')
  @Watch('calculation', { deep: true })
  update() {
    if (this.chartElement) {
      if (!this.chartState?.loaded) {
        this.chartState.setChart(this.chartElement)
      }
      if (this.chartState?.loaded && this.numberOfMeasurements > 0) {
        this.chartState.setData(
          this.angles,
          '',
          ['eulerAngle', 'quaternionAngle', 'rollPitchYawAngle'],
          true
        )
      }
    }
  }

  resize() {
    if (this.chartState?.loaded) {
      this.chartState.resize()
    }
  }

  get angles() {
    return this.calculation?.angles?.values || []
  }

  get numberOfMeasurements() {
    return this.angles?.length || 0
  }
}
