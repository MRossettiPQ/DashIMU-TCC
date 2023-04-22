import type { NextFunction, Request, Response } from 'express';
import { logColor } from './LogUtil';

export interface Context {
  // Context object
  user?: object | undefined | null;
  token?: string | string[] | null | undefined;
}

export interface ContextRequest extends Request {
  // Add context object to express request
  context?: Context;
}

export function SpaResolver(req: ContextRequest, res: Response, next: NextFunction) {
  // Resolver para caso seja servido arquivos estático no servidor
  const toApi = req.originalUrl.includes('/api');
  const toSwagger = req.originalUrl.includes('/api-docs');
  if (toApi || toSwagger) {
    return next();
  }
  return res.redirect(`/#${req.originalUrl}`);
}

const ServerResponses = {
  Success: {
    code: 200,
    message: 'Success',
    color: 'fg.green',
  },
  Unauthorized: {
    code: 401,
    message: 'Unauthorized!',
    color: 'fg.red',
  },
  Forbidden: {
    code: 403,
    message: 'Forbidden!',
    color: 'fg.red',
  },
  NotFound: {
    code: 404,
    message: 'Error 404 Not Found!',
    color: 'fg.blue',
  },
  InternalError: {
    code: 500,
    message: 'Internal error!',
    color: 'fg.red',
  },
  ValidationErrorItem: {
    code: 500,
    message: 'Internal error!',
    color: 'fg.red',
  },
  ValidationError: {
    code: 500,
    message: 'Internal error!',
    color: 'fg.red',
  },
};

type ResponseKey = keyof typeof ServerResponses;

export interface RequestReturn {
  // Request return object
  type?: ResponseKey;
  responseType?: string | null;
  color?: string | null;
  message?: string | null;
  local?: string;
  log?: string;
  content?: object | string | null | undefined;
}

function getResponseCode(type: ResponseKey = 'ValidationError') {
  return ServerResponses[type].code;
}

// function getResponseMessage(type: ResponseKey = "ValidationError") {
//   return ServerResponses[type].code;
// }

function getResponseColor(type: ResponseKey = 'ValidationError') {
  return ServerResponses[type].color;
}

export function AsyncHandlers(handlers: any[] = [], middleware = false) {
  // Gerenciador em cadeia de controllers
  return handlers.map((callback: any, index: number) => AsyncHandler(callback, middleware, index));
}

export function AsyncMiddlewares(handlers: any[] = []) {
  // Gerenciador em cadeia de middleware
  return AsyncHandlers(handlers, true);
}

export function AsyncMiddleware(callback: any) {
  // Gerenciador de middleware
  return AsyncHandler(callback, true);
}

export function AsyncHandler(callback: any, middleware = false, index = 0) {
  // Gerenciador de conexão
  return function (req: ContextRequest, res: Response, next: NextFunction) {
    let result: RequestReturn;

    function setResult(v: RequestReturn) {
      if (v !== undefined) {
        result = v;
      }
    }

    if (!middleware) {
      // Console do request origin
      logColor('SERVER:REQUEST', `[${req.method}] - ${req.originalUrl} - ${index}`, 'fg.magenta');
    }

    callback(req, res, next)
      .then(setResult)
      .catch(setResult)
      .finally(() => {
        // Em caso de não ser um middleware e não possuir type, considerar como erro
        if (!result.type && !middleware) {
          result = {
            type: 'InternalError',
            message: result?.toString(),
            local: 'SERVER:ERROR',
            color: 'fg.red',
          };
        }

        // Em caso de ser um middleware e não possuir type, considerar como sucesso
        if (!result.type && middleware) {
          result = {
            type: 'Success',
          };
        }

        // Caso não seja um middleware responder em qualquer caso
        // Caso seja um middleware só responder a request se não for um sucesso
        if (!middleware || (middleware && result?.type && !['Success'].includes(result?.type))) {
          logColor(
            result?.local,
            `[${req.method}] - ${req.originalUrl}`,
            getResponseColor(result.type) || 'reset',
          );
          switch (result.responseType) {
            case 'json':
              res
                .json({
                  message: result?.message,
                  content: result?.content,
                })
                .end();
              break;

            case 'content':
            default:
              res
                .status(getResponseCode(result.type))
                .send({
                  message: result?.message,
                  content: result?.content,
                })
                .end();
              break;
          }
        }
      });
  };
}

export function throwError({
  message = ServerResponses.InternalError.message,
  local = '',
  log = '',
  responseType = 'content',
}) {
  // Error 500
  return new Promise((resolve, reject) => {
    return reject({
      type: 'InternalError',
      local,
      log,
      message,
      responseType,
    });
  });
}

export function throwSuccess({
  content = null,
  message = '',
  log = '',
  local = '',
  responseType = 'content',
}: RequestReturn) {
  // Success 200
  return new Promise(resolve => {
    return resolve({
      type: 'Success',
      local,
      log,
      message,
      content,
      responseType,
    });
  });
}

export function throwForbidden({
  message = null,
  local = 'SERVER:FORBIDDEN',
  log = '',
  responseType = 'content',
}: RequestReturn) {
  // Error 403
  return new Promise((resolve, reject) => {
    return reject({
      type: 'Forbidden',
      local,
      log,
      message,
      responseType,
    });
  });
}

export function throwNotFound({
  message = null,
  local = 'SERVER:NOTFOUND',
  log = '',
  responseType = 'content',
}: RequestReturn) {
  // Error 404
  return new Promise((resolve, reject) => {
    return reject({
      type: 'NotFound',
      local,
      log,
      message,
      responseType,
    });
  });
}

export function throwUnauthorized({
  message = null,
  local = 'SERVER:UNAUTHORIZED',
  log = '',
  responseType = 'content',
}: RequestReturn) {
  // Error 401
  return new Promise((resolve, reject) => {
    return reject({
      type: 'Unauthorized',
      local,
      log,
      message,
      responseType,
    });
  });
}
