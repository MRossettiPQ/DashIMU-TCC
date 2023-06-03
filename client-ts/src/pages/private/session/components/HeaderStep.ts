import { Component, PropSync, Ref, Vue } from 'vue-property-decorator';
import { SessionController } from 'src/common/utils/SessionController';
import RunningInfo from './RunningInfo.vue';

@Component({
  name: 'header-step',
  components: {
    RunningInfo,
  },
})
export default class HeaderStep extends Vue {
  @PropSync('session')
  syncSession?: SessionController;

  @PropSync('menu')
  menuSync?: boolean;

  @Ref('htmlRef')
  htmlRef!: HTMLElement;

  expanded = false;

  toggleMenu() {
    this.menuSync = !this.menuSync;
  }
}
