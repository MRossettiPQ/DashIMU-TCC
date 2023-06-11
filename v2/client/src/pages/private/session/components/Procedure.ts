import { Component, Prop, PropSync, Vue } from 'vue-property-decorator';
import Movement from './Movement.vue';
import { ProcedureUtil } from 'src/common/utils/SessionController/ProcedureUtil';
import { SessionController } from 'src/common/utils/SessionController';

@Component({
  name: 'procedure',
  components: {
    Movement,
  },
})
export default class Procedure extends Vue {
  @PropSync('session')
  syncSession?: SessionController;

  @PropSync('procedure')
  syncProcedure?: ProcedureUtil;

  @Prop()
  order?: number;
}
