import Vue from "vue";

const { $q } = Vue.prototype;
class DialogUtils extends Vue {
  static async Show({ options }) {
    return new Promise((resolve, reject) => {
      $q.dialog(options)
        .onOk(() => resolve())
        .onCancel(() => reject());
    });
  }

  static async asyncDialog(component, props) {
    return new Promise((resolve, reject) => {
      $q.dialog({
        component: component,
        ...props,
      }).onOk((e) => resolve(e));
    });
  }
}

export default DialogUtils;
