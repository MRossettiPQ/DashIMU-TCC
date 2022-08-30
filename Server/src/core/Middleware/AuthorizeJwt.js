const jwt = require('jsonwebtoken')
const environment = require('../../../environment')
const { throwForbiddenIf } = require('../Utils/RequestUtil')
const UserContext = require('../Utils/UserContext')

exports.verifyToken = async (req, res, next) => {
  try {
    console.log('[JWT] - Validar token')
    const token = req.headers['x-access-token']

    await throwForbiddenIf({
      cond: !token,
      message: `No token provided`,
      log: `[CONTEXT] - No token provided`,
      res,
    })

    jwt.verify(
      token,
      environment.secret,
      (err, decoded) => {
        if (err) {
          return res.status(401).send({
            message: 'Não Autorizado!',
          })
        }
        console.log(`[JWT] - ${decoded.idUser} - ${token.substring(0, 60)}...`)
        next()
      },
      null
    )
  } catch (e) {
    console.error(e)
  }
}

exports.seAdmin = async (req, res, next) => {
  try {
    const userContext = await UserContext.getUserContext(req, res)

    await throwForbiddenIf({
      cond: userContext.getRole() !== 'ADMINISTRATOR',
      message: 'Requer ser um Fisioterapeuta!',
      console: '[JWT] - Authorization - Usuario não permitido',
      res,
    })

    console.log('[JWT] - Permissão verificada - Autorizado')
    next()
  } catch (e) {
    console.error(e)
  }
}

exports.sePaciente = async (req, res, next) => {
  try {
    const userContext = await UserContext.getUserContext(req, res)

    await throwForbiddenIf({
      cond: userContext.getRole() !== 'PATIENT',
      message: 'Requer ser um Fisioterapeuta!',
      console: '[JWT] - Authorization - Usuario não permitido',
      res,
    })

    console.log('[JWT] - Permissão verificada - Autorizado')
    next()
  } catch (e) {
    console.error(e)
  }
}

exports.seFisio = async (req, res, next) => {
  try {
    const userContext = await UserContext.getUserContext(req, res)

    await throwForbiddenIf({
      cond: userContext.getDataValue('role') !== 'PHYSIOTHERAPIST',
      message: 'Requer ser um Fisioterapeuta!',
      console: '[JWT] - Authorization - Usuario não permitido',
      res,
    })

    console.log('[JWT] - Permissão verificada - Autorizado')
    next()
  } catch (e) {
    console.error(e)
  }
}

exports.ifAdminPhysiotherapist = async (req, res, next) => {
  try {
    const userContext = await UserContext.getUserContext(req, res)

    await throwForbiddenIf({
      cond:
        userContext.getDataValue('role') !== 'PHYSIOTHERAPIST' &&
        userContext.getDataValue('role') !== 'ADMINISTRATOR',
      message: 'Requer ser um Fisioterapeuta ou Administrador',
      console: '[JWT] - Authorization - Usuario não permitido',
      res,
    })

    console.log('[JWT] - Permissão verificada - Autorizado')
    next()
  } catch (e) {
    console.error(e)
  }
}
