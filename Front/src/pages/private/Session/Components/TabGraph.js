import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import * as echarts from "echarts";

@Component({
  name: "tab-graph",
})
class TabGraph extends Vue {
  @Prop()
  label;

  @Prop({ type: Array, default: [] })
  data;

  myChart = null;

  get graphDataLength() {
    if (this.myChart !== null) {
      this.redrawChart();
    } else {
      this.createChart();
    }

    return this.data[0]?.gyro_measurements?.length;
  }

  get graphData() {
    return this.data;
  }

  createChart() {
    console.log("createChart");
    this.myChart = echarts.init(document.getElementById("eChart"), null, {
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: "none",
          },
          restore: {},
          saveAsImage: {},
          dataView: { readOnly: true },
          magicType: { type: ["line", "bar"] },
        },
      },
      title: {
        left: "center",
        text: `Actual session`,
      },
      yAxis: {
        boundaryGap: [0, "100%"],
        type: "value",
      },
      renderer: "svg",
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
    });
  }

  redrawChart() {
    // reference -> https://echarts.apache.org/
    console.log("redrawChart");
    let xAxisArray = [];
    let index = 0;
    while (index < this.graphData[0].gyro_measurements?.length) {
      xAxisArray.push(index);
    }
    const opts = {
      xAxis: {
        type: "category",
        boundaryGap: false,
        axisLine: { onZero: true },
        data: xAxisArray,
      },
      series: [],
    };
    this.graphData.map((data) => {
      const primary = Math.floor(Math.random() * 16777215).toString(16);
      const secondary = Math.floor(Math.random() * 16777215).toString(16);
      opts.series.push({
        name: data.sensorName,
        type: "line",
        symbol: "none",
        sampling: "lttb",
        itemStyle: {
          color: primary,
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: secondary,
            },
            {
              offset: 1,
              color: primary,
            },
          ]),
        },
        data: data.gyro_measurements,
      });
    });
    this.myChart.setOption(opts);
  }
}

export default TabGraph;
