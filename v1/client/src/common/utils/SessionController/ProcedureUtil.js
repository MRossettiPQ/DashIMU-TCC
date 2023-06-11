import _ from "lodash";
import { v4 as uuid } from "uuid";
import { Movement } from "src/common/utils/SessionController/MovementUtil";

class Procedure {
  // Bean
  movements = [];
  procedure = null;
  observation = "";

  // Metadata
  movementsOptions = [];
  positionOptions = [];
  name = "";
  minSensor = null;
  uuid = "";

  constructor() {
    this.uuid = uuid(null, null, null);
  }

  addMovement() {
    this.movements.push(new Movement());
  }

  removeMovement(uuid) {
    const rIndex = this.movements.findIndex((m) => m.uuid === uuid);
    if (rIndex !== -1) {
      this.movements.splice(rIndex, 1);
    }
  }

  selectProcedure(procedure, procedures) {
    this.procedure = procedure;
    // Seta os metadata desse procedimento
    const foundProcedure = procedures.find((p) => p.value === procedure);
    if (foundProcedure) {
      this.movementsOptions = foundProcedure.rules;
      this.positionOptions = foundProcedure.sensor_positions;
      this.minSensor = foundProcedure.min_sensor;
      this.name = foundProcedure.articulation_name;
    }
  }

  get notNull() {
    return !_.isNil(this.procedure);
  }

  get notEmpty() {
    return !_.isEmpty(this.movements);
  }

  get size() {
    return this.movements.length;
  }

  get valid() {
    return this.notNull && this.notEmpty && this.movements.every((m) => m.valid);
  }
}

export { Procedure };
