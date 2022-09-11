import {Component, Prop, Vue} from "vue-property-decorator";

@Component({
  name: "tab-graph",
})
class TabGraph extends Vue {
  @Prop()
  label;

  @Prop({type: Array, default: []})
  data;

  get graphData() {
    return this.data
  }

  chartOptions = {
    chart: {
      id: "variability-center",
      type: "line",
      zoom: {
        enabled: true,
      },
    },
    stroke: {
      curve: "straight",
    },
    xaxis: {
      type: "decimal",
    },
    yaxis: {
      opposite: true,
    },
    legend: {
      horizontalAlign: "left",
    },
  };
}

export default TabGraph;
