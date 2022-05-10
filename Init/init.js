import {execSync, spawnSync} from 'child_process';

async function start() {
    try {
        spawnSync('npm run dev', null, {shell: true});

        console.log('All is fine!');
    } catch (e) {
        console.error('Error while starting backend');
        console.error(e);
    }
}

start()
