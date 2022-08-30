import { Component, Prop, Vue, Ref } from "vue-property-decorator";
import PatientService from "src/commons/services/PatientService";
import FormUtils from "src/commons/utils/FormUtils";
import MeasurementHistory from "./MeasurementHistory.vue";
import TableSession from "./Components/TableSession.vue";
import DateUtils from "src/commons/utils/DateUtils";
import PaginationUtils from "src/commons/utils/PaginationUtils";

@Component({
  name: "patient",
  components: { MeasurementHistory, TableSession },
})
class Patient extends Vue {
  @Ref("dialog")
  dialog;

  @Prop()
  id;

  bean = {};
  loading = false;

  show() {
    this.dialog.show();
  }

  hide(payload) {
    this.$emit("ok", payload ? payload : true);
    this.dialog.hide();
  }

  async mounted() {
    if (this.id !== null) {
      await this.dataLoad(this.id);
    } else {
      this.bean = {};
    }
  }

  async dataLoad(id) {
    try {
      this.bean = await PatientService.getPatient(id);
    } catch (e) {
      console.log(e);
    }
  }

  async save() {
    try {
      this.loading = true;
      await FormUtils.validateAsync(this.$refs.mainForm);
      this.bean = await PatientService.postPatient(this.bean);
      this.hide({ save: true });
    } catch (e) {
      console.log(e);
    } finally {
      this.loading = false;
    }
  }

  filterDate(date) {
    return DateUtils.getDateFormated(date);
  }
}

export default Patient;
