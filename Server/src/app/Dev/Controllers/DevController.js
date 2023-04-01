const { Patient, Session } = require('../../../core/DataBase').models
const { alterTable } = require('../../../core/DataBase')
const {
  throwSuccess,
  throwNotFound,
} = require('../../../core/Utils/RequestUtil')
const { PaginationUtil } = require('../../../core/Utils/PaginationUtil')

exports.testPagination = async (req) => {
  let { id: patientId } = req.params
  const { rpp, page, field } = req.query

  patientId = 1

  const pagination = await PaginationUtil(Session, {
    where: {
      patientId,
    },
    rpp,
    page,
    field,
  })

  if (!pagination) {
    return await throwNotFound({
      local: 'SERVER:SESSION',
      message: 'Not founded',
      log: 'Not founded',
    })
  }

  return await throwSuccess({
    local: 'SERVER:SESSION',
    content: pagination,
    log: 'Founded',
  })
}

exports.alterTable = async () => {
  let result = await alterTable()

  if (!result) {
    return await throwNotFound({
      local: 'SERVER:SESSION',
      message: 'Not founded',
      log: 'Not founded',
    })
  }

  return await throwSuccess({
    local: 'SERVER:SESSION',
    content: 'pagination',
    log: 'Founded',
  })
}
