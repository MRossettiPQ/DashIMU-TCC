import { logColor } from "../utils/LogUtil";
import { ContextRequest, throwForbidden } from "../utils/RequestUtil";
import { NextFunction, Response } from "express";
import { translate } from "../utils/i18nUtil";
import { getUserContext } from "../utils/ContextUtil";
import { UserModel } from "../../app/User/Models/User";

async function VerifyRoles(roles: string[] = []) {
  return async function (req: ContextRequest, res: Response, next: NextFunction): Promise<any> {
    logColor("SERVER:VERIFY-ROLES", translate("authorize_roles.verify"));
    const userContext: UserModel = await getUserContext(req);

    // Implement the middleware function based on the options object
    if (!roles.includes(userContext.getDataValue?.("role")) || !userContext) {
      return await throwForbidden({
        local: "SERVER:ROLES",
        message: `${translate("authorize_roles.requires")} ${roles.join(",")}`,
        log: translate("authorize_roles.not_allowed"),
      });
    }
    next();
  };
}

export { VerifyRoles };
