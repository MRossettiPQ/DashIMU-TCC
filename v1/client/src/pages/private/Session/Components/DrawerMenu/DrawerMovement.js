import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'drawer-movement',
})
export default class DrawerMovement extends Vue {
  @Prop()
  movement

  get name() {
    if (this.movement.label) {
      return this.movement.label + ' - ' + this.movement.index
    }
    return this.movement.index
  }
}
