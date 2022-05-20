import {Component, Prop, Vue} from 'vue-property-decorator';
import PacienteService from 'src/commons/services/PacienteService';
import FormUtils from 'src/commons/utils/FormUtils';
import HistoricoMedicao from './HistoricoMedicao.vue';
import TableSessao from './Components/TableSessao.vue';
import DateUtils from "src/commons/utils/DateUtils";

@Component({
  name: 'paciente',
  components: {HistoricoMedicao, TableSessao}
})
class Paciente extends Vue {
  @Prop()
  id;

  bean = {};
  loading = false;

  show() {
    this.$refs.dialog.show();
  }

  async mounted() {
    if (this.id !== null) {
      await this.dataLoad(this.id);
    } else {
      this.bean = {};
    }
  }

  async dataLoad(id) {
    try {
      this.bean = await PacienteService.getPaciente(id);
    } catch (e) {
      console.log(e);
    }
  }

  async save() {
    try {
      this.loading = true;
      await FormUtils.validateAsync(this.$refs.mainForm);
      this.bean = PacienteService.postPaciente({data: this.bean});
      this.$refs.dialog.hide();
    } catch (e) {
      console.log(e);
    } finally {
      this.loading = false;
    }
  }

  filterDate(date) {
    return DateUtils.getDateFormated(date);
  }
}

export default Paciente;
