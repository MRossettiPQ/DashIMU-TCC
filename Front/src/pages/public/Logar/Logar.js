import { Component, Vue } from "vue-property-decorator";
import FormUtils from "src/commons/utils/FormUtils";

@Component({
  name: "Logar",
  components: {}
})
class Logar extends Vue {
  loading = false;
  bean = {
    usernameUsuario: "",
    senhaUsuario: ""
  };

  get loggedIn() {
    return this.$store.state.autenticacao.status.loggedIn;
  }

  created() {
    try {
      if (this.loggedIn) {
        this.$router.push("/perfil");
      }
    } catch (e) {
      console.log(e);
    }
  }

  async onSubmit() {
    try {
      this.loading = true;

      await FormUtils.validateAsync(this.$refs.mainForm);
      this.$store.dispatch("autenticacao/login", this.bean).then(
        () => {
          this.$router.push("/perfil");
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
    } catch (e) {
      console.log(e);
    } finally {
      this.loading = false;
    }
  }
}

export default Logar;
