import { ContextRequest, throwError, throwNotFound, throwSuccess } from "../../../core/utils/RequestUtil";
import { getUserContextId } from "../../../core/utils/ContextUtil";
import { Database, LoadedCustomModels } from "../../../core/database";
import { PaginationOptions, PaginationUtil } from "../../../core/utils/PaginationUtil";
import { getProcedures } from "./Procedure";
import SciLabServices from "../../../app/Session/Services/SciLabServices";

interface SessionPaginationOptions extends PaginationOptions {
  id?: number;
  term?: string;
}

const { Session, Movement, Sensor, GyroMeasurement }: LoadedCustomModels = Database.models;
export default new (class UserController {
  async save(req: ContextRequest) {
    const userId: number = await getUserContextId(req);
    const { session } = req.body;

    const newSession = await Session.create(
      {
        ...session,
        userId,
      },
      {
        include: [
          {
            model: Movement,
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
          },
        ],
      }
    );

    const result = await SciLabServices.getAllCalc(newSession.movements, newSession);

    return await throwSuccess({
      local: "SERVER:SESSION",
      content: {
        session: newSession,
        result,
      },
      message: "Session save successful",
      log: "Session save successful",
    });
  }

  async measurementList(req: ContextRequest) {
    const { id: sessionId }: SessionPaginationOptions = req.params;
    const { rpp, page, field }: SessionPaginationOptions = req.query;

    const pagination = await PaginationUtil(GyroMeasurement, {
      rpp,
      page,
      field,
      options: {
        include: [
          {
            model: Sensor,
            include: [
              {
                model: Movement,
                where: {
                  sessionId,
                },
              },
            ],
          },
        ],
      },
      order: [
        ["numberMensuration", "ASC"],
        ["sensorId", "ASC"],
      ],
    });
    /*
        const mensurationList = await GyroMeasurement.findAll({
          order: [
            ['numberMensuration', 'ASC'],
            ['sensorId', 'ASC'],
          ],
          include: [
            {
              model: Sensor,
              where: {
                movementId,
              },
            },
          ],
        })
        */

    if (!pagination) {
      return await throwNotFound({
        local: "SERVER:SESSION",
        log: "Not founded",
        message: "Not founded",
      });
    }

    return await throwSuccess({
      local: "SERVER:SESSION",
      content: pagination,
      log: "Founded",
    });
  }

  async list(req: ContextRequest) {
    const { id: idPatient }: SessionPaginationOptions = req.params;
    const { rpp, page, field }: SessionPaginationOptions = req.query;

    if (!idPatient) {
      return await throwError({
        local: "SERVER:SCILAB",
        message: "User not found",
        log: "User not found",
      });
    }

    const pagination = await PaginationUtil(Session, {
      rpp,
      page,
      field,
      order: [["id", "ASC"]],
    });

    if (!pagination) {
      return await throwNotFound({
        local: "SERVER:SESSION",
        message: "Not founded",
        log: "Not founded",
      });
    }

    return await throwSuccess({
      local: "SERVER:SESSION",
      content: pagination,
      log: "Founded",
    });
  }

  async get(req: ContextRequest) {
    const { id }: SessionPaginationOptions = req.params;
    if (!id) {
      return await throwNotFound({
        local: "SERVER:SESSION",
        message: "Not founded",
        log: "Not founded",
      });
    }

    const session = await Session.findByPk(id);
    if (!session) {
      return await throwNotFound({
        local: "SERVER:SESSION",
        message: "Not founded",
        log: "Not founded",
      });
    }

    return await throwSuccess({
      local: "SERVER:SESSION",
      content: session,
      log: "Founded",
    });
  }

  async metadata() {
    return await throwSuccess({
      local: "SERVER:SESSION",
      content: {
        procedures: getProcedures(),
      },
    });
  }
})();
