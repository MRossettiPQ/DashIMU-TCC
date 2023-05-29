import { Component, Prop, Ref, Vue } from 'vue-property-decorator';
import DialogHeader from 'components/DialogHeader/DialogHeader.vue';
import { LoadDataUtils } from 'src/commons/utils/LoadDataUtils';
import SessionService from 'src/commons/services/SessionService';
import LoadingScreen from 'components/LoadingScreen/LoadingScreen.vue';
import ErrorScreen from 'components/ErrorScreen/ErrorScreen.vue';
import ResultChartScreen from 'components/ResultChartScreen/ResultChartScreen.vue';

@Component({
  name: 'measurement-history',
  components: { ResultChartScreen, ErrorScreen, LoadingScreen, DialogHeader },
})
class MeasurementHistory extends Vue {
  @Ref('dialog')
  dialog;

  @Prop()
  id;

  fetchData = LoadDataUtils.loadList({
    loadList: {
      session: SessionService.getSession,
      procedure: SessionService.getCalculationVariabilityCenter,
    },
  });

  show() {
    this.dialog.show();
  }

  hide(payload) {
    this.$emit('ok', payload ? payload : true);
    this.dialog.hide();
  }

  async mounted() {
    if (this.id !== null) {
      await this.fetchData.loadAll({
        session: {
          options: {
            id: this.id,
          },
        },
        procedure: {
          options: {
            sessionId: this.id,
          },
        },
      });
      console.log(this.fetchData.result?.procedure);
    }
  }

  tabPanel = 'Tab_0';

  get isMobile() {
    return this.$q.platform.is.mobile;
  }
}

export default MeasurementHistory;
