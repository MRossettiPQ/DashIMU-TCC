import {execSync, spawnSync} from 'child_process';

async function start() {
    try {
        //move os arquivos da pasta de build do quasar para a pasta public de distribuição do express
        execSync('mv -v ../Front/dist/spa/* ../Server/public')
        //execSync('npm run dev', null, {shell: true});

        console.log('All is fine!');
    } catch (e) {
        console.error('Error while starting backend');
        console.error(e);
    }
}

start()