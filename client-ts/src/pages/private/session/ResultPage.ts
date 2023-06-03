import { Component, Mixins } from 'vue-property-decorator';
import { ScreenMixin } from 'src/common/mixins/ScreenMixin';
import { FetchAllData } from 'src/common/utils/LoadDataUtils';
import SessionService from 'src/common/services/SessionService';

@Component({
  name: 'result-page',
})
export default class ResultPage extends Mixins(ScreenMixin) {
  sessionId?: number;

  fetchData = new FetchAllData({
    loadList: {
      metadata: SessionService.getMetadata,
      session: SessionService.getSession,
    },
    auto: false,
  });

  async mounted() {
    this.sessionId = Number(this.$route.params.id);
    await this.fetchData.fetchAll({
      session: {
        options: {
          id: this.sessionId,
        },
      },
    });
  }
}
