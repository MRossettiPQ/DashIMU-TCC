import { Component, Vue, Prop } from 'vue-property-decorator';
import { SessionBean } from 'src/common/models/Session';

@Component({
  name: 'calc-result',
})
export default class CalcResult extends Vue {
  @Prop()
  session?: SessionBean;

  selectedProcedure?: unknown;
}
