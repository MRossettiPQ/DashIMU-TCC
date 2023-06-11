const { User } = require('../database').models
const { throwError, throwForbidden } = require('./RequestUtil')
const { logColor } = require('./LogUtil')
const { ResolveToken } = require('../middleware/AuthorizeJwt')
const _ = require('lodash')

exports.getUserContextId = async (req) => {
  logColor('SERVER:CONTEXT', `getUserContextId`)
  // Get header token
  // const token = req.headers['x-access-token']
  let authHeader = req.headers['authorization']
  let token = null
  if (authHeader?.startsWith('Bearer ')) {
    token = authHeader.substring(7, authHeader.length)
  }
  console.log(token)

  if (_.isUndefined(token) || _.isNil(token)) {
    return await throwForbidden({
      local: 'SERVER:USER-CONTEXT',
      message: `No token provided`,
      log: `No token provided`,
    })
  }

  req.context = {
    ...req.context,
    token,
  }

  // Check token
  const resultToken = await ResolveToken(token)
  if (_.isUndefined(resultToken) || _.isNil(resultToken)) {
    return await throwForbidden({
      local: 'SERVER:CONTEXT',
      message: `Invalid token`,
      log: `Invalid token`,
    })
  }
  return resultToken.id
}

exports.getUserContext = async (req) => {
  logColor('SERVER:CONTEXT', `getUserContext`)
  if (req?.context?.user) {
    return req?.context?.user
  }

  const idUserContext = await this.getUserContextId(req)

  const user = await User.findByPk(idUserContext)
  if (!user) {
    return await throwError({
      local: 'SERVER:CONTEXT',
      message: `Need to be logged in`,
      log: `Need to be logged in`,
    })
  }

  req.context = {
    ...req.context,
    user,
  }

  return user
}

exports.getContext = async (req) => {
  logColor('SERVER:CONTEXT', `[${req.method}] - ${req.originalUrl} - getContext`)
  if (req?.context) {
    return req?.context
  }

  return await throwError({
    local: 'SERVER:CONTEXT',
    message: `No context`,
    log: `No context`,
  })
}
