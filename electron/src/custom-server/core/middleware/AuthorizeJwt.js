const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const { settings } = require('../../settings')
const { throwForbidden } = require('../utils/RequestUtil')
const { logColor } = require('../utils/LogUtil')
const { translate } = require('../utils/i18nUtil')

const CreateToken = async (payload) => {
  logColor('SERVER:CREATE-TOKEN', translate('authorize_jwt.create_token'))
  return await jwt.sign({ ...payload }, settings.secret)
}

const ResolveToken = async (token) => {
  logColor('SERVER:RESOLVE-TOKEN', translate('authorize_jwt.compare_crypt'))
  return jwt.verify(token, settings.secret, null, null)
}

const CompareCrypt = async (first, second) => {
  logColor('SERVER:COMPARE-CRYPT', translate('authorize_jwt.compare_crypt'))
  return await bcryptjs.compare(first, second)
}

const VerifyToken = async (req, res, next) => {
  logColor('SERVER:VERIFY-TOKEN', translate('authorize_jwt.check_token'))
  // Get header token
  const token = req.headers['x-access-token']
  if (!token) {
    return await throwForbidden({
      local: 'SERVER:VERIFY-TOKEN',
      message: translate('authorize_jwt.no_token'),
      log: translate('authorize_jwt.no_token'),
    })
  }

  // Check token
  const resultToken = await ResolveToken(token)
  if (!resultToken) {
    return await throwForbidden({
      local: 'SERVER:VERIFY-TOKEN',
      message: translate('authorize_jwt.invalid_token'),
      log: translate('authorize_jwt.invalid_token'),
    })
  }

  // Add context object in req
  req.context = {
    ...req.context,
    token,
  }

  next()
}

module.exports = {
  ResolveToken,
  CreateToken,
  VerifyToken,
  CompareCrypt,
}
