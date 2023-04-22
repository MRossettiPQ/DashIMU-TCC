import { translate } from '/@/custom-server/core/utils/i18nUtil';
import { logColor } from '/@/custom-server/core/utils/LogUtil';
import type { ContextRequest } from '/@/custom-server/core/utils/RequestUtil';
import { throwForbidden } from '/@/custom-server/core/utils/RequestUtil';
import jwt from 'jsonwebtoken';
import { settings } from '/@/custom-server/settings';
import type { NextFunction, Response } from 'express';
import bcryptjs from 'bcryptjs';

export async function CreateToken(payload: object): Promise<string> {
  logColor('SERVER:CREATE-TOKEN', translate('authorize_jwt.create_token'));
  return jwt.sign(
    {
      ...payload,
    },
    settings.secret,
    {
      expiresIn: 3 * 86400, // TODO validade do token
    },
  );
}

export async function ResolveToken(token: string | any): Promise<any> {
  logColor('SERVER:RESOLVE-TOKEN', translate('authorize_jwt.resolve_token'));
  return jwt.verify(token, settings.secret);
}

export async function CompareCrypt(first: string, second: string): Promise<boolean> {
  logColor('SERVER:COMPARE-CRYPT', translate('authorize_jwt.compare_crypt'));
  return bcryptjs.compareSync(first, second);
}

export async function VerifyToken(req: ContextRequest, res: Response, next: NextFunction) {
  logColor('SERVER:VERIFY-TOKEN', translate('authorize_jwt.check_token'));
  // Get header token
  const token = req.headers['x-access-token'];
  if (!token) {
    return await throwForbidden({
      local: 'SERVER:VERIFY-TOKEN',
      message: translate('authorize_jwt.no_token'),
      log: translate('authorize_jwt.no_token'),
    });
  }

  // Check token
  const resultToken = await ResolveToken(token);
  if (!resultToken) {
    return await throwForbidden({
      local: 'SERVER:VERIFY-TOKEN',
      message: translate('authorize_jwt.invalid_token'),
      log: translate('authorize_jwt.invalid_token'),
    });
  }

  // Add context object in request context
  req.context = {
    token,
    ...req.context,
  };

  next();
}
