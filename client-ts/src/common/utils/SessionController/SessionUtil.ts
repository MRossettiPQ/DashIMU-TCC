import _ from 'lodash';
import { v4 as uuid } from 'uuid';
import { ProcedureUtil } from './ProcedureUtil';
import { SessionBean } from 'src/common/models/Session';

class SessionUtil implements SessionBean {
  // Necessario para o bean da sessão (salvar no backend)
  procedures: ProcedureUtil[] = [];
  patientId?: number;

  // Metadata local
  uuid?: string;

  get minSensorText() {
    return this.procedures.map((p: ProcedureUtil) => p.minSensor)?.join(' | ');
  }

  constructor() {
    this.uuid = uuid();
  }

  addProcedure() {
    this.procedures.push(new ProcedureUtil());
  }

  removeProcedure(uuid: string) {
    const rIndex = this.procedures.findIndex(
      (p: ProcedureUtil) => p.uuid === uuid
    );
    if (rIndex !== -1) {
      this.procedures.splice(rIndex, 1);
    }
  }

  get notEmpty() {
    return !_.isEmpty(this.procedures);
  }

  get size() {
    return this.procedures.length;
  }

  get valid() {
    return (
      this.notEmpty && this.procedures.every((p: ProcedureUtil) => p.valid)
    );
  }

  check(previousValue: ProcedureUtil, currentValue: ProcedureUtil) {
    if (previousValue.positionOptions && currentValue.positionOptions) {
      return previousValue.positionOptions.length <=
        currentValue.positionOptions.length
        ? currentValue
        : previousValue;
    }
  }

  get procedurePositionsWithMoreOptions() {
    if (this.procedures.length) {
      return (
        this.procedures.reduce(
          (previousValue: ProcedureUtil, currentValue: ProcedureUtil) => {
            if (previousValue.positionOptions && currentValue.positionOptions) {
              return previousValue.positionOptions.length <=
                currentValue.positionOptions.length
                ? currentValue
                : previousValue;
            }
            return previousValue;
          }
        )?.positionOptions || []
      );
    }
    return [];
  }
}

export { SessionUtil };
