import { Component, PropSync, Vue } from 'vue-property-decorator'
import Movement from './Movement.vue'

@Component({
  name: 'first-step',
  components: {
    Movement,
  },
})
export default class FirstStep extends Vue {
  @PropSync('session')
  syncedSession
}
