const { Patient } = require('../../../core/DataBase')
const {
  throwSuccess,
  throwErrorIf,
} = require('../../../core/Utils/RequestUtil')

exports.postCreatePatient = async (req, res) => {
  try {
    console.log('[POST] - /api/patient')
    let patient = await Patient.findByPk(req.body.idPatient)

    if (patient) {
      // Update registered patient
      patient = await patient.update({
        name: req.body.name,
        cpf: req.body.cpf,
        email: req.body.email,
        phone: req.body.phone,
        birthday: req.body.birthday,
        height: req.body.height,
      })
    } else {
      patient = await Patient.create(req.body)
    }

    await throwErrorIf({
      cond: patient === null,
      message: 'Patient not save',
      log: '[POST] - /api/patient - not save',
      res,
    })

    await throwSuccess({
      content: patient,
      message: 'Patient save successful',
      log: '[POST] - /api/patient - success save',
      res,
    })
  } catch (e) {
    console.error(`\x1b[31m${e}\x1b[0m`)
  }
}

exports.getPatientList = async (req, res) => {
  try {
    console.log('[GET] - /api/patient')

    const patient = await Patient.findAll()

    await throwErrorIf({
      cond: !patient.length,
      //  message: 'Patient list is empty',
      log: '[GET] - /api/patient - not found',
      res,
    })

    await throwSuccess({
      content: { resultList: patient },
      //  message: 'Patient founded',
      log: '[GET] - /api/patient - Patient founded',
      res,
    })
  } catch (e) {
    console.error(`\x1b[31m${e}\x1b[0m`)
  }
}

exports.getPatient = async (req, res) => {
  try {
    console.log('[GET] - /api/patient/:id')
    const { id: idPatient } = req.params
    const patient = await Patient.findByPk(idPatient)

    await throwErrorIf({
      cond: patient === null,
      message: 'Patient not found',
      log: '[GET] - /api/patient/:id - not found',
      res,
    })

    await throwSuccess({
      content: patient,
      message: 'Patient founded',
      log: '\x1b[32m[GET] - /api/patient/:id - Patient founded',
      res,
    })
  } catch (e) {
    console.error(`\x1b[31m${e}\x1b[0m`)
  }
}
