import { Component, Ref, Vue } from "vue-property-decorator";

@Component
export class DialogMixin extends Vue {
  @Ref("dialog")
  dialog;

  show() {
    this.dialog?.show();
  }

  hide(payload) {
    this.$emit("ok", payload ? payload : true);
    this.dialog?.hide();
  }
}
