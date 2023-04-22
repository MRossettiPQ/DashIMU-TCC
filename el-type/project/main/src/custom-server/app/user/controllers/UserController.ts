import type { ContextRequest } from '../../../core/utils/RequestUtil';
import { throwError, throwSuccess } from '../../../core/utils/RequestUtil';
import { getUserContext } from '../../../core/utils/ContextUtil';
import { translate } from '../../../core/utils/i18nUtil';

export default new (class UserController {
  async save(req: ContextRequest) {
    const userContext = await getUserContext(req);

    if (userContext) {
      await throwError({
        local: 'SERVER:USER',
        message: translate('user.post_not_found'),
        log: translate('user.post_not_found'),
      });
    }

    await userContext.update(req.body);

    return await throwSuccess({
      local: 'SERVER:USER',
      message: translate('user.post_saved'),
      log: translate('user.post_saved'),
      content: userContext,
    });
  }
})();
