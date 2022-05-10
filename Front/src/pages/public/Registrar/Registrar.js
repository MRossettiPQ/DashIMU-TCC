import { Component, Vue } from "vue-property-decorator";
import FormUtils from "../../../commons/utils/FormUtils";
import PacienteService from 'src/commons/services/PacienteService';
import AutenticaService from 'src/commons/services/AutenticaService';

@Component({
  name: "Registrar"
})
class Registrar extends Vue {
  loading = false;
  bean = {
    emailUser: "",
    nomeUser: "",
    nascUser: "",
    senhaUser: "",
    senhaConfirmar: "",
    usernameUser: "",
    telefoneUser: ""
  };

  get loggedIn() {
    return this.$store.state.auth?.status?.loggedIn;
  }

  mounted() {
    if (this.loggedIn) {
      this.$router.push("/perfil");
    }
  }

  async onSubmit() {
    try {
      this.loading = true;
      await FormUtils.validateAsync(this.$refs.mainForm);

      AutenticaService.register(this.bean).then(
        response => {
          return Promise.resolve(response.data);
        },
        error => {
          return Promise.reject(error);
        }
      );

      await this.$router.push("/home");
    } catch (e) {
      console.log(e);
    } finally {
      this.loading = false;
    }
  }
}

export default Registrar;
