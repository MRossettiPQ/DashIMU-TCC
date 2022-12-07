import {Component, Prop, Ref, Vue} from "vue-property-decorator";
import DialogHeader from "components/DialogHeader/DialogHeader.vue";
import {LoadDataUtils} from "src/commons/utils/LoadDataUtils";
import SessionService from "src/commons/services/SessionService";

@Component({
  name: "measurement-history",
  components: {DialogHeader},
})
class MeasurementHistory extends Vue {
  @Ref("dialog")
  dialog;

  @Prop()
  id;

  fetchData = LoadDataUtils.loadList({
    loadList: {
      session: SessionService.getSession,
      procedure: SessionService.getCalculationVariabilityCenter,
    },
  });

  show() {
    this.dialog.show();
  }

  hide(payload) {
    this.$emit("ok", payload ? payload : true);
    this.dialog.hide();
  }

  async mounted() {
    if (this.id !== null) {
      await this.fetchData.loadAll({
        session: {
          options: {
            id: this.id
          }
        },
        procedure: {
          options: {
            sessionId: this.id
          }
        },
      })
    }
  }


  tabPanel = "Tab_0";

  get isMobile() {
    return this.$q.platform.is.mobile;
  }

}

export default MeasurementHistory;
