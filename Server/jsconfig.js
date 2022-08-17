const path = require('path')

module.exports = {
  resolve: {
    baseUrl: '.',
    alias: {
      '*': ['*'],
      'Environment/*': ['*'],
      'App/*': ['src/*'],
      'Database/*': ['src/Core/DataBase/*'],
      'Utils/*': ['src/Core/Utils/*'],
      'Middleware/*': ['src/Core/Middleware/*'],
    },
  },
  exclude: ['node_modules'],
}
