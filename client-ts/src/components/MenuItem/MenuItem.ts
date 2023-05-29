import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'menu-item',
})
export default class MenuItem extends Vue {
  @Prop({ type: String, required: true })
  title?: string;

  @Prop({ type: String, default: '' })
  caption?: string;

  @Prop({ type: String, default: '' })
  icon?: string;

  @Prop({ type: String, default: null })
  link?: string;

  @Prop({ type: Function, default: null })
  action?: (params: []) => unknown;

  @Prop({ type: Boolean, default: false })
  inLogged?: boolean;

  @Prop({ type: Boolean, default: false })
  logged?: boolean;

  get attrs() {
    if (this.link) {
      return { to: this.link };
    }
    return '';
  }

  get renderLink() {
    return this.inLogged !== null ? this.logged === !this.inLogged : true;
  }

  get active() {
    return true;
  }
}
