import { Component, PropSync, Vue } from 'vue-property-decorator';
import { SessionUtil } from 'src/common/utils/SessionController/SessionUtil';

@Component({
  name: 'third-step',
})
export default class ThirdStep extends Vue {
  @PropSync('session')
  syncSession?: SessionUtil;
}
