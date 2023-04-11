import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "tab-measurement-table",
})
class TabMeasurementTable extends Vue {
  @Prop({ type: Boolean })
  isTinyScreen;

  @Prop()
  sensor;

  @Prop({ type: Array, default: [] })
  tableColumns;

  get dataTableMeasurement() {
    return this.sensor?.gyro_measurements;
  }
}

export default TabMeasurementTable;
