import { Vue, Component } from "vue-property-decorator";

@Component({
  name: "perfil"
})
class Perfil extends Vue {
  get bean() {
    return this.$store.state.autenticacao.user;
  }
}

export default Perfil;
