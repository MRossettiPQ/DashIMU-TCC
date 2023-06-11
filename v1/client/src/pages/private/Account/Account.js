import { Component, Mixins } from "vue-property-decorator";
import { StorageMixin } from "src/common/mixins/StorageMixin";

@Component({
  name: "account",
})
export default class Account extends Mixins(StorageMixin) {
  edit = false;

  get readOnly() {
    return !this.edit;
  }

  bean = null;
}
