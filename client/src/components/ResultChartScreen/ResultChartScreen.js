import { Component, Prop, Ref, Vue, Watch } from "vue-property-decorator";
import VEChart from "../VEChart/VEChart.vue";
import { LoadDataUtils } from "src/commons/utils/LoadDataUtils";
import SessionService from "src/commons/services/SessionService";

@Component({
  name: "result-chart-screen",
  components: {
    VEChart,
  },
})
class ResultChartScreen extends Vue {
  @Ref("chart")
  chart;

  @Prop()
  sessionId;

  @Prop()
  movementId;

  tabPanel = "Movimento_0";
  movTab = "Tabela";
  filter = "";

  pagination = LoadDataUtils.pagination({
    toLoad: SessionService.getMensurationListBySession,
    infinite: false,
  });
  selectedMovement = null;

  @Prop()
  result;

  @Prop()
  loading;

  @Watch("result")
  @Watch("loading")
  updateChart() {
    if (this.loading === false && this.result.length) {
      console.log("updateChart");
    }
    console.log(this.result);
  }

  beforeDestroy() {
    this.myChart = null;
  }

  async mounted() {
    if (this.result?.length > 0) {
      this.selectedMovement = this.result[0].movement;

      await this.search();
    }
  }

  async search() {
    await this.pagination.search({
      options: {
        idSession: this.sessionId,
        movementId: this.selectedMovement.id,
      },
    });
  }

  async selectMovement(movement) {
    this.selectedMovement = movement;
    this.movTab = "Tabela";
    await this.search();
  }

  columns = [
    {
      align: "center",
      label: "Number Mensuration",
      field: "numberMensuration",
      name: "numberMensuration",
      style: "width: 50px",
      format: (val) => Number(val),
      sortable: true,
    },
    {
      align: "center",
      label: "Sensor Name",
      field: "sensorName",
      name: "sensorName",
      style: "width: 50px",
    },
    {
      align: "center",
      label: "Sensor Id",
      field: "sensorId",
      name: "sensorId",
      style: "width: 50px",
      format: (val) => Number(val),
      sortable: true,
    },
    {
      align: "center",
      label: "Roll",
      field: "Roll",
      name: "Roll",
      style: "width: 50px",
      format: (val) => Number(val).toFixed(3),
      sortable: true,
    },
    {
      align: "center",
      label: "Pitch",
      field: "Pitch",
      name: "Pitch",
      style: "width: 50px",
      format: (val) => Number(val).toFixed(3),
      sortable: true,
    },
    {
      align: "center",
      label: "Yaw",
      field: "Yaw",
      name: "Yaw",
      style: "width: 50px",
      format: (val) => Number(val).toFixed(3),
      sortable: true,
    },
    {
      align: "center",
      field: "Euler_X",
      name: "Euler_X",
      label: "Euler X",
      format: (val) => Number(val).toFixed(3),
      sortable: true,
    },
    {
      align: "center",
      field: "Euler_Y",
      name: "Euler_Y",
      label: "Euler Y",
      format: (val) => Number(val).toFixed(3),
      sortable: true,
    },
    {
      align: "center",
      field: "Euler_Z",
      name: "Euler_Z",
      label: "Euler Z",
      format: (val) => Number(val).toFixed(3),
      sortable: true,
    },
    {
      align: "center",
      label: "ID Measurement",
      field: "id",
      name: "id",
      style: "width: 50px",
      format: (val) => Number(val),
      sortable: true,
    },
  ];
}

export default ResultChartScreen;
