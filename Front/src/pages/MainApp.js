import { Component, Vue, Watch } from "vue-property-decorator";
import EssentialLink from "components/EssentialLink/EssentialLink.vue";
import { Axios } from "src/commons/utils/AxiosUtils";

@Component({
  name: "main-app",
  components: { EssentialLink },
})
class MainApp extends Vue {
  loading = false;
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
      title: "Profile",
      caption: "View profile",
      icon: "account_circle",
      link: "/profile",
      inLogged: false,
    },
    {
      title: "Patients",
      caption: "View patients",
      icon: "local_hospital",
      link: "/patients",
      inLogged: false,
    },
    /*  {
      title: "Settings",
      caption: "View settings",
      icon: "settings",
      link: "/settings",
      inLogged: false,
    }, */
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

  async goProfile() {
    try {
      await this.$router.push("/profile");
    } catch (e) {
      console.log(e);
    }
  }

  @Watch("loading")
  watchLoading(isLoading) {
    if (isLoading) {
      this.$refs.loadingBar.start();
    } else {
      this.$refs.loadingBar.stop();
    }
  }

  async mounted() {
    Axios.interceptors.request.use((config) => {
      this.loading = true;
      return config;
    });
    Axios.interceptors.response.use(
      (response) => {
        this.loading = false;
        return response;
      },
      (error) => {
        this.loading = false;
        return Promise.reject(error);
      }
    );
  }
}

export default MainApp;
