import { Component, Prop, Ref, Vue } from "vue-property-decorator";
import * as echarts from "echarts";
import { throttle } from "quasar";

@Component({
  name: "v-e-chart",
})
class VEChart extends Vue {
  @Ref("chart")
  chart;

  div = null;

  @Prop()
  values;

  @Prop({ required: true })
  option;

  myChart = null;
  optionRendered = null;

  get dataLoaded() {
    return this.values;
  }

  mounted() {
    this.setChart();
  }

  setChart() {
    if (this.dataLoaded !== null) {
      this.optionRendered = this.option;
      if (this.optionRendered !== null) {
        this.optionRendered.series = [
          {
            name: "Gyro Measurement",
            type: "line",
            symbol: "none",
            sampling: "lttb",
            itemStyle: {
              color: "#1976D2",
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#26A69A",
                },
                {
                  offset: 1,
                  color: "#1976D2",
                },
              ]),
            },
            data: this.dataLoaded,
          },
        ];

        this.makeChart({ options: this.optionRendered });
      }
    }
  }

  makeChart({ options }) {
    // reference -> https://echarts.apache.org/
    const opts = {
      toolbox: {
        feature: {
          restore: {},
          saveAsImage: {},
          dataView: { readOnly: true },
          magicType: { type: ["line", "bar"] },
        },
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
    try {
      this.myChart = echarts.init(document.getElementById("chart"), null, {
        renderer: "svg",
      });
      this.myChart.setOption(opts);
      window.onresize = this.resizeChart;
    } catch (e) {
      console.log("makeChart", e);
    }
    console.log();
  }

  resizeChart = throttle(this.resize, 500);

  resize() {
    this.myChart?.resize();
  }

  beforeDestroy() {
    this.myChart = null;
  }
}

export default VEChart;
