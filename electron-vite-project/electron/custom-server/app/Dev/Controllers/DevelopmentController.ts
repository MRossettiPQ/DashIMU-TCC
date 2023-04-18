import { ContextRequest, throwNotFound, throwSuccess } from "../../../core/utils/RequestUtil";
import { translate } from "../../../core/utils/i18nUtil";
import dayjs from "dayjs";
import environment from "../../../environment";
import { PaginationOptions, PaginationUtil } from "../../../core/utils/PaginationUtil";
import { Database, LoadedCustomModels } from "../../../core/database";

const { Session }: LoadedCustomModels = <never>Database;
export default new (class DevelopmentControllers {
  async testPagination(req: ContextRequest) {
    // let { id: patientId } = req.params;
    const { rpp, page, field }: PaginationOptions = req.query;

    const pagination = await PaginationUtil(Session, {
      where: {
        patientId: 1,
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
    // TODO ping for test
    return await throwSuccess({
      responseType: "json",
      content: { time: `Server online, current time: ${dayjs()}`, environment },
      log: translate("development.ping"),
      local: "SERVER:PING",
    });
  }
})();
