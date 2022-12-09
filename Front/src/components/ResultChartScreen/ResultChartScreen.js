import {Component, Prop, Ref, Vue, Watch} from "vue-property-decorator";
import VEChart from "../VEChart/VEChart.vue";
import {PaginationUtils} from "src/commons/utils/PaginationUtils";

@Component({
  name: "result-chart-screen",
  components: {
    VEChart
  }
})
class ResultChartScreen extends Vue {
  @Ref("chart")
  chart;

  @Prop()
  sessionId

  tabPanel = "Movimento_0";
  movTab = "Tabela";
  filter = ""
  pagination = null
  selectedMovement = null

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
    if(this.result.length > 0){
      this.pagination = PaginationUtils.create({
        url: `/api/session/${this.sessionId}/movement/mensuration`,
        infinite: false
      });
      this.selectedMovement = this.result[0].movement
      await this.search()
    }
  }

  async search() {
    await this.pagination.search({ movementId: this.selectedMovement.id })
  }

  async selectMovement(movement){
    this.selectedMovement = movement
    await this.search()
  }

  columns = [
    {
      align: "center",
      label: "Number Mensuration",
      field: "numberMensuration",
      style: "width: 50px",
      sortable: true,
    },
    {
      align: "center",
      label: "Sensor Name",
      field: "sensorName",
      style: "width: 50px",
    },
    {
      align: "center",
      label: "Roll",
      field: "Roll",
      style: "width: 50px",
    },
    {
      align: "center",
      label: "Pitch",
      field: "Pitch",
      style: "width: 50px",
    },
    {
      align: "center",
      label: "Yaw",
      field: "Yaw",
      style: "width: 50px",
    },
    {
      align: "center",
      label: "ID Measurement",
      field: "id",
      style: "width: 50px",
      sortable: true,
    },
  ]
}

export default ResultChartScreen;
