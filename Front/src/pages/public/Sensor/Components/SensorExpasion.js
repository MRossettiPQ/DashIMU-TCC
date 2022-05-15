import {Component, Prop, Vue} from "vue-property-decorator";
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

  async listaSensoresLoad() {
    try {
      this.sensoresDisponiveis = await SocketService.getSensores();
    } catch (e) {
      console.log(e);
    }
  }

  conecta(index) {
    this.$emit("conectarSensor", index);
  }

  desconecta(index) {
    this.$emit("desconectarSensor", index);
  }

}

export default SensorExpasion;
