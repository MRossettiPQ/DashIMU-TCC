import { Component, Ref, Vue } from 'vue-property-decorator';

@Component({
  name: 'error-screen',
})
export default class ErrorScreen extends Vue {
  @Ref('lottie')
  lottie: unknown;
}
