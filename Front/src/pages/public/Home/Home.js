import {Component, Vue, Watch} from "vue-property-decorator";
import { LoadDataUtils } from "src/commons/utils/LoadDataUtils";
import SocketService from "src/commons/services/SocketService";
import SensorOptions from "./Components/SensorOptions.vue";

@Component({
  name: "home",
  components: {
    SensorOptions,
  },
})
class Home extends Vue {
  fetchData = LoadDataUtils.loadList({
    loadList: {
      metadata: SocketService.getMetadata,
      listSensor: SocketService.getSensorsList,
    },
    auto: true,
  });

  baseSensor = {
    nameSensor: 'To Config',
    ip: '192.168.4.1'
  }

  @Watch('fetchData.loading')
  loading() {
    console.log(this.fetchData.result)
  }

}

export default Home;
