const { PaginationUtil } = require("../../../Core/Utils/PaginationUtil");
const { Database } = require("../../../Core/Database");
const { environment } = require("../../../Environment");
const { throwNotFound, throwSuccess } = require("../../../Core/Utils/RequestUtil");
const dayjs = require("dayjs");

const { Session } = Database.models;
module.exports = new (class DevController {
  async testPagination(req) {
    let { id: patientId } = req.params;
    const { rpp, page, field } = req.query;

    patientId = 1;

    const pagination = await PaginationUtil(Session, {
      where: {
        patientId,
      },
      rpp,
      page,
      field,
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

  async ping() {
    console.log("aqui");
    return await throwSuccess({
      local: "SERVER:DEV",
      // content: { time: `Server online, current time: ${dayjs()}`, environment },
      message: `Server online, current time: ${dayjs()}`,
      log: "Ping",
    });
  }
})();
