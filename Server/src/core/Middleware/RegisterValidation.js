const { User, Patient } = require('../DataBase')
const { throwErrorIf } = require('../Utils/RequestUtil')

exports.verifyUserEmailDuplicate = async (req, res, next) => {
  try {
    const userFound = await User.findOne({
      where: {
        username: req.body.username,
      },
    })

    if (userFound) {
      res.status(400).send({
        message: 'Falhou! Usuario esta em uso!',
      })
      return
    }

    const emailFound = await User.findOne({
      where: {
        email: req.body.email,
      },
    })

    if (emailFound) {
      res.status(400).send({
        message: 'Falhou! E-Mail esta em uso!',
      })
      return
    }

    next()
  } catch (e) {
    console.error(`\x1b[33m${e}\x1b[0m`)
  }
}

exports.verifyExistsCPFinPatient = async (req, res, next) => {
  try {
    const { cpf, idPatient } = req.body
    if (idPatient) {
      next()
      return
    }
    const patientFound = await Patient.findAll({
      where: {
        cpf: cpf,
      },
    })

    await throwErrorIf({
      cond: patientFound.length,
      message: 'CPF is already in use',
      log: '[MIDDLEWARE] - CPF is already in use',
      res,
    })

    next()
  } catch (e) {
    console.error(`\x1b[33m${e}\x1b[0m`)
  }
}
