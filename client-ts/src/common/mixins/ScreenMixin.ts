import { Component, Vue } from 'vue-property-decorator';

@Component
export class ScreenMixin extends Vue {
  get isMobile() {
    return this.$q.platform.is.mobile;
  }
}
