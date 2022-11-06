import { Component, Prop, PropSync, Vue, Watch } from "vue-property-decorator";

@Component({
  name: "init-session",
})
class InitSession extends Vue {
  @PropSync("session")
  syncedSession;

  @PropSync("positions")
  syncedPositions;

  @Prop()
  metadata;

  // Imagem do movimento escolhido
  movementImg = null;
  // Movimentos disponiveis
  movements = [];
  movement = null;

  get getProceduresList() {
    return this.metadata?.procedures;
  }

  get getMovementsList() {
    return this.movements;
  }

  get getMovementImg() {
    return this.movementImg;
  }

  get getProcedure() {
    return this.syncedSession?.procedure;
  }

  get getMovement() {
    return this.syncedSession?.movement;
  }

  @Watch("getProcedure")
  updateByChangeProcedure() {
    this.updateMovementsList();
    this.updatePositionsList();
  }

  @Watch("getMovement")
  updateByChangeMovement() {
    this.updateMovementsImg();
  }

  updateMovementsList() {
    // Atualiza a lista de movimentos para o procedimento escolhido
    this.syncedSession.movement = null;
    this.movementImg = null;
    this.movements = this.getProceduresList?.find(
      ({ value }) => value === this.getProcedure
    )?.rules;
  }

  updatePositionsList() {
    // Atualiza a lista de posições para o movimento escolhido
    this.syncedPositions = [];
    this.syncedPositions = this.getProceduresList?.find(
      ({ value }) => value === this.getProcedure
    )?.sensor_positions;
  }

  updateMovementsImg() {
    // Atualiza a imagem do movimento para o movimento escolhido
    this.movementImg = null;
    const actualMovement = this.getMovementsList?.find(
      ({ value }) => value === this.getMovement
    );
    this.movement = actualMovement;

    console.log("actualMovement", actualMovement);
    if (actualMovement?.image) {
      this.movementImg = require(`src/assets/procedures/${actualMovement.image}`);
    }
  }
}

export default InitSession;
