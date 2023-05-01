const dayjs = require('dayjs')
const winston = require('winston')

const info = new winston.transports.File({ filename: 'info.log', level: 'info', dirname: 'cache', maxSize: '20m', maxFiles: '14d' })

const logger = winston.createLogger({
  format: winston.format.combine(winston.format.errors({ stack: true }), winston.format.json()),
  transports: [info],
})

if (process.env.ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  )
}

function getConsoleColor(colours, firstKey, secondKey) {
  let c = null

  c = colours[firstKey]

  switch (typeof c) {
    case 'string':
      return c
    case 'object':
      if (secondKey) {
        return getConsoleColor(c, secondKey)
      }
      return ''
    case 'function':
      if (secondKey) {
        return c?.(secondKey)
      }
      return ''
    default:
      return ''
  }
}

function coloringLog(color, message) {
  const coloredMessage = `${color}${message}\x1b[0m`
  logger.info(message)
  // Optei por usar console padrão ao inves do gerado pelo winston para ser mais limpo sem a estrutura json, e poder colorir
  // console.log(coloredMessage)
  return coloredMessage
}

function logMiddleware(tokens, req, res) {
  //
  const time = dayjs().format('DD/MM/YYYY[-]HH:mm:ss')
  const method = tokens.method(req, res)
  const url = tokens.url(req, res)
  const status = tokens.status(req, res)
  const responseTime = tokens['response-time'](req, res)
  const contentLength = tokens.res(req, res, 'content-length')
  //
  const formatedLog = `[CLOG] - ${time} - [MORGAN] - [${method}] - ${url} - ${responseTime} ms - ${status} - ${contentLength}`
  return coloringLog('\x1b[33m', formatedLog)
}

function logColor(local = 'C_LOG', message = '', color = 'reset') {
  // TODO enquanto esse metodo apenas monta a mensagem para um console.log comum, futuramente irá servir como logger creator tambem
  const splitColor = color.split('.')
  let c = ''
  if (splitColor.length > 1) {
    const firstName = splitColor[0]
    const secondName = splitColor[1]
    c = getConsoleColor(colours, firstName, secondName)
  } else {
    c = getConsoleColor(colours, color)
  }

  const formatedLog = `[CLOG] - ${dayjs().format('DD/MM/YYYY[-]HH:mm:ss')} - [${local}] - ${message}`
  coloringLog(c, formatedLog)
}

module.exports = {
  logColor,
  logMiddleware,
  getConsoleColor,
}

const colours = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  underscore: '\x1b[4m',
  blink: '\x1b[5m',
  reverse: '\x1b[7m',
  hidden: '\x1b[8m',
  fg: {
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    crimson: '\x1b[38m', // Scarlet
  },
  bg: {
    black: '\x1b[40m',
    red: '\x1b[41m',
    green: '\x1b[42m',
    yellow: '\x1b[43m',
    blue: '\x1b[44m',
    magenta: '\x1b[45m',
    cyan: '\x1b[46m',
    white: '\x1b[47m',
    crimson: '\x1b[48m',
  },
}
