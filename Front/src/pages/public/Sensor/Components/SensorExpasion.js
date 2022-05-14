import { Component, Prop, Vue } from "vue-property-decorator";
import DateUtils from 'src/commons/utils/DateUtils';
import SocketService from 'src/commons/services/SocketService';

@Component({
  name: "sensor-expasion"
})
class SensorExpasion extends Vue {
  @Prop()
  tab;

  @Prop()
  sensores;

  sensoresDisponiveis = []

  mounted() {
    this.listaSensoresLoad()
  }

  listaSensoresLoad() {
    try {
      SocketService.getSensores().then(
        response => {
          this.sensoresDisponiveis = response.data;
        },
        error => {
          this.content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    } catch (e) {
      console.log(e);
    }
  }

  conecta(index) {
    this.$emit("conectarSensor", index);
  }

  desconecta(index){
    this.$emit("desconectarSensor", index);
  }

}

export default SensorExpasion;
