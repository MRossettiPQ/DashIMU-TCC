import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "tab-graph",
})
class TabGraph extends Vue {
  @Prop()
  label;

  @Prop()
  options;

  @Prop({ type: Array, default: [] })
  data;

  tabelaColumns = [
    { name: "id", label: "id" },
    { name: "idSensor", label: "idSensor" },
    { name: "horaSensor", label: "horaSensor" },
    { name: "numLeitura", label: "numLeitura" },
    { name: "AccelX_Lin", label: "AccelX_Lin" },
    { name: "AccelY_Lin", label: "AccelY_Lin" },
    { name: "AccelZ_Lin", label: "AccelZ_Lin" },
    { name: "AccelX_mss", label: "AccelX_mss" },
    { name: "AccelY_mss", label: "AccelY_mss" },
    { name: "AccelZ_mss", label: "AccelZ_mss" },
    { name: "GyroX_rads", label: "GyroX_rads" },
    { name: "GyroY_rads", label: "GyroY_rads" },
    { name: "GyroZ_rads", label: "GyroZ_rads" },
    { name: "MagX_uT", label: "MagX_uT" },
    { name: "MagY_uT", label: "MagY_uT" },
    { name: "MagZ_uT", label: "MagZ_uT" },
    { name: "Roll", label: "Roll" },
    { name: "Pitch", label: "Pitch" },
    { name: "Yaw", label: "Yaw" },
  ];
}

export default TabGraph;
