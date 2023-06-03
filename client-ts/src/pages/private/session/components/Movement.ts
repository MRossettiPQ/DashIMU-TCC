import { Component, Prop, PropSync, Vue } from 'vue-property-decorator';
import { MovementUtil } from 'src/common/utils/SessionController/MovementUtil';
import { ProcedureUtil } from 'src/common/utils/SessionController/ProcedureUtil';
import { SessionController } from 'src/common/utils/SessionController';

@Component({
  name: 'movement',
})
export default class Movement extends Vue {
  @PropSync('session')
  syncSession?: SessionController;

  @PropSync('movement')
  syncMovement?: MovementUtil;

  @PropSync('procedure')
  syncProcedure?: ProcedureUtil;

  @Prop()
  order?: number;
}
