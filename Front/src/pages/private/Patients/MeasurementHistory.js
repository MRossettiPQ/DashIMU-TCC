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
      name: "name",
      align: "left",
      label: "Nome",
      field: "name",
    },
    {
      name: "idPatient",
      align: "left",
      label: "ID Patient",
      field: "idPatient",
    },
    {
      name: "cpf",
      align: "left",
      label: "CPF",
      field: "cpf",
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
    }
  }
}

export default MeasurementHistory;
