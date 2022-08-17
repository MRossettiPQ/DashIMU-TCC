const { Patient, User } = require('../../../core/DataBase')
const UserContext = require('../../../core/Utils/UserContext')
const {
  throwSuccess,
  throwError,
  throwErrorIf,
  throwNotFoundIf,
} = require('../../../core/Utils/RequestUtil')

exports.postCreatePatient = async (req, res) => {
  try {
    console.log('[POST] - /api/patient')
    const idUserContext = UserContext.getUserContextId(req, res)
    let newPatient = await Patient.create({
      name: req.body.name,
      cpf: req.body.cpf,
      email: req.body.email,
      phone: req.body.phone,
      birthday: req.body.birthday,
      height: req.body.height,
    })

    throwErrorIf({
      cond: newPatient === null,
      message: 'Patient not save',
      console: '[POST] - /api/patient - not save',
      res,
    })

    newPatient = await newPatient.setUsers(idUserContext)

    throwSuccess({
      content: newPatient,
      message: 'Patient save successful',
      console: '[POST] - /api/patient - success save',
      res,
    })
  } catch (e) {
    throwError({
      message: e.message,
      console: '[POST] - /api/patient - User not save',
      res,
    })
  }
}

exports.getPatientList = async (req, res) => {
  try {
    console.log('[GET] - /api/patient')
    const idUserContext = UserContext.getUserContextId(req, res)
    const patient = await Patient.findAll({
      where: {
        fk_idUserContext: idUserContext,
      },
    })

    throwNotFoundIf({
      cond: patient === null,
      message: 'Patient not save',
      console: '[POST] - /api/patient - not found',
      res,
    })

    throwSuccess({
      content: patient,
      message: 'Patient founded',
      console: '[POST] - /api/patient - Patient founded',
      res,
    })
  } catch (e) {
    throwError({
      message: e.message,
      console: `[GET] - /api/patient - Error ${e.message}`,
      res,
    })
  }
}

exports.getPatient = async (req, res) => {
  try {
    console.log('[GET] - /api/patient/:id')
    const idUserContext = UserContext.getUserContextId(req, res)
    const { id: idPatient } = req.params
    const patient = await Patient.findByPk(idPatient)

    throwNotFoundIf({
      cond: idUserContext !== patient.getIdUser(),
      message: 'Patient not save',
      console: '[POST] - /api/patient - not found',
      res,
    })

    throwSuccess({
      content: patient,
      message: 'Patient founded',
      console: '[POST] - /api/patient - Patient founded',
      res,
    })
  } catch (e) {
    throwError({
      message: e.message,
      console: '[GET] - /api/patient',
      res,
    })
  }
}
