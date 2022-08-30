const { Mensuration, Session } = require('../../../core/DataBase')
const UserContext = require('../../../core/utils/UserContext')
const {
  throwSuccess,
  throwNotFoundIf,
} = require('../../../core/Utils/RequestUtil')

exports.postSaveSession = async (req, res) => {
  console.log('[POST] - /api/session')
  try {
    const idUserContext = await UserContext.getUserContextId(req, res)
    const { id: idPatient } = req.params

    let { sessionParams, sensorList } = req.body

    const newSession = await Session.create({
      ...sessionParams,
      idPatient,
      idUser: idUserContext,
    })

    let bulkMensuration = []
    // Turns data from multiple sensors into one big list
    sensorList.map((sensor) => bulkMensuration.push(...sensor))

    // Turns data from multiple sensors into one big list
    bulkMensuration = bulkMensuration.map((mensuration) => {
      mensuration.idSessao = newSession.idSession
      return mensuration
    })

    await Mensuration.bulkCreate(bulkMensuration)

    await throwSuccess({
      content: newSession,
      message: 'Session save successful',
      log: '[POST] - /api/session - success save',
      res,
    })
  } catch (e) {
    console.error('\x1b[31m', e, '\x1b[0m')
  }
}

exports.getMensurationList = async (req, res) => {
  try {
    console.log('[GET] - /api/session/:id/mensuration')
    const { id: idPatient, limit, page } = req.params

    console.log(limit, page)
    const mensurationList = await Mensuration.findAll({
      page: page || 1,
      limit: limit || 10,
      where: {
        idPatient,
      },
    })

    await throwNotFoundIf({
      cond: mensurationList === null,
      message: '',
      log: '',
      res,
    })

    await throwSuccess({
      content: mensurationList,
      message: '',
      log: '',
      res,
    })
  } catch (e) {
    console.error('\x1b[31m', e, '\x1b[0m')
  }
}

exports.getSessionList = async (req, res) => {
  try {
    console.log('[GET] - /api/session')
    const { id: idPatient, limit, page, fields } = req.params

    const sessionList = await Mensuration.findAll({
      where: {
        page,
        limit,
        idPatient,
      },
      attributes: fields,
    })

    await throwNotFoundIf({
      cond: sessionList === null,
      message: '',
      log: '',
      res,
    })

    await throwSuccess({
      content: sessionList,
      message: '',
      log: '',
      res,
    })
  } catch (e) {
    console.error('\x1b[31m', e, '\x1b[0m')
  }
}

exports.getSession = async (req, res) => {
  try {
    console.log('[GET] - /api/session/:id')
    const { id: idSession } = req.params

    const session = await Session.findByPk(idSession)

    await throwNotFoundIf({
      cond: session === null,
      message: '',
      log: '',
      res,
    })

    await throwSuccess({
      content: session,
      message: '',
      log: '',
      res,
    })
  } catch (e) {
    console.error('\x1b[31m', e, '\x1b[0m')
  }
}
