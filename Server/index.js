const { CustomServer } = require('./server')
const yargs = require('yargs').alias('l', 'locale').alias('f', 'filename').alias('c', 'content').demandOption('locale').argv

module.exports = (async () => {
  const server = new CustomServer()
  await server.init()
})()
