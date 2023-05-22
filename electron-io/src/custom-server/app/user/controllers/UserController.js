const { throwSuccess, throwError } = require('../../../core/utils/RequestUtil')
const { getUserContext } = require('../../../core/utils/ContextUtil')

module.exports = new (class UserController {
  async save(req) {
    let userContext = await getUserContext(req)
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
})()
