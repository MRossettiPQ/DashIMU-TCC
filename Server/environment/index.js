const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development'
const resolveEnvironment = () => require(`./env.${env}.json`)

module.exports = resolveEnvironment()
