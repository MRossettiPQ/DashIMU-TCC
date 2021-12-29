import { Component, Vue } from "vue-property-decorator";
import moment from "moment";

@Component({
  name: "Registrar",
})
class Registrar extends Vue {
  cadastro = {
    emailUser: "",
    nomeUser: "",
    nascUser: "",
    senhaUser: "",
    senhaConfirmar: "",
    usernameUser: "",
    telefoneUser: "",
  };

  dataNascimentoValidator(value) {
    return (
      moment(value, "DD/MM/YYYY").isBefore(moment().subtract(18, "years")) ||
      "Deve ser maior de 18 anos."
    );
  }

  computed = {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  };

  mounted() {
    if (this.loggedIn) {
      this.$router.push("/perfil");
    }
  }

  onSubmit(user) {
    this.$store.dispatch("autentica/register", user).then(
      (data) => {
        this.message = data.message;
      },
      (error) => {
        this.message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
    this.$router.push("/home");
  }
}

export default Registrar;
