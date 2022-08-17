const jwt = require('jsonwebtoken')
const environment = require('../../../environment')
const { User } = require('../DataBase')
const { throwForbiddenIf } = require('../Utils/RequestUtil')
const UserContext = require('../Utils/UserContext')

exports.verifyToken = async (req, res, next) => {
  console.log('[JWT] - Validar token')
  const token = req.headers['x-access-token']

  if (!token) {
    return res.status(403).send({
      message: 'Nenhum token fornecido!',
    })
  }

  jwt.verify(
    token,
    environment.secret,
    (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: 'Não Autorizado!',
        })
      }
      req.context = {
        idUSerContext: decoded.idUser,
      }
      console.log(`[JWT] - ${decoded.idUser} - ${token.substring(0, 60)}...`)
      next()
    },
    null
  )
}

exports.seAdmin = async (req, res, next) => {
  const idUserContext = UserContext.getUserContextId(req, res)
  User.findByPk(idUserContext).then((useVerified) => {
    throwForbiddenIf({
      cond: useVerified.getRole() !== 'ADMINISTRATOR',
      message: 'Requer ser um Fisioterapeuta!',
      console: '[JWT] - Authorization - Usuario não permitido',
      res,
    })

    console.log('[JWT] - Permissão verificada - Autorizado')
    next()
  })
}

exports.sePaciente = async (req, res, next) => {
  const idUserContext = UserContext.getUserContextId(req, res)
  User.findByPk(idUserContext).then((useVerified) => {
    throwForbiddenIf({
      cond: useVerified.getRole() !== 'PATIENT',
      message: 'Requer ser um Fisioterapeuta!',
      console: '[JWT] - Authorization - Usuario não permitido',
      res,
    })

    console.log('[JWT] - Permissão verificada - Autorizado')
    next()
  })
}

exports.seFisio = async (req, res, next) => {
  const idUserContext = UserContext.getUserContextId(req, res)
  User.findByPk(idUserContext).then((useVerified) => {
    throwForbiddenIf({
      cond: useVerified.getRole() !== 'PHYSIOTHERAPIST',
      message: 'Requer ser um Fisioterapeuta!',
      console: '[JWT] - Authorization - Usuario não permitido',
      res,
    })

    console.log('[JWT] - Permissão verificada - Autorizado')
    next()
  })
}

exports.ifAdminPhysiotherapist = async (req, res, next) => {
  const idUserContext = UserContext.getUserContextId(req, res)
  User.findByPk(idUserContext).then((useVerified) => {
    throwForbiddenIf({
      cond:
        useVerified.getRole() !== 'PHYSIOTHERAPIST' ||
        useVerified.getRole() !== 'ADMINISTRATOR',
      message: 'Requer ser um Administrador/Fisioterapeuta!',
      console: '[JWT] - Authorization - Usuario não permitido',
      res,
    })
    console.log('[JWT] - Permissão verificada - Autorizado')
    next()
  })
}
