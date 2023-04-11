import { Component, Vue } from "vue-property-decorator";
import FormUtils from "src/commons/utils/FormUtils";

@Component({
  name: "configuration",
})
class Configuration extends Vue {
  loading = false;
  bean = {
    api: "",
  };

  async onSubmit() {
    try {
      this.loading = true;
      await FormUtils.validateAsync(this.$refs.mainForm);
      await this.$store.dispatch("Authentication/login", this.bean);
      await this.$router.push("/account");
    } catch (e) {
      console.log(e);
    } finally {
      this.loading = false;
    }
  }
}

export default Configuration;
