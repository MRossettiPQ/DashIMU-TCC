const { throwSuccess, throwError } = require('../../../core/Utils/RequestUtil')
const ContextUtil = require('../../../core/Utils/ContextUtil')

exports.postSaveUser = async (req) => {
  let userContext = await ContextUtil.getUserContext(req)
  if (!userContext) {
    return await throwError({
      local: 'SERVER:USER',
      message: 'User not found',
      log: 'User not found',
    })
  }

  userContext = await userContext.update(req.body)

  return await throwSuccess({
    local: 'SERVER:USER',
    content: userContext,
    message: 'User context find',
    log: 'User context find',
  })
}
