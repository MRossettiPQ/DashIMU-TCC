const builder = require('electron-builder')
const path = require('path')
// const yargs = require('yargs').alias('NODE_ENV', 'NODE_ENV').alias('SEQUELIZE_DIALECT', 'SEQUELIZE_DIALECT').alias('JWT_SECRET', 'JWT_SECRET').alias('STORAGE_SRC', 'STORAGE_SRC').argv

module.exports = (async () => {
  // console.log(process.env?.NODE_ENV, process.env?.SEQUELIZE_DIALECT, process.env?.JWT_SECRET, process.env?.STORAGE_SRC)
  // let arg = ''
  // if (yargs?.NODE_ENV) {
  //   arg += ` --NODE_ENV=${yargs?.NODE_ENV}`
  // }
  // if (yargs?.SEQUELIZE_DIALECT) {
  //   arg += ` --SEQUELIZE_DIALECT=${yargs?.SEQUELIZE_DIALECT}`
  // }
  // if (yargs?.JWT_SECRET) {
  //   arg += ` --JWT_SECRET=${yargs?.JWT_SECRET}`
  // }
  // if (yargs?.STORAGE_SRC) {
  //   arg += ` --STORAGE_SRC=${yargs?.STORAGE_SRC}`
  // }
  // console.log(arg)
  await builder.build({
    config: {
      extraMetadata: {
        main: 'index.js',
      },
      asar: false,
      asarUnpack: ['**/.env'],
      directories: {
        output: path.resolve(__dirname, '../executavel'),
      },
      files: ['**/*', '!.gitignore', '!package-lock.json', '!package.json', '!README.md'],
      appId: 'com.electron.dash-imu',
      productName: 'dash-imu',
      mac: {
        target: 'zip',
      },
      win: {
        target: 'portable',
      },
      portable: {
        artifactName: 'dash-imu.exe',
      },
    },
  })
  console.log('[BUILD] Completed')
})()
