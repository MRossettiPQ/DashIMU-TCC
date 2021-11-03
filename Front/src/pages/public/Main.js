import EssentialLink from "components/EssentialLink.vue";

export default {
  name: "Main",
  components: { EssentialLink },
  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: [
        {
          title: "Home",
          caption: "Tela inicial",
          icon: "home",
          link: "/home",
          logged: true
        },
        {
          title: "Login",
          caption: "Para logar",
          icon: "login",
          link: "/logar",
          logged: !!!this.$store.state.autentica.user
        },
        {
          title: "Registrar",
          caption: "Para registro",
          icon: "app_registration",
          link: "/registrar",
          logged: !!!this.$store.state.autentica.user
        },
        {
          title: "Perfil",
          caption: "Ver perfil",
          icon: "account_circle",
          link: "/perfil",
          logged: !!this.$store.state.autentica.user
        },
        {
          title: "Pacientes",
          caption: "Ver pacientes",
          icon: "local_hospital",
          link: "/pacientes",
          logged: !!this.$store.state.autentica.user
        },
        {
          title: "Sensor",
          caption: "Ver sensor",
          icon: "square_foot",
          link: "/sensor",
          logged: !!this.$store.state.autentica.user
        }
      ]
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.autentica.user;
    },
    showFisioBoard() {
      if (this.currentUser && this.currentUser["funcao"]) {
        return this.currentUser["funcao"].includes("ROLE_FISIO");
      }
      return false;
    },
    showSensorBoard() {
      if (this.currentUser && this.currentUser["funcao"]) {
        return this.currentUser["funcao"].includes("ROLE_FISIO");
      }
      return false;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser["funcao"]) {
        return this.currentUser["funcao"].includes("ROLE_ADMIN");
      }
      return false;
    },
    showPacienteBoard() {
      if (this.currentUser && this.currentUser["funcao"]) {
        return this.currentUser["funcao"].includes("ROLE_PACIENTE");
      }
      return false;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch("autentica/logout");
    },
    goPerfil() {
      this.$router.push("/perfil");
    }
  }
};
