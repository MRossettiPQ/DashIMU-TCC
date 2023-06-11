import { Component, PropSync, Vue } from 'vue-property-decorator';
import Procedure from '../components/Procedure.vue';
import { SessionUtil } from 'src/common/utils/SessionController/SessionUtil';
import { SessionController } from 'src/common/utils/SessionController';

@Component({
  name: 'first-step',
  components: {
    Procedure,
  },
})
export default class FirstStep extends Vue {
  @PropSync('session')
  syncSession?: SessionController;

  @PropSync('refForm')
  syncRefForm?: SessionUtil;
}
