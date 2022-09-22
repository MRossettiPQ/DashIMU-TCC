import { Component, Prop, Ref, Vue } from "vue-property-decorator";
import DialogHeader from "components/DialogHeader/DialogHeader.vue";
import { FetchUtils } from "src/commons/utils/PaginationUtils";
import * as echarts from "echarts";

@Component({
  name: "measurement-history",
  components: {
    DialogHeader,
  },
})
class MeasurementHistory extends Vue {
  @Ref("dialog")
  dialog;

  @Ref("graph")
  graph;

  @Prop()
  id;

  fetchData = null;
  bean = null;

  show() {
    this.dialog.show();
  }

  hide(payload) {
    this.$emit("ok", payload ? payload : true);
    this.dialog.hide();
  }

  get dataLoaded() {
    return this.fetchData?.dataLoaded;
  }

  get values() {
    return this.bean?.values;
  }

  async mounted() {
    try {
      this.fetchData = FetchUtils.create({
        url: `/api/session/${this.id}/scilab`,
      });
      await this.fetchData.search();
      if (this.fetchData.data !== null) {
        this.bean = this.fetchData.data;

        console.log(this.bean);

        if (this.bean?.chartOption) {
          this.bean.chartOption.series = [
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
              data: this.bean.atorn,
            },
          ];

          this.makeChart({ options: this.bean?.chartOption });
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  makeChart({ elementId = "eChart", options }) {
    // reference -> https://echarts.apache.org/
    const opts = {
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
    console.log("makeChart", opts);
    const myChart = echarts.init(document.getElementById(elementId), null, {
      renderer: "svg",
    });
    myChart.setOption(opts);
  }
}

export default MeasurementHistory;
