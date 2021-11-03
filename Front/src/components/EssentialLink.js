import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "EssentialLink"
})
class EssentialLink extends Vue {
  @Prop({ type: String, required: true })
  title;

  @Prop({ type: String, default: "" })
  caption;

  @Prop({ type: String, default: "" })
  icon;

  @Prop({ type: String, default: null })
  link;

  @Prop({ type: Function, default: null })
  action;

  @Prop({ type: Boolean, default: null })
  logged;

  get attrs() {
    if (this.link) {
      return { to: this.link };
    }
  }
}

export default EssentialLink;
