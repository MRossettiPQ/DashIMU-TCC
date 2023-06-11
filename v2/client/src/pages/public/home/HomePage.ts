import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'home-page',
})
export default class HomePage extends Vue {
  loading = false;
}
