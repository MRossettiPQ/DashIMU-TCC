import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "TabGrafico",
})
class TabGrafico extends Vue {
  @Prop()
  label;

  @Prop()
  options;

  @Prop()
  data;
}

export default TabGrafico;
