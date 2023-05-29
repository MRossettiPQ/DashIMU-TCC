import { Component, Vue, Watch } from 'vue-property-decorator';
import { StorageUtils } from 'src/common/utils/StorageUtils';
import { User } from 'src/common/models/User';
import _ from 'lodash';

@Component
export class StorageMixin extends Vue {
  localStorage = new StorageUtils();

  get logged() {
    return this.$store.getters['authentication/logged'];
  }

  get user() {
    return this.$store.state.authentication?.user;
  }

  async beforeMount() {
    const user: User | null = this.localStorage.getUser();
    if (!_.isNil(user)) {
      await this.$store.dispatch('authentication/login', user);
    }
  }

  @Watch('$store.state.authentication.user')
  async watchState(user: User) {
    if (!_.isNil(user)) {
      await this.localStorage.setUser(user);
    }
  }
}
