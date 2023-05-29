import { Component, Prop, PropSync, Vue } from 'vue-property-decorator';
import Movement from './Movement.vue';
import { SessionUtil } from 'src/common/utils/SessionController/SessionUtil';
import { ProcedureUtil } from 'src/common/utils/SessionController/ProcedureUtil';

@Component({
  name: 'procedure',
  components: {
    Movement,
  },
})
export default class Procedure extends Vue {
  @PropSync('session')
  syncSession?: SessionUtil;

  @PropSync('procedure')
  syncProcedure?: ProcedureUtil;

  @Prop()
  order?: number;
}
