import { Component, PropSync, Vue } from 'vue-property-decorator';
import Procedure from '../components/Procedure.vue';
import { SessionUtil } from 'src/common/utils/SessionController/SessionUtil';

@Component({
  name: 'first-step',
  components: {
    Procedure,
  },
})
export default class FirstStep extends Vue {
  @PropSync('session')
  syncSession?: SessionUtil;
}
