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
      title: this.$t("menu.home.title"),
      caption: this.$t("menu.home.caption"),
      icon: "home",
      link: "/home",
    },
    {
      title: this.$t("menu.login.title"),
      caption: this.$t("menu.login.caption"),
      icon: "login",
      link: "/logar",
      inLogged: true,
    },
    {
      title: this.$t("menu.register.title"),
      caption: this.$t("menu.register.caption"),
      icon: "app_registration",
      link: "/register",
      inLogged: true,
    },
    {
      title: this.$t("menu.profile.title"),
      caption: this.$t("menu.profile.caption"),
      icon: "account_circle",
      link: "/profile",
      inLogged: false,
    },
    {
      title: this.$t("menu.patient.title"),
      caption: this.$t("menu.patient.caption"),
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
        message: this.$t("main.logout"),
        ok: {
          label: this.$t("main.yes"),
          push: true,
          flat: true,
        },
        cancel: {
          label: this.$t("main.no"),
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
