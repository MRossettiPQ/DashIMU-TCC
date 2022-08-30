import { Component, Vue, Watch } from "vue-property-decorator";
import EssentialLink from "components/EssentialLink/EssentialLink.vue";
import { Axios } from "src/commons/utils/AxiosUtils";

@Component({
  name: "public-app",
  components: { EssentialLink },
})
class PublicApp extends Vue {
  leftDrawerOpen = false;
  essentialLinks = [
    {
      title: "Home",
      caption: "Tela inicial",
      icon: "home",
      link: "/home",
    },
    {
      title: "Login",
      caption: "Para logar",
      icon: "login",
      link: "/logar",
      inLogged: true,
    },
    {
      title: "Registrar",
      caption: "Para registro",
      icon: "app_registration",
      link: "/register",
      inLogged: true,
    },
    {
      title: "Perfil",
      caption: "Ver perfil",
      icon: "account_circle",
      link: "/account",
      inLogged: false,
    },
    {
      title: "Pacientes",
      caption: "Ver pacientes",
      icon: "local_hospital",
      link: "/patients",
      inLogged: false,
    },
  ];

  get logged() {
    return !!this.$store.state.Authentication.user;
  }

  get bean() {
    return this.$store.state.Authentication.user;
  }

  logOut() {
    this.$q
      .dialog({
        message: "Realmente deseja sair?",
        ok: {
          label: "Sim",
          push: true,
          flat: true,
        },
        cancel: {
          label: "Não",
          push: true,
          color: "negative",
          rounded: false,
          flat: true,
        },
        persistent: true,
      })
      .onOk(async () => {
        try {
          await this.$store.dispatch("Authentication/logout");
          await this.$router.push("/home");
        } catch (e) {
          console.log(e);
        }
      });
  }

  async goPerfil() {
    try {
      await this.$router.push("/account");
    } catch (e) {
      console.log(e);
    }
  }
}

export default PublicApp;
