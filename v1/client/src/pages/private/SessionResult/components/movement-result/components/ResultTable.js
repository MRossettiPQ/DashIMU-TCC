import { Component, Mixins, Prop } from 'vue-property-decorator'
import { ScreenMixin } from 'src/common/mixins/ScreenMixin'

@Component({
  name: 'result-table',
})
export default class ResultTable extends Mixins(ScreenMixin) {
  @Prop()
  movement

  @Prop()
  calculation

  mounted() {
    console.log('mounted', this.sensor)
  }
}
