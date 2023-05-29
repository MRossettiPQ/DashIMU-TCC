import { Component, Prop, PropSync, Vue } from 'vue-property-decorator';
import { SessionUtil } from 'src/common/utils/SessionController/SessionUtil';
import { MovementUtil } from 'src/common/utils/SessionController/MovementUtil';
import { ProcedureUtil } from 'src/common/utils/SessionController/ProcedureUtil';

@Component({
  name: 'movement',
})
export default class Movement extends Vue {
  @PropSync('session')
  syncSession?: SessionUtil;

  @PropSync('movement')
  syncMovement?: MovementUtil;

  @PropSync('procedure')
  syncProcedure?: ProcedureUtil;

  @Prop()
  order?: number;
}
