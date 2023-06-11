const { CustomServer } = require('./src/CustomServer')
const yargs = require('yargs').alias('l', 'locale').alias('f', 'filename').alias('c', 'content').demandOption('locale').argv

module.exports = (async () => {
  const server = new CustomServer(yargs.l)
  await server.boot()
})()
