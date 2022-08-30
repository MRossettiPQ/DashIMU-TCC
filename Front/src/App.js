import { Component, Vue, Watch } from "vue-property-decorator";
import { Axios } from "src/commons/utils/AxiosUtils";

@Component({
  name: "App",
})
class App extends Vue {
  loading = false;

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

export default App;
