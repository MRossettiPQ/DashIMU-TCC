import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'dialog-header',
})
export default class DialogHeader extends Vue {
  @Prop()
  labelRightButton?: string;

  @Prop()
  id?: number;

  @Prop()
  icon?: string;

  @Prop({ default: '' })
  idMsg?: string;

  @Prop({ default: '' })
  elseMsg?: string;
}
