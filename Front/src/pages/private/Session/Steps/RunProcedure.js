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

  @PropSync("numberOfConnections")
  syncedNumberOfConnections;

  @Prop()
  metadata;

  @Prop()
  patient;

  tabPanel = "Tab_1";

  get sensorsData() {
    return this.syncedSensors;
  }

  tableColumns = [
    {
      align: "center",
      field: "sensorName",
      label: "sensorName",
    },
    { align: "center", field: "numberMensuration", label: "numberMensuration" },
    {
      align: "center",
      field: "Acc_X",
      label: "Acc_X",
      format: (val, row) => `${Math.ceil(val)}`,
    },
    {
      align: "center",
      field: "Acc_Y",
      label: "Acc_Y",
      format: (val, row) => `${Math.ceil(val)}`,
    },
    {
      align: "center",
      field: "Acc_Z",
      label: "Acc_Z",
      format: (val, row) => `${Math.ceil(val)}`,
    },
    {
      align: "center",
      field: "Gyr_X",
      label: "Gyr_X",
      format: (val, row) => `${Math.ceil(val)}`,
    },
    {
      align: "center",
      field: "Gyr_Y",
      label: "Gyr_Y",
      format: (val, row) => `${Math.ceil(val)}`,
    },
    {
      align: "center",
      field: "Gyr_Z",
      label: "Gyr_Z",
      format: (val, row) => `${Math.ceil(val)}`,
    },
    {
      align: "center",
      field: "Roll",
      label: "Roll",
      format: (val, row) => `${Math.ceil(val)}`,
    },
    {
      align: "center",
      field: "Pitch",
      label: "Pitch",
      format: (val, row) => `${Math.ceil(val)}`,
    },
    {
      align: "center",
      field: "Yaw",
      label: "Yaw",
      format: (val, row) => `${Math.ceil(val)}`,
    },
  ];
}

export default RunProcedure;
