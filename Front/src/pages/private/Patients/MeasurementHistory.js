import { Component, Prop, Ref, Vue } from "vue-property-decorator";
import DialogHeader from "components/DialogHeader/DialogHeader.vue";
import VariabilityCenter from "./VariabilityCenter.vue";
import { PaginationUtils } from "src/commons/utils/PaginationUtils";
import DialogUtils from "src/commons/utils/DialogUtils";

@Component({
  name: "measurement-history",
  components: { DialogHeader },
})
class MeasurementHistory extends Vue {
  @Ref("dialog")
  dialog;

  @Prop()
  id;

  loading = false;
  pagination = [];
  filter = "";
  variabilityCenter = {};

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
      field: "idMeasurement",
      style: "width: 50px",
      sortable: true,
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
    console.log("mounted");
    if (this.id !== null) {
      this.pagination = PaginationUtils.create({
        url: `/api/session/${this.id}/mensuration`,
        infinite: true,
      });
      await this.pagination.search();
      console.log(this.pagination.list);
    }
  }

  async getCalculationVariabilityCenter() {
    try {
      const data = await DialogUtils.asyncDialog(VariabilityCenter, {
        id: this.id,
      });
    } catch (e) {
      console.log(e);
    }
  }
}

export default MeasurementHistory;
