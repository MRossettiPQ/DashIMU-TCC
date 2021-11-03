export default {
  name: "Perfil",
  computed: {
    currentUser() {
      return this.$store.state.autentica.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/logar");
    }
  }
};
