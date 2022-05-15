import {Vue} from 'vue-property-decorator';

class DialogUtils extends Vue {
  Show = ({options}) => {
    return new Promise((resolve, reject) => {
      this.$q
        .dialog(options)
        .onOk(() => resolve())
        .onCancel(() => reject())
    })
  }
}

export default DialogUtils;
