import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "rot-input-date"
})
class RotInputDate extends Vue {
  @Prop({type: String, default: 'date'})
  type;

  @Prop()
  value;

  @Prop({type: Array, default: () => []})
  rules;

  handleInput (e) {
    this.$emit('input', this.content)
  }
}

export default RotInputDate;
