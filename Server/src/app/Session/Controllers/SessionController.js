const { Mensuration, User, Patient } = require('../../../core/DataBase')
const UserContext = require('../../../core/utils/UserContext')
const { throwSuccess, throwError } = require('../../../core/Utils/RequestUtil')

exports.postCreateMensuration = async (req, res) => {
  console.log('[POST] - /api/session')
  try {
    const idUserContext = await UserContext.getUserContextId(req, res)
    const { id: idPatient } = req.params

    const mensuration = await Mensuration.create(req.body)

    throwSuccess({
      content: { id: null },
      message: 'Session save successful',
      console: '[POST] - /api/session - success save',
      res,
    })
  } catch (e) {
    throwError({
      message: `Session not save - ${e.message}`,
      console: '[POST] - /api/session - not save',
      res,
    })
  }
}

exports.postCreateMensurationTest = async (req, res) => {
  console.log('[POST] - /api/medicao')
  // const idUserContext = UserContext.getUserContextId(req, res)
  // const {id: idPaciente} = req.params;

  const sensores = req.body

  let bulkMedicoes = []
  sensores.map((sensor) => bulkMedicoes.push(...sensor))
  bulkMedicoes = bulkMedicoes.map((medicao) => {
    medicao.idSessao = 1
    return medicao
  })
  Mensuration.bulkCreate(bulkMedicoes)
    .then((medicao) => {
      res.json(medicao)
    })
    .catch((err) => {
      res.status(500).send({ message: err.message })
    })
}

exports.getMensurationList = async (req, res) => {
  console.log('[GET] - /api/medicao')
  User.findByPk(req.idUsuario)
    .then((contextoUsuario) => {
      contextoUsuario.getPacientes().then((listaPacientes) => {
        res.status(200).send(listaPacientes)
      })
    })
    .catch((err) => {
      res.status(500).send({ message: err.message })
    })
}

exports.getMensuration = async (req, res) => {
  console.log('[GET] - /api/medicao/:id')
  const { id } = req.params

  if (id) {
    User.findByPk(req.idUsuario)
      .then((contextoUsuario) => {
        Patient.findByPk(id)
          .then((paciente) => {
            res.status(200).send(paciente)
          })
          .catch((err) => {
            res.status(500).send({ message: err.message })
          })
      })
      .catch((err) => {
        res.status(500).send({ message: err.message })
      })
  } else {
    res.status(500).send({ message: 'id não informado' })
  }
}
