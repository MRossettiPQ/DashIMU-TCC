export default {
  name: "Perfil",
  computed: {
    currentUser() {
      return this.$store.state.autenticacao.user;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/logar").then((r) => console.log(r));
    }
  },
};
