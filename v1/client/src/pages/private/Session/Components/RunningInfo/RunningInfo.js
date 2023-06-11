import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'running-info',
})
export default class RunningInfo extends Vue {
  @Prop()
  connection
}
