import { Component, Vue } from "vue-property-decorator";
import FormUtils from "../../../commons/utils/FormUtils";

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

      this.$store.dispatch("autenticacao/register", this.bean).then(
        data => {
          this.message = data.message;
        },
        error => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
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
