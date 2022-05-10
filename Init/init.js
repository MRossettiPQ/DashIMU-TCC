import {execSync, spawnSync} from 'child_process';
import path from 'path';

async function start() {
    try {
        //TODO realiza o build da versão de produção do Front
        execSync('npm run build --prefix ../Front', {stdio: 'inherit'})

        switch (process.platform) {
            case 'linux':
                //TODO move os arquivos da pasta de build do quasar para a pasta public de distribuição do express
                execSync('mv -v ../Front/dist/spa/* ../Server/public')
                break;
            case 'win32':
                //TODO deleta a versão anterior do SPA presente na pasta de distribuição do server
                // execSync(`del /S ${path.basename('/Server/public/*')}`)
                //TODO move os arquivos da pasta de build do quasar para a pasta public de distribuição do express
                execSync('move ../Front/dist/spa/* ../Server/public')
                break;
            default:
                console.log('Sistema não reconhecido para script de inicialização');
                break;
        }

        //TODO inicializa servidor
        execSync('npm run dev --prefix ../Server', {stdio: 'inherit'})

        console.log('Tudo certo!!!');
        console.log('Servidor será iniciado!!!');
    } catch (e) {
        console.error('Error ao executar script "init.js"');
        console.error(e);
    }
}

start().then(r => console.log(r))