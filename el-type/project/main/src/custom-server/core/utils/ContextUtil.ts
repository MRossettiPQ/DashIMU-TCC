import type { ContextRequest } from './RequestUtil';
import { throwError, throwForbidden } from './RequestUtil';
import type { LoadedCustomModels } from '../database';
import { Database } from '../database';
import { logColor } from './LogUtil';
import { ResolveToken } from '../middleware/AuthorizeJwt';

const { User }: LoadedCustomModels = Database.models;

export async function getUserContextId(req: ContextRequest): Promise<any> {
  logColor('SERVER:CONTEXT', 'getUserContextId');
  // Get header token
  const token = req.headers['x-access-token'];
  if (!token) {
    return await throwForbidden({
      local: 'SERVER:USER-CONTEXT',
      message: 'No token provided',
      log: 'No token provided',
    });
  }

  req.context = {
    ...req.context,
    token,
  };

  // Check token
  const resultToken = await ResolveToken(token);
  if (!resultToken) {
    return await throwForbidden({
      local: 'SERVER:CONTEXT',
      message: 'Invalid token',
      log: 'Invalid token',
    });
  }
  return resultToken.id;
}

export async function getUserContext(req: ContextRequest): Promise<any> {
  logColor('SERVER:CONTEXT', 'getUserContext');
  if (req.context?.user) {
    return req.context.user;
  }

  const idUserContext: number = await getUserContextId(req);

  const user = await User.findByPk(idUserContext);
  if (!user) {
    return await throwError({
      local: 'SERVER:CONTEXT',
      message: 'Need to be logged in',
      log: 'Need to be logged in',
    });
  }

  req.context = {
    ...req.context,
    user,
  };

  return user;
}

export async function getContext(req: ContextRequest): Promise<any> {
  logColor('SERVER:CONTEXT', `[${req.method}] - ${req.originalUrl} - getContext`);
  if (req.context) {
    return req.context;
  }

  return await throwError({
    local: 'SERVER:CONTEXT',
    message: 'No context',
    log: 'No context',
  });
}
