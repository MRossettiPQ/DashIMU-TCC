import { Component, Prop, Ref, Vue } from "vue-property-decorator";
import DateUtils from "src/commons/utils/DateUtils";
import FormUtils from "src/commons/utils/FormUtils";

@Component({
  name: "complete-session-expansion",
})
class CompleteSessionExpansion extends Vue {
  @Prop()
  sessionBean;

  @Prop()
  numberOfMeasurements;

  @Prop()
  loadingSave;

  @Ref("refForm")
  refForm;

  async saveSession() {
    try {
      if (this.numberOfMeasurements === 0) {
        FormUtils.showErrorMsg("You need to take some measurements first");
        return;
      }
      await FormUtils.validateAsync(this.refForm);
      this.$emit("saveSession");
    } catch (e) {
      console.log(e);
    }
  }
}

export default CompleteSessionExpansion;
