const { PaginationUtil } = require("../../../Core/Utils/PaginationUtil");
const { Database } = require("../../../Core/Database");
const { throwNotFound, throwSuccess } = require("../../../Core/Utils/RequestUtil");
const dayjs = require("dayjs");

const { Session } = Database.models;
console.log(Session);
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

  async ping(req) {
    console.log("aqui");
    return await throwSuccess({
      local: "SERVER:DEV",
      // content: { time: `Server online, current time: ${dayjs()}`, environment },
      content: {
        url: req.socket.url,
      },
      message: `Server online, current time: ${dayjs()}`,
      log: "Ping",
    });
  }
})();
