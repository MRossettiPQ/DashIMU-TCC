import { Component, Ref, Vue } from 'vue-property-decorator';

@Component({
  name: 'loading-screen',
})
export default class LoadingScreen extends Vue {
  @Ref('lottie')
  lottie: unknown;
}
