import { Vue } from "vue-property-decorator";
import { Dialog } from "quasar";

class DialogUtils extends Vue {
  static async Show({ options }) {
    return new Promise((resolve, reject) => {
      this.prototype.$q
        .dialog(options)
        .onOk(() => resolve())
        .onCancel(() => reject());
    });
  }

  static async asyncDialog(component, props) {
    // Dialog.create({
    //   component
    // })

    return new Promise((resolve) => {
      this.prototype.$q
        .dialog({
          component,
          ...props,
        })
        .onOk((e) => resolve(e))
        .onCancel((e) => resolve(e))
        .onDismiss((e) => resolve(e));
    });
  }
}

export default DialogUtils;
