import {
  Component,
  Prop,
  PropSync,
  Ref,
  Vue,
  Watch,
} from "vue-property-decorator";
import { SessionChartUtils } from "src/commons/utils/SessionChartUtils";
import * as echarts from "echarts";

@Component({
  name: "tab-graph",
})
class TabGraph extends Vue {
  @Prop({ type: Boolean })
  isTinyScreen;

  @Prop()
  sessionState;

  @PropSync("registeredSensorsList", { type: Array, default: [] })
  syncRegisteredSensorsList;

  @Ref("eChart")
  eChart;

  testChart = SessionChartUtils.create({
    charDataId: "device.ip",
    dataId: "ip",
    charDataValuesKey: "gyro_measurements",
    charDataNameKey: "sensorName",
    columns: ["Roll", "Pitch", "Yaw"],
  });

  @Watch("sessionState.numberOfMeasurements")
  update() {
    const option = this.testChart.set(this.sessionState.registeredSensorsList);
    this.setOption(option);
  }

  setOption(option) {
    this.chart.setOption(option);
  }

  mounted() {
    this.chart = echarts.init(document.getElementById("eChart"), null, {
      renderer: "canvas",
    });
    const option = this.testChart.set(this.sessionState.registeredSensorsList);
    this.setOption(option);
  }
}

export default TabGraph;
