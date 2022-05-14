function resolveEnviroment(){
    return require(`./env.${process.env.NODE_ENV}.json`)
}

module.exports = resolveEnviroment();