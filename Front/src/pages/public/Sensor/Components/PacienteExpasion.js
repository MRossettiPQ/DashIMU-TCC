import {Component, Prop, Vue} from "vue-property-decorator";
import DateUtils from 'src/commons/utils/DateUtils';

@Component({
  name: "paciente-expasion"
})
class PacienteExpasion extends Vue {
  @Prop()
  bean;

  filterDate(date) {
    return DateUtils.getDateFormated(date);
  }
}

export default PacienteExpasion;
