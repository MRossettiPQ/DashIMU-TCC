import { Component, Vue } from 'vue-property-decorator'

@Component
export class DevMixin extends Vue {
  get inDev() {
    return process.env.DEV
  }
}
