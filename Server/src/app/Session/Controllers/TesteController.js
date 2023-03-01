const { PaginationUtil } = require('../../../core/Utils/FetchUtil')
const { Session } = require('../../../core/DataBase').models
const { throwSuccess } = require('../../../core/Utils/RequestUtil')
const _ = require('lodash')

exports.getSessionListTeste = async (req, res) => {
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

  return await throwSuccess({
    local: 'SERVER:TESTE',
    content: result,
    log: 'Founded page',
  })
}
