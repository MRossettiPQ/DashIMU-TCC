const bcryptjs = require('bcryptjs')
const { User } = require('../../../core/DataBase').models
const { throwSuccess, throwError, throwUnauthorized, throwNotFound } = require('../../../core/Utils/RequestUtil')
const { translate } = require('../../../core/Utils/i18nUtil')
const { CreateToken, CompareCrypt } = require('../../../core/Middleware/AuthorizeJwt')
const ContextUtil = require('../../../core/Utils/ContextUtil')

exports.register = async (req) => {
  const newUser = await User.create({
    ...req.body,
    password: bcryptjs.hashSync(req.body.password, 8),
  })

  return await throwSuccess({
    local: 'SERVER:AUTHENTICATION',
    content: {
      username: newUser.username,
      email: newUser.email,
    },
    message: translate('authentication.created'),
    log: translate('authentication.created'),
  })
}

exports.login = async (req) => {
  const userFound = await User.findOne({
    where: {
      username: req.body.username,
    },
  })

  if (!userFound) {
    return await throwNotFound({
      local: 'SERVER:AUTHENTICATION',
      message: translate('user.auth_not_found'),
      log: translate('user.auth_not_found'),
    })
  }

  const validPassword = await CompareCrypt(req.body.password, userFound.password)

  if (!validPassword) {
    return await throwUnauthorized({
      local: 'SERVER:AUTHENTICATION',
      message: translate('authentication.invalid_password'),
      log: translate('authentication.invalid_password'),
    })
  }

  const token = await CreateToken({
    id: userFound.id,
  })

  if (!token) {
    return await throwError({
      local: 'SERVER:AUTHENTICATION',
      message: translate('user.auth_unable_authenticate'),
      log: translate('user.auth_unable_authenticate'),
    })
  }

  return await throwSuccess({
    local: 'SERVER:AUTHENTICATION',
    content: {
      id: userFound.id,
      name: userFound.name,
      role: userFound.role,
      username: userFound.username,
      email: userFound.email,
      accessToken: token,
    },
    message: translate('user.auth_success'),
    log: translate('user.auth_success'),
  })
}

exports.getUserContext = async (req) => {
  const userContext = await ContextUtil.getUserContext(req)

  if (!userContext) {
    return await throwError({
      local: 'SERVER:AUTHENTICATION',
      message: translate('user.auth_not_found'),
      log: translate('user.auth_not_found'),
    })
  }

  return await throwSuccess({
    local: 'SERVER:AUTHENTICATION',
    content: {
      id: userContext.id,
      name: userContext.name,
      role: userContext.role,
      username: userContext.username,
      email: userContext.email,
    },
    log: translate('user.auth_found'),
  })
}
