import { Component, Vue } from "vue-property-decorator";
import FormUtils from "../../../commons/utils/FormUtils";
import AutenticaService from '../../../commons/services/AutenticaService';
import RotInputDate from 'components/RotInputDate/RotInputDate.vue';

@Component({
  name: "Registrar",
  components: {RotInputDate}
})
class Registrar extends Vue {
  loading = false;
  bean = {
    emailUsuario: "",
    nomeUsuario: "",
    nascUsuario: "",
    senhaUsuario: "",
    senhaConfirmar: "",
    usernameUsuario: "",
    telefoneUsuario: ""
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
