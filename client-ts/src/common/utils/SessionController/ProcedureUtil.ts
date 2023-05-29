import {
  ProcedureBean,
  ProcedureMetadata,
  SensorPositionMetadata,
} from 'src/common/models/Procedure';
import { MovementUtil } from 'src/common/utils/SessionController/MovementUtil';
import _ from 'lodash';
import { v4 as uuid } from 'uuid';
import { RulesMetadata } from 'src/common/models/Movement';

class ProcedureUtil implements ProcedureMetadata, ProcedureBean {
  // Bean
  movements: MovementUtil[] = [];
  procedure?: string;
  observation = '';

  // Metadata
  uuid?: string;
  value?: string;
  articulation_name?: string;
  minSensor?: number;
  movementsOptions?: RulesMetadata[] = [];
  positionOptions?: SensorPositionMetadata[] = [];

  constructor() {
    this.uuid = uuid();
  }

  addMovement() {
    this.movements.push(new MovementUtil());
  }

  removeMovement(uuid: string) {
    const rIndex = this.movements.findIndex(
      (m: MovementUtil) => m.uuid === uuid
    );
    if (rIndex !== -1) {
      this.movements.splice(rIndex, 1);
    }
  }

  selectProcedure(value: string, procedures: ProcedureMetadata[]) {
    this.procedure = value; // Seta o valor para o bean da sessão (alias na sessão é procedure, checar backend)
    this.value = value; // Seta o valor na igual está no arquivo de procedure
    // Seta os metadata desse procedimento
    const foundProcedure = procedures.find((p) => p.value === value);
    if (foundProcedure) {
      this.movementsOptions = foundProcedure.rules;
      this.positionOptions = foundProcedure.sensor_positions;
      this.minSensor = foundProcedure.min_sensor;
      this.articulation_name = foundProcedure.articulation_name;
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
    return (
      this.notNull &&
      this.notEmpty &&
      this.movements.every((m: MovementUtil) => m.valid)
    );
  }
}

export { ProcedureUtil };
