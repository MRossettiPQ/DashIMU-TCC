import { Component, Mixins, Prop, Emit } from "vue-property-decorator";
import { ScreenMixin } from "src/common/mixins/ScreenMixin";

@Component({
  name: "drawer-item",
})
export default class DrawerItem extends Mixins(ScreenMixin) {
  @Prop({ type: String, required: true })
  title;

  @Prop({ type: String, default: "" })
  caption;

  @Prop({ type: String, default: "" })
  icon;

  @Emit("click")
  click(evt) {
    return evt;
  }
}
