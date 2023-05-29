import { Component, PropSync, Vue } from 'vue-property-decorator';
import Sensor from '../components/Sensor.vue';
import { SessionUtil } from 'src/common/utils/SessionController/SessionUtil';

@Component({
  name: 'second-step',
  components: {
    Sensor,
  },
})
export default class SecondStep extends Vue {
  @PropSync('session')
  syncSession?: SessionUtil;
}
