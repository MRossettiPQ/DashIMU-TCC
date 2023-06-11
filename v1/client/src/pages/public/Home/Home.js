import { Component, Vue } from 'vue-property-decorator'
import { FetchAllData } from 'src/common/utils/LoadDataUtil/FetchAllData'
import SocketService from 'src/common/services/SocketService'
import SensorAvailable from './Components/SensorAvailable.vue'
import SensorNetwork from './Components/SensorNetwork.vue'

@Component({
  name: 'home',
  components: {
    SensorAvailable,
    SensorNetwork,
  },
})
export default class Home extends Vue {
  fetchData = new FetchAllData({
    loadList: {
      metadata: SocketService.getMetadata,
      listSensor: SocketService.getSensorsList,
    },
    auto: true,
  })

  baseSensor = {
    ssid: '',
    password: '',
    backend: '',
    backendPort: '',
    sensorName: 'To Config',
    ip: '192.168.4.1',
  }
}
