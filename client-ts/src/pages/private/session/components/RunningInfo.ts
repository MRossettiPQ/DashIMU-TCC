import { Component, PropSync, Vue } from 'vue-property-decorator';
import { SessionController } from 'src/common/utils/SessionController';

@Component({
  name: 'running-info',
})
export default class RunningInfo extends Vue {
  @PropSync('session')
  syncSession?: SessionController;
}
