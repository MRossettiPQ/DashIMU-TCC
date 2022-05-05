const ngrok = require('ngrok')
const fs = require('fs')
const path = require('path')
const readline = require('readline');

const BACKEND_PORT = 9000

const confPath = path.join(__dirname, '../conf/application.conf')

async function startNgrok() {
    console.log('starting ngrok')
    return await ngrok.connect({
        addr: BACKEND_PORT,
    })
}

function configure(url) {
    const interface = readline.createInterface({
        input: fs.createReadStream(confPath)
    })

    let currentLine = 0
    let hostLine = 0
    let baseTextToReplaceArr = []
    let fullTextArr = []
    interface.on('line', line => {
        currentLine++
        if(line.includes('ngrok-replace')) {
            hostLine = currentLine + 1
            baseTextToReplaceArr.push(line)
        }
        if(currentLine === hostLine) {
            baseTextToReplaceArr.push(line)
        }
        fullTextArr.push(line)
    })

    interface.on('close', line => {
        const writeStream = fs.createWriteStream(confPath,{flags: 'r+'});
        const fullText = fullTextArr.join('\n')
        const baseTextToReplace = baseTextToReplaceArr.join('\n')
        writeStream.write(fullText.replace(baseTextToReplace, baseTextToReplace.replace(/host = ([^\s]+)/, `host = "${url}"`)));
    })

}

async function start() {
    try {
        const url = await startNgrok()
        configure(url)
        console.log('All is fine!')
    } catch (e) {
        console.error('Error while starting backend')
        console.error(e)
    }
}

start()
