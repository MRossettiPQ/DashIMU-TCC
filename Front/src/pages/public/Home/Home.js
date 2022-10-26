import { Component, Ref, Vue } from "vue-property-decorator";
import SessionService from "src/commons/services/SessionService";

@Component({
  name: "home",
})
class Home extends Vue {
  loadingMetadata = false;
  metadata = null;

  async mounted() {
    try {
      this.loadingMetadata = true;
      this.metadata = await SessionService.getMetadata();
    } catch (e) {
      console.log(e);
    } finally {
      this.loadingMetadata = false;
    }
  }
}

export default Home;
