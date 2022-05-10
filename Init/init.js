import {execSync, spawnSync} from 'child_process';
import path from 'path';

async function start() {
    try {
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
        //execSync('npm run dev', null, {shell: true});
        console.log('All is fine!');
    } catch (e) {
        console.error('Error while starting backend');
        console.error(e);
    }
}

start()