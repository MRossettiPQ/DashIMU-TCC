const { logColor } = require("./LogUtil");

// Setups
const ServerResponses = {
  Success: {
    code: 200,
    message: "Success",
    color: "fg.green",
  },
  Unauthorized: {
    code: 401,
    message: "Unauthorized!",
    color: "fg.red",
  },
  Forbidden: {
    code: 403,
    message: "Forbidden!",
    color: "fg.red",
  },
  NotFound: {
    code: 404,
    message: "Error 404 Not Found!",
    color: "fg.blue",
  },
  InternalError: {
    code: 500,
    message: "Internal error!",
    color: "fg.red",
  },
  ValidationErrorItem: {
    code: 500,
    message: "Internal error!",
    color: "fg.red",
  },
  ValidationError: {
    code: 500,
    message: "Internal error!",
    color: "fg.red",
  },
};

function getResponseCode(type = "ValidationError") {
  return ServerResponses[type].code;
}

function getResponseMessage(type = "ValidationError") {
  return ServerResponses[type].code;
}

function getResponseColor(type = "ValidationError") {
  return ServerResponses[type].color;
}

// Resolver para caso seja servido arquivos estaticos no servidor
const SpaResolver = (req, res, next) => {
  const toApi = req.originalUrl.includes("/api");
  const toSwagger = req.originalUrl.includes("/api-docs");
  const toPublic = req.originalUrl === "/";
  if (toApi || toSwagger || toPublic) {
    return next();
  }
  return res.redirect(`/#${req.originalUrl}`);
};

const AsyncMiddlewares = (handlers = []) => {
  return AsyncHandlers(handlers, true);
};
const AsyncMiddleware = (callback) => {
  return AsyncHandler(callback, true);
};

// Gerenciador em cadeia de controllers
const AsyncHandlers = (handlers = [], middleware = false) => {
  return handlers.map((callback, index) => AsyncHandler(callback, middleware, index));
};

// Gerenciador de conexão
const AsyncHandler = (callback, middleware = false, index = 0) => {
  return function (req, res, next) {
    let result = null;

    function setResult(v) {
      if (v !== undefined) {
        result = v;
      }
    }

    if (!middleware) {
      logColor("SERVER:REQUEST", `[${req.method}] - ${req.originalUrl}`, "fg.magenta");
    }

    callback(req, res, next)
      .then(setResult)
      .catch(setResult)
      .finally(() => {
        // Em caso de não ser um middleware e não possuir type, considerar como erro
        if (!result?.type && !middleware) {
          result = {
            type: "InternalError",
            message: result?.toString(),
            local: "SERVER:ERROR",
            color: "fg.red",
          };
        }

        // Em caso de ser um middleware e não possuir type, considerar como sucesso
        if (!result?.type && middleware) {
          result = {
            type: "Success",
          };
        }
        // Em caso de não ser um middleware responser em qualquer caso
        // Em caso de ser um middleware só responder a request se não for um sucesso
        if (!middleware || (middleware && !["Success"].includes(result?.type))) {
          logColor(result?.local, `[${req.method}] - ${req.originalUrl}`, getResponseColor(result.type) || "reset");

          switch (result.responseType) {
            case "json":
              res
                .json({
                  message: result?.message,
                  content: result?.content,
                })
                .end();
              break;

            case "content":
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
};

// Error 500
function throwError({ message = ServerResponses.InternalError.message, local = "", log = "", responseType = "content" }) {
  return new Promise((resolve, reject) => {
    return reject({
      type: "InternalError",
      local,
      log,
      message,
      responseType,
    });
  });
}

// Success 200
function throwSuccess({ content = null, message = "", log = "", local = "", responseType = "content" }) {
  return new Promise((resolve) => {
    return resolve({
      type: "Success",
      local,
      log,
      message,
      content,
      responseType,
    });
  });
}

// Error 403
function throwForbidden({ message = null, local = "SERVER:FORBIDDEN", log = "", responseType = "content" }) {
  return new Promise((resolve, reject) => {
    return reject({
      type: "Forbidden",
      local,
      log,
      message,
      responseType,
    });
  });
}

// Error 404
function throwNotFound({ message = null, local = "SERVER:NOTFOUND", log = "", responseType = "content" }) {
  return new Promise((resolve, reject) => {
    return reject({
      type: "NotFound",
      local,
      log,
      message,
      responseType,
    });
  });
}

// Error 401
function throwUnauthorized({ message = null, local = "SERVER:UNAUTHORIZED", log = "", responseType = "content" }) {
  return new Promise((resolve, reject) => {
    return reject({
      type: "Unauthorized",
      local,
      log,
      message,
      responseType,
    });
  });
}

module.exports = { SpaResolver, AsyncHandlers, AsyncHandler, AsyncMiddlewares, AsyncMiddleware, throwError, throwSuccess, throwForbidden, throwNotFound, throwUnauthorized };
