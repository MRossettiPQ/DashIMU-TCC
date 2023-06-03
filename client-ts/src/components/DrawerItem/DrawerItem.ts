import { Component, Prop, Vue, Emit } from 'vue-property-decorator';

@Component({
  name: 'drawer-item',
})
export default class DrawerItem extends Vue {
  @Prop({ type: String, required: true })
  title?: string;

  @Prop({ type: String, default: '' })
  caption?: string;

  @Prop({ type: String, default: '' })
  icon?: string;

  @Emit('click')
  click(evt: Event): Event {
    return evt;
  }
}
