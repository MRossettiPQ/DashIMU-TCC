import type { ContextRequest } from '../../../core/utils/RequestUtil';
import { throwNotFound, throwSuccess } from '../../../core/utils/RequestUtil';
import { translate } from '../../../core/utils/i18nUtil';
import dayjs from 'dayjs';
import type { PaginationOptions } from '../../../core/utils/PaginationUtil';
import { PaginationUtil } from '../../../core/utils/PaginationUtil';
import type { LoadedCustomModels } from '../../../core/database';
import { Database } from '../../../core/database';

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
        local: 'SERVER:SESSION',
        message: 'Not founded',
        log: 'Not founded',
      });
    }

    return await throwSuccess({
      local: 'SERVER:SESSION',
      content: pagination,
      log: 'Founded',
    });
  }

  async ping() {
    // TODO ping for test
    return await throwSuccess({
      responseType: 'json',
      content: { time: `Server online, current time: ${dayjs()}` },
      log: translate('development.ping'),
      local: 'SERVER:PING',
    });
  }
})();
