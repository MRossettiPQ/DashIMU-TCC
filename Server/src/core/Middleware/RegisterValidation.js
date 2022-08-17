const { User, Patient } = require('../DataBase')

exports.verifyUserEmailDuplicate = async (req, res, next) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  }).then((userVerified) => {
    if (userVerified) {
      res.status(400).send({
        message: 'Falhou! Usuario esta em uso!',
      })
      return
    }

    // Email
    Patient.findOne({
      where: {
        email: req.body.email,
      },
    }).then((userVerified) => {
      if (userVerified) {
        res.status(400).send({
          message: 'Falhou! E-Mail esta em uso!',
        })
        return
      }

      next()
    })
  })
}

exports.verifyExistsCPF = async (req, res, next) => {
  Patient.findOne({
    where: {
      cpfPaciente: req.body.cpfPaciente,
    },
  }).then((usuarioVerifica) => {
    console.log('Usuario encontrado: ', usuarioVerifica)
    if (usuarioVerifica) {
      res.status(400).send({
        message: 'Falhou! CPF esta na lista!',
      })
      return
    }

    next()
  })
}
