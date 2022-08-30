const {
  throwSuccess,
  throwErrorIf,
} = require('../../../core/Utils/RequestUtil')
const UserContext = require('../../../core/Utils/UserContext')

exports.postSaveUser = async (req, res) => {
  console.log('[GET] - /api/user')
  try {
    const userContext = await UserContext.getUserContext(req, res)

    await throwErrorIf({
      cond: userContext === null,
      log: '[GET] - /api/auth/context - User not found',
      res,
    })

    await userContext.update(req.body)

    await throwSuccess({
      content: userContext,
      message: 'User context find',
      log: 'User context find',
      res,
    })
  } catch (e) {
    console.error(`\x1b[31m${e}\x1b[0m`)
  }
}
