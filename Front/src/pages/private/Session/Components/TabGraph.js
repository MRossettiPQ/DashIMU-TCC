import {
  Component,
  Prop,
  PropSync,
  Ref,
  Vue,
  Watch,
} from "vue-property-decorator";
import * as echarts from "echarts";

@Component({
  name: "tab-graph",
})
class TabGraph extends Vue {
  @Prop()
  label;

  @Prop({ type: Array, default: [] })
  data;

  @Ref("eChart")
  eChart;

  myChart = null;

  option = {
    series: [],
  };

  get graphData() {
    return this.data;
  }

  makeChart({ elementId = "eChart", options }) {
    // reference -> https://echarts.apache.org/
    const opts = {
      yAxis: {
        boundaryGap: [0, "100%"],
        type: "value",
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        axisLine: { onZero: true },
      },
      dataZoom: [
        {
          type: "inside",
          start: 0,
          end: 10,
        },
        {
          start: 0,
          end: 10,
        },
      ],
      tooltip: {
        trigger: "axis",
        position: function (pt) {
          return [pt[0], "10%"];
        },
      },
      ...options,
    };
    const myChart = echarts.init(document.getElementById(elementId), null, {
      renderer: "canvas",
    });
    myChart.setOption(opts);
    this.myChart = myChart;
  }

  @Watch("data", { immediate: true, deep: true })
  redrawChart() {
    // reference -> https://echarts.apache.org/
    if (this.myChart !== null) {
      console.log("redrawChart");
      let opt = [];
      this.data.map((sensorData, index) => {
        const Roll = this.getColumn(sensorData.gyro_measurements, "Roll");
        const Yaw = this.getColumn(sensorData.gyro_measurements, "Yaw");
        const Pitch = this.getColumn(sensorData.gyro_measurements, "Pitch");
        opt.push(Roll);
        opt.push(Yaw);
        opt.push(Pitch);
      });
      console.log(this.myChart, this.eChart);
    }
  }

  getColumn(array, column) {
    return array.map((obj) => obj[`${column}`]);
  }

  mounted() {
    if (this.data.length) {
      this.data.map((sensorData, index) => {
        const infoSerie = {
          type: "line",
          symbol: "none",
          sampling: "lttb",
        };
        const Roll = this.getColumn(sensorData.gyro_measurements, "Roll");
        const Yaw = this.getColumn(sensorData.gyro_measurements, "Yaw");
        const Pitch = this.getColumn(sensorData.gyro_measurements, "Pitch");
        this.option.series.push({
          name: `${sensorData.sensorName} - Roll`,
          itemStyle: {
            color: "#" + parseInt(Math.random() * 0xffffff).toString(16),
          },
          data: Roll,
          ...infoSerie,
        });
        this.option.series.push({
          name: `${sensorData.sensorName} - Yaw`,
          itemStyle: {
            color: "#" + parseInt(Math.random() * 0xffffff).toString(16),
          },
          data: Yaw,
          ...infoSerie,
        });
        this.option.series.push({
          name: `${sensorData.sensorName} - Pitch`,
          itemStyle: {
            color: "#" + parseInt(Math.random() * 0xffffff).toString(16),
          },
          data: Pitch,
          ...infoSerie,
        });
      });
      this.makeChart({ elementId: "eChart", options: this.option });
    }
  }
}

export default TabGraph;
