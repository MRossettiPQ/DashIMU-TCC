import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "dialog-header",
})
class DialogHeader extends Vue {
  @Prop()
  labelRightButton;

  @Prop()
  id;

  @Prop()
  icon;

  @Prop()
  idMsg;

  @Prop()
  elseMsg;
}

export default DialogHeader;
