const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { User } = require('../../../core/DataBase')
const environment = require('../../../../environment')
const {
  throwSuccess,
  throwErrorIf,
} = require('../../../core/Utils/RequestUtil')
const UserContext = require('../../../core/Utils/UserContext')

exports.register = async (req, res) => {
  console.log('[POST] - /api/auth/register')
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      name: req.body.name,
      password: bcrypt.hashSync(req.body.password, 8),
    })

    await throwSuccess({
      content: {
        username: newUser.username,
        email: newUser.email,
      },
      message: '\x1b[32mUser registrado com sucesso!\x1b[0m',
      res,
    })
  } catch (e) {
    console.error(`\x1b[31m${e}\x1b[0m`)
  }
}

exports.login = async (req, res) => {
  console.log('[POST] - /api/auth/login')
  try {
    const userFound = await User.findOne({
      where: {
        username: req.body.username,
      },
    })

    await throwErrorIf({
      cond: userFound === null,
      message: 'User not found',
      log: '[POST] - /api/auth/login - User not found',
      res,
    })

    const validPassword = await bcrypt.compareSync(
      req.body.password,
      userFound.password
    )

    if (!validPassword) {
      return res.status(401).send({
        accessToken: null,
        message: 'Invalid password!',
      })
    }

    const token = await jwt.sign(
      {
        idUser: userFound.idUser,
      },
      environment.secret,
      {
        expiresIn: 86400,
      },
      null
    )

    await throwErrorIf({
      cond: token === null,
      log: '[POST] - /api/auth/login - Unable to authenticate user',
      message: 'Unable to authenticate user',
      res,
    })

    await throwSuccess({
      content: {
        idUser: userFound.idUser,
        name: userFound.name,
        role: userFound.role,
        username: userFound.username,
        email: userFound.email,
        accessToken: token,
      },
      log: '\x1b[32m[POST] - /api/auth/login - User verify\x1b[0m',
      message: 'Logged in successfully',
      res,
    })
  } catch (e) {
    console.error(`\x1b[31m${e}\x1b[0m`)
  }
}

exports.getUserContext = async (req, res) => {
  console.log('[GET] - /api/auth/context')
  try {
    const userContext = UserContext.getUserContext(req, res)

    await throwErrorIf({
      cond: userContext === null,
      log: '[GET] - /api/auth/context - User not found',
      res,
    })

    await throwSuccess({
      content: {
        idUser: userContext.idUser,
        name: userContext.name,
        role: userContext.role,
        username: userContext.username,
        email: userContext.email,
      },
      log: '\x1b[32m[GET] - /api/auth/context - User context found\x1b[0m',
      res,
    })
  } catch (e) {
    console.error(`\x1b[31m${e}\x1b[0m`)
  }
}
