import { Component, Prop, PropSync, Vue, Watch } from "vue-property-decorator";
import RunMenu from "pages/private/Session/Components/RunMenu.vue";
import TabMeasurementTable from "pages/private/Session/Components/TabMeasurementTable.vue";
import TabGraph from "pages/private/Session/Components/TabGraph.vue";

@Component({
  name: "run-procedure",
  components: {
    RunMenu,
    TabMeasurementTable,
    TabGraph,
  },
})
class RunProcedure extends Vue {
  @PropSync("session")
  syncedSession;

  @PropSync("movement")
  syncedMovement;

  @PropSync("positions")
  syncedPositions;

  @PropSync("sensors")
  syncedSensors;

  @PropSync("registredSensorId")
  syncedRegistredSensorId;

  @PropSync("measurementInProgress")
  syncedMeasurementInProgress;

  @PropSync("MeasurementInPause")
  syncedMeasurementInPause;

  @PropSync("numberOfMeasurements")
  syncedNumberOfMeasurements;

  @Prop()
  numberOfConnections;

  @Prop()
  metadata;

  @Prop()
  patient;

  tabPanel = "Tab_1";

  get sensorsData() {
    return this.syncedSensors;
  }
}

export default RunProcedure;
