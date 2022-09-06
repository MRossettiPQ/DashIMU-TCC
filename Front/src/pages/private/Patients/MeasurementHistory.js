import { Component, Prop, Ref, Vue } from "vue-property-decorator";
import DialogHeader from "components/DialogHeader/DialogHeader.vue";
import { PaginationUtils } from "src/commons/utils/PaginationUtils";

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

  columns = [
    {
      align: "center",
      label: "Number Mensuration",
      field: "numberMensuration",
    },
    {
      align: "center",
      label: "Sensor Name",
      field: "sensorName",
    },
    {
      align: "center",
      label: "Roll",
      field: "Roll",
    },
    {
      align: "center",
      label: "Pitch",
      field: "Pitch",
    },
    {
      align: "center",
      label: "Yaw",
      field: "Yaw",
    },
    {
      align: "center",
      label: "ID Measurement",
      field: "idMeasurement",
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
    if (this.id !== null) {
      this.pagination = PaginationUtils.create({
        url: `/api/session/${this.id}/mensuration`,
        infinite: true,
      });
      await this.pagination.search();
    }
  }
}

export default MeasurementHistory;
