import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "tab-graph",
})
class TabGraph extends Vue {
  @Prop()
  label;

  @Prop()
  options;

  @Prop({ type: Array, default: [] })
  data;
}

export default TabGraph;
