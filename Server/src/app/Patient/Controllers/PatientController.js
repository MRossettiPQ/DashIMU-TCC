const { Patient } = require('../../../core/DataBase').models
const { throwSuccess, throwError } = require('../../../core/Utils/RequestUtil')
const { PaginationUtil, GetWhere } = require('../../../core/Utils/PaginationUtil')

exports.postSavePatient = async (req) => {
  if (!req.body) {
    return await throwError({
      local: 'SERVER:PATIENT',
      message: 'Nenhum dado valido foi enviado',
      log: 'Nenhum dado valido foi enviado',
    })
  }
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
      message: 'PatientPage not save',
      log: 'PatientPage not save',
    })
  }

  return await throwSuccess({
    local: 'SERVER:PATIENT',
    content: patient,
    message: 'PatientPage save successful',
    log: 'PatientPage save successful',
  })
}

exports.getPatientList = async (req) => {
  const { rpp, page, field, term } = req.query
  const pagination = await PaginationUtil(Patient, {
    where: GetWhere(term?.length, { name: term }),
    rpp,
    page,
    field,
  })

  return await throwSuccess({
    local: 'SERVER:PATIENT',
    content: pagination,
    log: 'PatientPage list',
  })
}

exports.getPatient = async (req) => {
  const { id: idPatient } = req.params
  const patient = await Patient.findByPk(idPatient)

  if (!patient) {
    return await throwError({
      local: 'SERVER:PATIENT',
      message: 'PatientPage not found',
      log: 'PatientPage not found',
    })
  }

  return await throwSuccess({
    local: 'SERVER:PATIENT',
    content: patient,
    log: 'PatientPage founded',
  })
}
