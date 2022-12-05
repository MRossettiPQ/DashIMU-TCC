const { Patient } = require('../../../core/DataBase')
const {
  throwSuccess,
  throwErrorIf,
} = require('../../../core/Utils/RequestUtil')

exports.postSavePatient = async (req, res) => {
  try {
    console.log('[POST] - /api/patient')
    let patient = await Patient.findByPk(req.body.id)

    if (patient) {
      // Update registered patient
      patient = await patient.update({
        ...req.body,
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
      log: '\x1b[32m[POST] - /api/patient - success save\x1b[0m',
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

    await throwSuccess({
      content: { resultList: patient },
      log: '\x1b[32m[GET] - /api/patient - Patient founded\x1b[0m',
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
      log: '\x1b[32m[GET] - /api/patient/:id - Patient founded\x1b[0m',
      res,
    })
  } catch (e) {
    console.error(`\x1b[31m${e}\x1b[0m`)
  }
}
