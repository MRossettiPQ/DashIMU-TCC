import { Component, Prop, Ref, Vue } from "vue-property-decorator";
import DialogHeader from "components/DialogHeader/DialogHeader.vue";
import SensorLine from "./SensorLine.vue";
import PatientService from "src/commons/services/PatientService";
import SessionService from "src/commons/services/SessionService";
import { SessionInitUtils } from "src/commons/utils/SessionInitUtils";
import { LoadDataUtils } from "src/commons/utils/LoadDataUtils";
import { Notify } from "quasar";

@Component({
  name: "import-example",
  components: { DialogHeader, SensorLine },
})
class ImportExample extends Vue {
  @Ref("dialog")
  dialog;

  @Ref("mainForm")
  mainForm;

  @Prop()
  id;

  loadingSave = false;

  session = SessionInitUtils.create();
  fetchData = LoadDataUtils.loadList({
    loadList: {
      metadata: SessionService.getMetadata,
      patient: PatientService.getPatient,
    },
    auto: false,
  });

  columns = [
    {
      align: "center",
      label: "Number Mensuration",
      field: "numberMensuration",
      style: "width: 50px",
      sortable: true,
    },
    {
      align: "center",
      label: "Sensor Name",
      field: "sensorName",
      style: "width: 50px",
    },
    {
      align: "center",
      label: "Roll",
      field: "Roll",
      style: "width: 50px",
    },
    {
      align: "center",
      label: "Pitch",
      field: "Pitch",
      style: "width: 50px",
    },
    {
      align: "center",
      label: "Yaw",
      field: "Yaw",
      style: "width: 50px",
    },
    {
      align: "center",
      label: "ID",
      field: "id",
      style: "width: 50px",
      sortable: true,
    },
  ];

  show() {
    this.dialog.show();
  }

  hide(payload) {
    this.$emit("ok", payload ? payload : true);
    this.dialog.hide();
  }

  async beforeMount() {
    try {
      if (this.id !== null) {
        await this.fetchData.loadAll({
          patient: {
            options: {
              id: this.id,
            },
          },
        });
        this.session.load({
          metadata: this.fetchData.result?.metadata,
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  test = "";

  async selectMovement(value, index) {
    try {
      await this.session.selectMovement(value, index);
      this.session.getPositions?.forEach((p, i) => {
        this.session.values.movements[index].sensors.push({
          sensorName: `Sensor_${i}`,
          position: p.value,
          gyro_measurements: [],
          file: null,
        });
      });
    } catch (e) {
      console.log(e);
    }
  }

  checkFile(index) {
    const pos = this.session.values.movements?.findIndex(
      (m) => m?.index === index
    );

    if (pos !== -1) {
      this.session.values.movements[pos].sensors.forEach((s) => {
        console.log(s.file);
        this.initReader(s.file);
      });
    }
  }

  initReader(file) {
    const reader = new FileReader();

    reader.onload = (e) => {
      //let text = e.target.result;
      console.log("onload", e);
    };
    reader.readAsText(file);
  }

  get isMobile() {
    return this.$q.platform.is.mobile;
  }

  get filteredNonNullMovements() {
    return this.session.values.movements.filter((m) => m.type !== "");
  }

  teste() {
    console.log(this.session);
    this.checkFile(0);
  }

  async save() {
    try {
      this.loadingSave = true;
      if (this.session.checkMovementsMeasurements) {
        Notify.create({
          message:
            "Você deve ter captado alguma medição para completar esse procedimento!",
          textColor: "white",
          color: "error",
        });
        return false;
      }
      console.log(this.session.values);
      const bean = {
        session: {
          ...this.session.values,
          patientId: this.fetchResult.patient.id,
        },
      };
      const data = await SessionService.postSession(bean);
      //console.log(data);
      if (data != null) {
        this.hide({ save: true });
      }
    } catch (e) {
      console.log(e);
    } finally {
      this.loadingSave = false;
    }
  }
}

export default ImportExample;
