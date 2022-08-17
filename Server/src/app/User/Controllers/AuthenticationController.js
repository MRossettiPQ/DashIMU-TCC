const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { User } = require('../../../core/DataBase')
const environment = require('../../../../environment')
const {
  throwSuccess,
  throwError,
  throwNotFound,
} = require('../../../core/Utils/RequestUtil')
const { throwNotFoundIf } = require('../../../core/Utils/RequestUtil')
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
    throwSuccess({
      content: {
        username: newUser.username,
        email: newUser.email,
      },
      message: 'User registrado com sucesso!',
      res,
    })
  } catch (e) {
    throwError({
      message: e.message,
      console: '[POST] - /api/auth/register - User não registrado',
      res,
    })
  }
}

exports.login = async (req, res) => {
  console.log('[POST] - /api/auth/login')
  try {
    const userLogged = await User.findOne({
      where: {
        username: req.body.username,
      },
    })
    if (userLogged === null) {
    }
    throwNotFoundIf({
      cond: !userLogged,
      message: 'User not found',
      console: '[POST] - /api/auth/login - User not found',
      res,
    })
    const validPassword = bcrypt.compareSync(
      req.body.password,
      userLogged.password
    )

    if (!validPassword) {
      return res.status(401).send({
        accessToken: null,
        message: 'Invalid password!',
      })
    }

    const token = jwt.sign(
      {
        idUser: userLogged.idUser,
      },
      environment.secret,
      {
        expiresIn: 86400,
      },
      null
    )

    if (token !== null) {
      throwSuccess({
        content: {
          idUser: userLogged.idUser,
          name: userLogged.name,
          role: userLogged.role,
          username: userLogged.username,
          email: userLogged.email,
          accessToken: token,
        },
        console: '[POST] - /api/auth/login - User verify',
        message: 'Logged in successfully',
        res,
      })
    } else {
      throwError({
        console: '[POST] - /api/auth/login - Unable to authenticate user',
        message: 'Unable to authenticate user',
        res,
      })
    }
  } catch (e) {
    throwNotFound({
      console: '[POST] - /api/auth/login - User not found',
      message: `User not found, ${e.message}`,
      res,
    })
  } finally {
    console.log('[POST] - /api/auth/login - Finally')
  }
}

exports.getUserContext = async (req, res) => {
  console.log('[GET] - /api/auth/context')
  try {
    const userContext = UserContext.getUserContext(req, res)
    throwSuccess({
      content: userContext,
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
