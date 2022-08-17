import {Component, Vue} from "vue-property-decorator";
import FormUtils from "../../../commons/utils/FormUtils";
import AutenticaService from '../../../commons/services/AutenticaService';

@Component({
  name: "Registrar"
})
class Registrar extends Vue {
  loading = false;
  bean = {
    email: "",
    name: "",
    password: "",
    passwordConfirm: "",
    username: "",
  };

  async onSubmit() {
    try {
      this.loading = true;
      await FormUtils.validateAsync(this.$refs.mainForm);

      await this.$store.dispatch("autenticacao/register", this.bean);
      await this.$router.push("/home");
    }
 catch (e) {
      console.log(e);
    }
 finally {
      this.loading = false;
    }
  }
}

export default Registrar;
