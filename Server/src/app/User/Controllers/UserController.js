const { throwSuccess, throwError } = require('../../../core/Utils/RequestUtil')
const UserContext = require('../../../core/Utils/UserContext')

exports.postSaveUser = async (req, res) => {
  console.log('[GET] - /api/auth/context')
  try {
    const idUserContext = await UserContext.getUserContextId(req, res)
    throwSuccess({
      content: idUserContext,
      message: 'User context find',
      res,
    })
  } catch (e) {
    throwError({
      message: e.message,
      console: '[GET] - /api/auth/context - User context',
      res,
    })
  }
}
