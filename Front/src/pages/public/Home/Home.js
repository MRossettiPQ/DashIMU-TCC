import { Component, Ref, Vue } from "vue-property-decorator";
import SessionService from "src/commons/services/SessionService";
import SocketService from "src/commons/services/SocketService";

@Component({
  name: "home",
})
class Home extends Vue {
  loadingMetadata = false;
  metadata = null;
  listSensor = [];

  async mounted() {
    try {
      this.loadingMetadata = true;
      this.metadata = await SessionService.getMetadata();
      this.listSensor = await SocketService.getSensorsList();
    } catch (e) {
      console.log(e);
    } finally {
      this.loadingMetadata = false;
    }
  }
}

export default Home;
