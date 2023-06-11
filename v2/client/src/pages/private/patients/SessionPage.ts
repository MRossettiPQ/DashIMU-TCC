import { Component, Mixins, Prop } from 'vue-property-decorator';
import { FetchAllData } from 'src/common/utils/LoadDataUtils';
import SessionService from 'src/common/services/SessionService';
import { DialogMixin } from 'src/common/mixins/DialogMixin';

@Component({
  name: 'session-page',
})
export default class SessionPage extends Mixins(DialogMixin) {
  @Prop({ default: null })
  id: number | null = null;

  fetchData = new FetchAllData({
    loadList: {
      session: SessionService.getSession,
      procedure: SessionService.getCalculationVariabilityCenter,
    },
  });

  async mounted() {
    if (this.id !== null) {
      await this.fetchData.fetchAll({
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
