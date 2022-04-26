import { Component, Vue } from "vue-property-decorator";
import EssentialLink from "components/EssentialLink/EssentialLink.vue";

@Component({
  name: "main",
  components: { EssentialLink }
})
class Main extends Vue {
  leftDrawerOpen = false;

  get logged() {
    return !!this.$store.state.autenticacao.user;
  }

  get currentUser() {
    return this.$store.state.autenticacao.user;
  }

  essentialLinks = [
    {
      title: "Home",
      caption: "Tela inicial",
      icon: "home",
      link: "/home"
    },
    {
      title: "Login",
      caption: "Para logar",
      icon: "login",
      link: "/logar",
      inLogged: true
    },
    {
      title: "Registrar",
      caption: "Para registro",
      icon: "app_registration",
      link: "/registrar",
      inLogged: true
    },
    {
      title: "Perfil",
      caption: "Ver perfil",
      icon: "account_circle",
      link: "/perfil",
      inLogged: false
    },
    {
      title: "Pacientes",
      caption: "Ver pacientes",
      icon: "local_hospital",
      link: "/pacientes",
      inLogged: false
    },
    {
      title: "Sensor",
      caption: "Ver sensor",
      icon: "square_foot",
      link: "/sensor",
      inLogged: false
    }
  ];

  logOut() {
    try {
      this.$store.dispatch("autenticacao/logout");
      this.$router.push("/home");
    } catch (e) {
      console.log(e);
    }
  }

  goPerfil() {
    try {
      this.$router.push("/perfil");
    } catch (e) {
      console.log(e);
    }
  }
}

export default Main;
