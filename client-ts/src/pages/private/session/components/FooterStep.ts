import { Component, PropSync, Vue } from 'vue-property-decorator';
import { SessionUtil } from 'src/common/utils/SessionController/SessionUtil';

@Component({
  name: 'footer-step',
})
export default class FooterStep extends Vue {
  @PropSync('session')
  syncSession?: SessionUtil;
}
