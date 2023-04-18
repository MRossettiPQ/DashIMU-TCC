const builder = require('electron-builder')
const path = require('path')

module.exports = (async () => {
  console.log(process.env?.NODE_ENV, process.env?.SEQUELIZE_DIALECT, process.env?.JWT_SECRET, process.env?.STORAGE_SRC)
  let arg = ''
  if (process.env?.NODE_ENV) {
    arg += ` --NODE_ENV=${process.env?.NODE_ENV}`
  }
  if (process.env?.SEQUELIZE_DIALECT) {
    arg += ` --SEQUELIZE_DIALECT=${process.env?.SEQUELIZE_DIALECT}`
  }
  if (process.env?.JWT_SECRET) {
    arg += ` --JWT_SECRET=${process.env?.JWT_SECRET}`
  }
  if (process.env?.STORAGE_SRC) {
    arg += ` --STORAGE_SRC=${process.env?.STORAGE_SRC}`
  }
  console.log(arg)
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
