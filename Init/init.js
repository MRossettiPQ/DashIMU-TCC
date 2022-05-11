import {execSync} from 'child_process';
import path from 'path';

async function firstInit() {
    //TODO primeira incialização
    execSync('nvm install 16.5.0 && nvm use 16.5.0', {stdio: 'inherit'})
    execSync('npm install -g yarn', {stdio: 'inherit'})
    execSync('yarn global add @quasar/cli', {stdio: 'inherit'})
    switch (process.platform) {
        case 'linux':
            execSync('sudo apt -y update && sudo apt -y install curl software-properties-common gnupg2 install mariadb-server', {stdio: 'inherit'})
            execSync('sudo mariadb-secure-installation', {stdio: 'inherit'})
        default:
            console.log('Sistema não reconhecido para script de instalação de dependencias');
            break;
    }
}

async function start() {
    try {
        if(true){
            await firstInit()
        }
        //TODO realiza o build da versão de produção do Front
        execSync('yarn --cwd ../Front build', {stdio: 'inherit'})

        switch (process.platform) {
            case 'linux':
                //TODO move os arquivos da pasta de build do quasar para a pasta public de distribuição do express
                execSync('mv -v ../Front/dist/spa/* ../Server/public')
                break;
            case 'win32':
                //TODO deleta a versão anterior do SPA presente na pasta de distribuição do server
                execSync(`del /S ${path.basename('/Server/public/*')}`)

                //TODO move os arquivos da pasta de build do quasar para a pasta public de distribuição do express
                execSync('move ../Front/dist/spa/* ../Server/public/')
                break;
            default:
                console.log('Sistema não reconhecido para script de inicialização');
                break;
        }

        //TODO inicializa servidor
        execSync('yarn --cwd ../Server dev', {stdio: 'inherit'})

        console.log('Tudo certo!!!');
        console.log('Servidor será iniciado!!!');
    } catch (e) {
        console.error('Error ao executar script "init.js"');
        console.error(e);
    }
}

start().then(r => console.log(r))