const { Patient } = require('../../../core/database').models
const { throwSuccess, throwError } = require('../../../core/utils/RequestUtil')
const { PaginationUtil } = require('../../../core/utils/PaginationUtil')

module.exports = new (class PatientController {
  async save(req) {
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

  async list(req) {
    const { rpp, page, field, term } = req.query
    console.log('aqui')
    const pagination = await PaginationUtil(Patient, {
      // where: GetWhere(term?.length, { name: term }),
      rpp,
      page,
      field,
    })

    return await throwSuccess({
      local: 'SERVER:PATIENT',
      content: pagination,
      log: 'Patient list',
    })
  }

  async get(req) {
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
})()
