import _ from "lodash";
import { v4 as uuid } from "uuid";
import { Procedure } from "src/common/utils/SessionController/ProcedureUtil";

class Session {
  procedures = [];
  patientId = null;
  uuid = "";

  get minSensor() {
    return this.procedures.map((p) => p.minSensor)?.join(" | ");
  }

  constructor() {
    this.uuid = uuid(null, null, null);
  }

  addProcedure() {
    this.procedures.push(new Procedure());
  }

  removeProcedure(uuid) {
    const rIndex = this.procedures.findIndex((p) => p.uuid === uuid);
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
    return this.notEmpty && this.procedures.every((p) => p.valid);
  }

  get procedurePositionsWithMoreOptions() {
    return this.procedures.reduce(({ positionOptions: prev }, { positionOptions: current }) => (prev.length > current.length ? prev : current)).positionOptions || [];
  }
}

export { Session };
