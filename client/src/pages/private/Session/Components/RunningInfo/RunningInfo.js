import {Component, Prop, Vue} from "vue-property-decorator";

@Component({
  name: "running-info",
})
class RunningInfo extends Vue {
  @Prop()
  sessionConnection;

  @Prop({ type: Boolean })
  tinyScreen;
}

export default RunningInfo;
