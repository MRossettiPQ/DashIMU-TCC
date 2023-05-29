import { Component, Mixins } from 'vue-property-decorator';
import { User } from 'src/common/models/User';
import { StorageMixin } from 'src/common/mixins/StorageMixin';

@Component({
  name: 'account-page',
})
export default class AccountPage extends Mixins(StorageMixin) {
  edit = false;

  get readOnly() {
    return !this.edit;
  }

  bean: User | null = null;
}
