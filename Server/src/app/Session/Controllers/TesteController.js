const { PaginationUtil } = require('../../../core/Utils/FetchUtil')
const { Session } = require('../../../core/DataBase')
const { throwSuccess } = require('../../../core/Utils/RequestUtil')
const _ = require('lodash')

const fields = ''

exports.getSessionListTeste = async (req, res) => {
  try {
    console.log('[GET] - /api/session')
    const { id } = req.params
    const { rpp, page, order, field, size } = req.query
    console.log(id, rpp, page, order, field, size)

    let query = {}

    if (!_.isNil(id)) {
      query['where'] = {
        id,
      }
    }

    const result = await PaginationUtil(Session, {
      rpp,
      page,
      size,
      field,
      order,
      ...query,
    })

    await throwSuccess({
      content: result,
      log: '\x1b[32m[GET] - /api/session - founded\x1b[0m',
      res,
    })
  } catch (e) {
    console.log('catch')
    console.log(e)
    console.error(`\x1b[31m${e}\x1b[0m`)
  }
}
