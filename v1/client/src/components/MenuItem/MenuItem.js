import { Component, Prop, Vue, Emit } from 'vue-property-decorator'

@Component({
  name: 'menu-item',
})
export default class MenuItem extends Vue {
  @Prop()
  item

  @Emit('click')
  async click(event) {
    return event
  }

  get attrs() {
    if (this.item?.link) {
      return { to: this.item?.link }
    }
    return ''
  }
}
