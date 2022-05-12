function resolveEnviroment(){
    return require(`./env.${process.env.NODE_ENV}.json`)
}

const enviroment = resolveEnviroment()

module.exports = {enviroment};