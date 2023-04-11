import { Component, Prop, Ref, Vue } from "vue-property-decorator";

@Component({
  name: "check-measurements-dialog",
})
class CheckMeasurementsDialog extends Vue {
  @Ref("dialog")
  dialog;

  @Prop()
  session;

  loading = false;

  show() {
    this.dialog.show();
  }

  hide(payload) {
    this.$emit("ok", payload ? payload : true);
    this.dialog.hide();
  }

  sessionData = [];

  columns = [
    {
      name: "movement",
      align: "left",
      label: this.$t("session.movement_column"),
      field: "type",
      sortable: true,
    },
  ];

  async beforeMount() {
    this.session.values.movements.forEach((m) => {
      let info = {
        type: m.type,
      };
      if (m?.sensors.length === 0) {
        const key = "error";
        if (Object.hasOwnProperty.call(info,`${key}`)) {
          Object.assign(info, key);
          info[key] = this.$t("session.no_number_of_measurements");

          this.columns.push({
            name: key,
            align: "left",
            label: "Erro",
            field: key,
            sortable: true,
          });
        }
      }
      m?.sensors.forEach((s, i) => {
        const key = `sensor-${i}`;

        const exists = this.columns.find((c) => c.field === key);
        if (!exists) {
          Object.assign(info, key);
          const label =
            this.$t("session.measurement_quantity_column") + ` do sensor ${i}`;
          this.columns.push({
            name: key,
            align: "left",
            label,
            field: key,
            sortable: true,
          });
        }
        info[key] = s.gyro_measurements.length;
      });
      this.sessionData.push(info);
    });
  }
}

export default CheckMeasurementsDialog;
