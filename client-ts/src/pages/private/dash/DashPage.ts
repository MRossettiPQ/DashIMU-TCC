import { Component, Vue } from 'vue-property-decorator';
import { FetchAllData } from 'src/common/utils/LoadDataUtils';
import SocketService from 'src/common/services/SocketService';
import SensorAvailable from './components/SensorAvailable.vue';
import SensorNetwork from './components/SensorNetwork.vue';
import { SensorSocket } from 'src/common/models/Sensor';

@Component({
  name: 'session-page',
  components: {
    SensorAvailable,
    SensorNetwork,
  },
})
export default class DashPage extends Vue {
  loading = false;

  fetchData = new FetchAllData({
    loadList: {
      metadata: SocketService.getMetadata,
      listSensor: SocketService.getSensorsList,
    },
    auto: true,
  });

  baseSensor: SensorSocket = {
    ssid: '',
    password: '',
    backend: '',
    backendPort: '',
    sensorName: 'To Config',
    ip: '192.168.4.1',
  };
}
