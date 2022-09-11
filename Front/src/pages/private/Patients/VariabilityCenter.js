import { Component, Prop, Ref, Vue } from "vue-property-decorator";
import DialogHeader from "components/DialogHeader/DialogHeader.vue";
import { FetchUtils, PaginationUtils } from "src/commons/utils/PaginationUtils";
import PatientService from "src/commons/services/PatientService";
import SessionService from "src/commons/services/SessionService";

@Component({
  name: "measurement-history",
  components: { DialogHeader },
})
class MeasurementHistory extends Vue {
  @Ref("dialog")
  dialog;

  @Ref("graph")
  graph;

  @Prop()
  id;

  bean = null;
  series = [
    {
      type: "line",
      name: "variability-center",
      data: [],
    },
  ];

  show() {
    this.dialog.show();
  }

  hide(payload) {
    this.$emit("ok", payload ? payload : true);
    this.dialog.hide();
  }

  async mounted() {
    try {
      this.bean = FetchUtils.create({
        url: `/api/session/${this.id}/scilab`,
      });
      await this.bean.search();
      if (this.bean.data !== null) {
        this.series[0].data = this.bean.data.atorn;
      }
    } catch (e) {
      console.log(e);
    }
  }

  get dataLoaded() {
    return this.bean?.dataLoaded;
  }

  get graphData() {
    return this.series;
  }

  chartOptions = {
    chart: {
      id: "variability-center",
      type: "line",
      zoom: {
        enabled: true,
      },
      animations: {
        enabled: false,
      },
      markers: {
        size: 0,
      },
    },
    stroke: {
      curve: "straight",
    },
    xaxis: {
      type: "decimal",
      show: false,
    },
    yaxis: {
      opposite: true,
    },
    tooltips: {
      legend: {
        display: false,
      },
      responsive: true,
      maintainAspectRatio: false,
    },
    legend: {
      horizontalAlign: "left",
    },
  };
}

export default MeasurementHistory;
