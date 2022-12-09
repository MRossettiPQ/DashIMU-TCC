import { Component, Prop, Ref, Vue } from "vue-property-decorator";
import PatientService from "src/commons/services/PatientService";
import FormUtils from "src/commons/utils/FormUtils";
import MeasurementHistory from "./MeasurementHistory.vue";
import TableSession from "./Components/TableSession.vue";
import DateUtils from "src/commons/utils/DateUtils";
import { LoadDataUtils } from "src/commons/utils/LoadDataUtils";

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
      this.bean = await this.fetchData.load({ id: this.id });
    } else {
      this.bean = {};
    }
  }

  fetchData = LoadDataUtils.load({
    toLoad: PatientService.getPatient,
  });

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

  get isMobile() {
    return this.$q.platform.is.mobile;
  }
}

export default Patient;
