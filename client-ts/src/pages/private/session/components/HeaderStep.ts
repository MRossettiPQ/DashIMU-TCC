import { Component, PropSync, Vue } from 'vue-property-decorator';
import { SessionUtil } from 'src/common/utils/SessionController/SessionUtil';

@Component({
  name: 'header-step',
})
export default class HeaderStep extends Vue {
  @PropSync('session')
  syncSession?: SessionUtil;
}
