import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "Logar",
  components: {},
})
class Logar extends Vue {
  credencial = {
    usernameUser: "",
    senhaUser: "",
  };

  isRequired(value) {
    return value ? true : "This field is required";
  }

  computed = {
    loggedIn() {
      return this.$store.state.autentica.status.loggedIn;
    },
  };

  created() {
    if (this.loggedIn) {
      this.$router.push("/perfil");
    }
  }

  handleLogin(user) {
    this.loading = true;

    // console.log(user);

    this.$store.dispatch("autentica/login", user).then(
      () => {
        this.$router.push("/perfil");
      },
      (error) => {
        this.loading = false;
        this.message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  }
}

export default Logar;
