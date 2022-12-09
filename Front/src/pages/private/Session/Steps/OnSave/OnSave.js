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

  mounted() {
    console.log(this.saveResult)
  }
}

export default OnSave;
