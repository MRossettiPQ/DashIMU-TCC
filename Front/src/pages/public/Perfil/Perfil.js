import { Vue, Component } from "vue-property-decorator";

@Component({
  name: "perfil"
})
class Perfil extends Vue {
  get bean() {
    return this.$store.state.autenticacao.user;
  }

  mounted() {
    if (!this.bean) {
      this.$router.push("/logar").then(r => console.log(r));
    }
  }
}

export default Perfil;
