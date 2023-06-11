import { Component, Mixins } from 'vue-property-decorator'
import { ScreenMixin } from 'src/common/mixins/ScreenMixin'
import { FetchData } from 'src/common/utils/LoadDataUtil/FetchData'
import SessionService from 'src/common/services/SessionService'
import MovementResult from './components/movement-result/MovementResult.vue'

@Component({
  name: 'session-result',
  components: {
    MovementResult,
  },
})
export default class SessionResult extends Mixins(ScreenMixin) {
  sessionId = null

  tab = null

  fetchData = new FetchData({
    load: SessionService.getSession,
    auto: false,
  })

  async mounted() {
    this.sessionId = Number(this.$route.params.id)
    await this.fetchData.fetch({
      options: {
        id: this.sessionId,
      },
    })
    if (this.fetchData.result?.movements.length) {
      this.tab = `Mov_${this.fetchData.result.movements?.[0].id}`
    }
    console.log(this.fetchData.result)
  }

  selectTab(tab) {
    this.tab = tab
  }

  get session() {
    return this.fetchData.result?.session
  }

  get movements() {
    return this.session?.movements
  }
}
