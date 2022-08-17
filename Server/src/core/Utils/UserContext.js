const jwt = require('jsonwebtoken')
const environment = require('../../../environment')
const { User } = require('../DataBase')
const { throwError } = require('./RequestUtil')

exports.getUserContextId = async (req, res) => {
  let token = req.headers['x-access-token']
  let idUser = null

  if (!token) {
    return res.status(403).send({
      message: 'Nenhum token fornecido!',
    })
  }

  return jwt.verify(
    token,
    environment.secret,
    (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: 'Não Autorizado!',
        })
      }
      idUser = decoded.idUser
    },
    (err, token) => {
      if (token !== null) {
        return idUser
      } else {
        throwError({
          message: 'Need to be logged in',
          console: '[CONTEXT] - Need to be logged in',
          res,
        })
      }
    }
  )
}

exports.getUserContext = async (req, res) => {
  const idUserContext = this.getUserContextId(req, res)

  try {
    const contextUser = await User.findById(idUserContext)
    if (contextUser === null) {
      return
    }
    req.contextUser = contextUser
    return contextUser
  } catch (e) {
    throwError({
      message: `Need to be logged in - ${e?.message}`,
      console: `[CONTEXT] - Need to be logged in - ${e?.message}`,
      res,
    })
  }
}
