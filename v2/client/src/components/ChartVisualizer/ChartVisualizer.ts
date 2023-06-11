import { Component, Mixins, Prop, Ref, Watch } from 'vue-property-decorator';
import { ScreenMixin } from 'src/common/mixins/ScreenMixin';
import { SensorUtil } from 'src/common/utils/SessionController/SensorUtil';
import { ChartUtils, ColumnOption } from 'src/common/utils/ChartUtils';

@Component({
  name: 'chart-visualizer',
})
export default class ChartVisualizer extends Mixins(ScreenMixin) {
  chartState!: ChartUtils;

  @Prop()
  sensors!: SensorUtil[];

  @Prop()
  tableColumns?: ColumnOption[];

  columns: string[] = [
    'Roll',
    'Pitch',
    'Yaw',
    // 'Quaternion_W',
    // 'Quaternion_X',
    // 'Quaternion_Y',
    // 'Quaternion_Z',
  ];

  @Ref('chartElement')
  chartElement!: HTMLElement;

  @Prop()
  smooth?: boolean;

  async mounted() {
    this.chartState = new ChartUtils(this.tableColumns);
    this.update();
  }

  @Watch('sensors')
  update() {
    if (this.chartElement) {
      if (!this.chartState?.loaded) {
        this.chartState.setChart(this.chartElement);
        // window.onresize = this.chartState.resize;
      }

      if (this.chartState?.loaded && this.numberOfMeasurements > 0) {
        this.chartState.setData(this.sensors, this.columns, this.smooth);
      }
    }
  }

  resize() {
    console.log('resize');
    if (this.chartState?.loaded && this.numberOfMeasurements > 0) {
      this.chartState.resize();
    }
  }

  get numberOfMeasurements() {
    return this.sensors[0]?.gyro_measurements?.length || 0;
  }
}
