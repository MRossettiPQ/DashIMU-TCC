import {Component, Vue} from "vue-property-decorator";
import FormUtils from "src/commons/utils/FormUtils";

@Component({
  name: "Logar",
  components: {}
})
class Logar extends Vue {
  loading = false;
  bean = {
    username: "",
    password: ""
  };

  async onSubmit() {
    try {
      this.loading = true;
      await FormUtils.validateAsync(this.$refs.mainForm);
      await this.$store.dispatch("autenticacao/login", this.bean);
      await this.$router.push("/perfil");
    }
 catch (e) {
      console.log(e);
    }
 finally {
      this.loading = false;
    }
  }
}

export default Logar;
