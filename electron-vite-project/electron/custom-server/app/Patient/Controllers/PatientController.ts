import { ContextRequest, throwError, throwSuccess } from "../../../core/utils/RequestUtil";
import { Database, LoadedCustomModels } from "../../../core/database";
import { GetWhere, PaginationOptions, PaginationUtil } from "../../../core/utils/PaginationUtil";

const { Patient }: LoadedCustomModels = Database.models;

interface PatientPaginationOptions extends PaginationOptions {
  term?: string;
}

export default new (class PatientController {
  async save(req: ContextRequest): Promise<any> {
    if (!req.body) {
      return await throwError({
        local: "SERVER:PATIENT",
        message: "Nenhum dado valido foi enviado",
        log: "Nenhum dado valido foi enviado",
      });
    }
    let patient = await Patient.findByPk(req.body.id);
    if (patient) {
      // Update registered patient
      patient = await patient.update({
        ...req.body,
      });
    } else {
      patient = await Patient.create(req.body);
    }

    if (!patient) {
      return await throwError({
        local: "SERVER:PATIENT",
        message: "Patient not save",
        log: "Patient not save",
      });
    }

    return await throwSuccess({
      local: "SERVER:PATIENT",
      content: patient,
      message: "Patient save successful",
      log: "Patient save successful",
    });
  }

  async list(req: ContextRequest): Promise<any> {
    const { rpp, page, field, term }: PatientPaginationOptions = req.query;
    const pagination = await PaginationUtil(Patient, {
      where: GetWhere(!term?.length, { name: term }),
      rpp,
      page,
      field,
    });

    return await throwSuccess({
      local: "SERVER:PATIENT",
      content: pagination,
      log: "Patient list",
    });
  }

  async get(req: ContextRequest): Promise<any> {
    const { id: idPatient } = req.params;
    const patient = await Patient.findByPk(idPatient);

    if (!patient) {
      return await throwError({
        local: "SERVER:PATIENT",
        message: "Patient not found",
        log: "Patient not found",
      });
    }

    return await throwSuccess({
      local: "SERVER:PATIENT",
      content: patient,
      log: "Patient founded",
    });
  }
})();
