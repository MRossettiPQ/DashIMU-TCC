const { Database } = require("../../../core/DataBase");
const { getUserContextId } = require("../../../core/utils/ContextUtil");
const { throwSuccess, throwNotFound, throwError } = require("../../../core/Utils/RequestUtil");
const { getAllCalc } = require("../Services/SciLabService");
const { PaginationUtil } = require("../../../core/Utils/PaginationUtil");
const Procedure = require("./Procedure");

const { GyroMeasurement, Sensor, Session, Movement } = Database.models;

module.exports = new (class SessionController {
  async save(req) {
    const idUserContext = await getUserContextId(req);

    let { session } = req.body;

    const newSession = await Session.create(
      {
        ...session,
        userId: idUserContext,
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

    let result = await getAllCalc(newSession.movements, newSession);

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

  async listMeasurement(req) {
    const { id: sessionId } = req.params;
    const { rpp, page, field } = req.query;
    console.log(req.query);
    const pagination = await PaginationUtil(GyroMeasurement, {
      rpp,
      page,
      field,
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
      order: [
        ["numberMensuration", "ASC"],
        ["sensorId", "ASC"],
      ],
    });
    console.log(pagination);
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

  async list(req) {
    const { id: idPatient } = req.params;
    const { rpp, page, field } = req.query;

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

  async get(req) {
    const { id } = req.params;
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
        procedures: Procedure.getProcedures(),
      },
    });
  }
})();
