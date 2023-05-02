import { Component, Prop, PropSync, Vue } from "vue-property-decorator";

@Component({
  name: "init-session",
})
class InitSession extends Vue {
  @PropSync("sensor")
  syncedSensor;

  @Prop()
  session;
}

export default InitSession;
