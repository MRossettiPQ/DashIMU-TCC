import { Component, Prop, PropSync, Vue } from 'vue-property-decorator'
import DrawerMovement from './DrawerMovement.vue'

@Component({
  name: 'drawer-menu',
  components: {
    DrawerMovement,
  },
})
export default class DrawerMenu extends Vue {
  @Prop()
  connection

  @PropSync('session')
  syncedSession

  select(value) {
    this.syncedSession.running_movement = value
  }
}
