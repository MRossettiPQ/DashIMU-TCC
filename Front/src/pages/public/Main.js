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
          logged: true,
        },
        {
          title: "Login",
          caption: "Para logar",
          icon: "login",
          link: "/logar",
          logged: !this.logged(),
        },
        {
          title: "Registrar",
          caption: "Para registro",
          icon: "app_registration",
          link: "/registrar",
          logged: !this.logged(),
        },
        {
          title: "Perfil",
          caption: "Ver perfil",
          icon: "account_circle",
          link: "/perfil",
          logged: this.logged(),
        },
        {
          title: "Pacientes",
          caption: "Ver pacientes",
          icon: "local_hospital",
          link: "/pacientes",
          logged: this.logged(),
        },
        {
          title: "Sensor",
          caption: "Ver sensor",
          icon: "square_foot",
          link: "/sensor",
          logged: this.logged(),
        },
      ],
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.autenticacao.user;
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
    },
  },
  methods: {
    logged() {
      return this.$store.state.autenticacao.user !== null;
    },
    logOut() {
      this.$store.dispatch("autentica/logout");
      this.$router.push("/").then((r) => console.log(r));
    },
    goPerfil() {
      this.$router.push("/perfil").then((r) => console.log(r));
    },
  },
};
