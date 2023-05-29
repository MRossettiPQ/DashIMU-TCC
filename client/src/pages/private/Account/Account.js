import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "account",
})
class Account extends Vue {
  edit = false;

  get readOnly() {
    return !this.edit;
  }

  get bean() {
    return this.$store.state.Authentication?.user;
  }
}

export default Account;
