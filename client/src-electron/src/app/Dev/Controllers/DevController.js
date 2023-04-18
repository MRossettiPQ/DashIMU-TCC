const { Session } = require('../../../core/DataBase').models
const { throwSuccess, throwNotFound } = require('../../../core/Utils/RequestUtil')
const { PaginationUtil } = require('../../../core/Utils/PaginationUtil')
const dayjs = require('dayjs')
const environment = require('../../../../environment')

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

exports.ping = async () => {
  return await throwSuccess({
    local: 'SERVER:DEV',
    content: { time: `Server online, current time: ${dayjs()}`, environment },
    message: `Server online, current time: ${dayjs()}`,
    log: 'Ping',
  })
}
