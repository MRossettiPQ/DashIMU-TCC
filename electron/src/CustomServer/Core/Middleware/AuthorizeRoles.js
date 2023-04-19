import { logColor } from "../utils/LogUtil";
import { getUserContext } from "../utils/ContextUtil";
import { throwForbidden } from "../utils/RequestUtil";
import { translate } from "../utils/i18nUtil";

const VerifyRoles = function (roles = []) {
  return async function (req, res, next) {
    logColor("SERVER:VERIFY-ROLES", translate("authorize_roles.verify"));
    const userContext = await getUserContext(req, res);

    // Implement the middleware function based on the options object
    if (!roles.includes(userContext?.getDataValue?.("role")) || !userContext) {
      return await throwForbidden({
        local: "SERVER:ROLES",
        message: `${translate("authorize_roles.requires")} ${roles.join(",")}`,
        log: translate("authorize_roles.not_allowed"),
      });
    }
    next();
  };
};

export { VerifyRoles };
