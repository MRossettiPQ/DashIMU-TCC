import { ContextRequest, throwError, throwSuccess } from "../../../core/utils/RequestUtil";
import { getUserContextId } from "../../../core/utils/ContextUtil";
import { PaginationOptions } from "../../../core/utils/PaginationUtil";
import { Database, LoadedCustomModels } from "../../../core/database";
import SciLabServices from "../../../app/Session/Services/SciLabServices";

interface SessionPaginationOptions extends PaginationOptions {
  id?: number;
}

const { Session, Movement, Sensor, GyroMeasurement }: LoadedCustomModels = Database.models;
export default new (class SciLabController {
  async getCalculationVariabilityCenter(req: ContextRequest) {
    const userId: number = await getUserContextId(req);
    if (!userId) {
      return await throwError({
        local: "SERVER:SCILAB",
        message: "Need to be logged in",
        log: "Need to be logged in",
      });
    }

    const { id }: SessionPaginationOptions = req.params;
    if (!id) {
      return await throwError({
        local: "SERVER:SCILAB",
        message: "Patient ID is missing",
        log: "Patient ID is missing",
      });
    }
    const session = await Session.findByPk(id);
    const movements = await Movement.findAll({
      where: {
        sessionId: id,
      },
      include: [
        {
          model: Sensor,
          include: [
            {
              model: GyroMeasurement,
            },
          ],
        },
      ],
    });

    if (!movements?.length) {
      return await throwError({
        local: "SERVER:SCILAB",
        message: "Does not have measurements",
        log: "Does not have measurements",
      });
    }
    const result = await SciLabServices.getAllCalc(movements, session);

    return await throwSuccess({
      local: "SERVER:SCILAB",
      content: result,
      log: "Calculation performed successfully",
    });
  }
})();
