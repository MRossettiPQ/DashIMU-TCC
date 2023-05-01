const { Session } = require('../../../core/database').models
const { throwSuccess, throwNotFound } = require('../../../core/utils/RequestUtil')
const { PaginationUtil } = require('../../../core/utils/PaginationUtil')
const dayjs = require('dayjs')

module.exports = new (class DevelopmentController {
  async testPagination(req) {
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

  async ping(req) {
    return await throwSuccess({
      local: 'SERVER:DEV',
      // content: { time: `Server online, current time: ${dayjs()}`, environment },
      content: {
        url: req.socket.url,
      },
      message: `Server online, current time: ${dayjs()}`,
      log: 'Ping',
    })
  }
})()
