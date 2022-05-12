import { Component, Prop, Vue } from "vue-property-decorator";
import DateUtils from 'src/commons/utils/DateUtils';

@Component({
  name: "sensor-expasion"
})
class SensorExpasion extends Vue {
  @Prop()
  bean;

  filterDate(date) {
    return DateUtils.getDateFormated(date);
  }
}

export default SensorExpasion;
