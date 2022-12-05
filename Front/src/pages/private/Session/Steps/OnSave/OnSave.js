import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "on-save",
})
class OnSave extends Vue {
  @Prop({ type: Boolean })
  tinyScreen;

  @Prop()
  sessionConnection;

  @Prop()
  loadingSave;

  @Prop()
  saveResult;

  @Prop({ type: Object })
  patient;

  @Prop()
  inDev;

  tabPanel = "Tab_1";

  @Prop({ type: Boolean })
  isTinyScreen;

  get dataLoaded() {
    return this.saveResult;
  }
}

export default OnSave;
