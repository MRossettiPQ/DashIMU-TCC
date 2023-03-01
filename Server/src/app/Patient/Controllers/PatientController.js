const { Patient } = require('../../../core/DataBase').models
const {
  throwSuccess,
  throwErrorIf,
  throwError,
} = require('../../../core/Utils/RequestUtil')

exports.postSavePatient = async (req, res) => {
  let patient = await Patient.findByPk(req.body.id)
  if (patient) {
    // Update registered patient
    patient = await patient.update({
      ...req.body,
    })
  } else {
    patient = await Patient.create(req.body)
  }

  if (!patient) {
    return await throwError({
      local: 'SERVER:PATIENT',
      message: 'Patient not save',
      log: 'Patient not save',
    })
  }

  return await throwSuccess({
    local: 'SERVER:PATIENT',
    content: patient,
    message: 'Patient save successful',
    log: 'Patient save successful',
  })
}

exports.getPatientList = async (req) => {
  const patient = await Patient.findAll()

  return await throwSuccess({
    local: 'SERVER:PATIENT',
    content: { resultList: patient },
    log: 'Patient list',
  })
}

exports.getPatient = async (req) => {
  const { id: idPatient } = req.params
  const patient = await Patient.findByPk(idPatient)

  if (!patient) {
    return await throwError({
      local: 'SERVER:PATIENT',
      message: 'Patient not found',
      log: 'Patient not found',
    })
  }

  return await throwSuccess({
    local: 'SERVER:PATIENT',
    content: patient,
    log: 'Patient founded',
  })
}
