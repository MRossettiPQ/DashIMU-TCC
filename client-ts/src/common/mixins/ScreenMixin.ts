import { Component, Vue } from 'vue-property-decorator';
import { Screen } from 'quasar';

@Component
export class ScreenMixin extends Vue {
  get isTinyScreen() {
    return Screen.xs || Screen.sm;
  }
}
