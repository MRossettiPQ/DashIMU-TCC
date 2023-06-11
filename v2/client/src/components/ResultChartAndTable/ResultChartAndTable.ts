import { Component, Vue, Prop } from 'vue-property-decorator';
import { SessionBean } from 'src/common/models/Session';
import CalcResult from './fraction/CalcResult.vue';

@Component({
  name: 'result-chart-and-table',
  components: {
    CalcResult,
  },
})
export default class ResultChartAndTable extends Vue {
  @Prop()
  session?: SessionBean;

  selectedProcedure?: unknown;
}
