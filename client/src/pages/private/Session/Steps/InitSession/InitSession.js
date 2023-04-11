import {Component, Prop, PropSync, Vue} from "vue-property-decorator";

@Component({
  name: "init-session",
})
class InitSession extends Vue {
  @PropSync("session")
  syncedSession;

  @Prop({ type: Boolean })
  isTinyScreen;

  @Prop()
  inDev;

  @Prop()
  fetchResult;
}

export default InitSession;
