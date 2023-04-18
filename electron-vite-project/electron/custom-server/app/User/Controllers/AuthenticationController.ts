import bcryptjs from "bcryptjs";
import { ContextRequest, throwError, throwNotFound, throwSuccess, throwUnauthorized } from "../../../core/utils/RequestUtil";
import { CompareCrypt, CreateToken } from "../../../core/middleware/AuthorizeJwt";
import { getUserContext } from "../../../core/utils/ContextUtil";
import { translate } from "../../../core/utils/i18nUtil";
import { Database, LoadedCustomModels } from "../../../core/database";

const { User }: LoadedCustomModels = Database.models;
export default new (class AuthenticationController {
  async register(req: ContextRequest): Promise<any> {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      name: req.body.name,
      password: bcryptjs.hashSync(req.body.password, 8),
    });

    return await throwSuccess({
      content: {
        username: newUser.username,
        email: newUser.email,
      },
      message: translate("authentication.created"),
      log: translate("authentication.created"),
      local: "SERVER:AUTHENTICATION",
    });
  }

  async login(req: ContextRequest): Promise<any> {
    const userFound = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!userFound) {
      return await throwNotFound({
        local: "SERVER:AUTHENTICATION",
        message: translate("user.auth_not_found"),
        log: translate("user.auth_not_found"),
      });
    }

    const validPassword = await CompareCrypt(req.body.password, userFound.password);

    if (!validPassword) {
      return await throwUnauthorized({
        local: "SERVER:AUTHENTICATION",
        message: translate("invalid_password"),
        log: translate("invalid_password"),
      });
    }

    const token = await CreateToken({
      id: userFound.id,
    });

    if (!token) {
      return await throwError({
        local: "SERVER:AUTHENTICATION",
        message: translate("user.auth_unable_authenticate"),
        log: translate("user.auth_unable_authenticate"),
      });
    }

    return await throwSuccess({
      local: "SERVER:AUTHENTICATION",
      content: {
        id: userFound.id,
        name: userFound.name,
        role: userFound.role,
        username: userFound.username,
        email: userFound.email,
        accessToken: token,
      },
      message: translate("user.auth_success"),
      log: translate("user.auth_success"),
    });
  }

  async getUserContext(req: ContextRequest): Promise<any> {
    const userContext = await getUserContext(req);

    if (userContext) {
      return await throwError({
        local: "SERVER:AUTHENTICATION",
        message: translate("user.auth_not_found"),
        log: translate("user.auth_not_found"),
      });
    }

    return await throwSuccess({
      local: "SERVER:AUTHENTICATION",
      content: {
        id: userContext.id,
        name: userContext.name,
        role: userContext.role,
        username: userContext.username,
        email: userContext.email,
      },
      log: translate("user.auth_found"),
    });
  }
})();
