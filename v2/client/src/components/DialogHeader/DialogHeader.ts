import { Component, Mixins, Prop } from 'vue-property-decorator';
import { ScreenMixin } from 'src/common/mixins/ScreenMixin';

@Component({
  name: 'dialog-header',
})
export default class DialogHeader extends Mixins(ScreenMixin) {
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
