const packager = require('electron-packager')
const electronInstaller = require('electron-winstaller')

async function packageApp(appDir, platform, arch, iconPath, outDir) {
  try {
    const options = {
      dir: appDir,
      platform: platform,
      arch: arch,
      icon: iconPath,
      overwrite: true,
      out: outDir,
    }
    const appPaths = await packager(options)

    await electronInstaller.createWindowsInstaller({
      appDirectory: '.',
      authors: 'My App Inc.',
      exe: 'myapp.exe',
    })
    console.log(`Aplicativo empacotado com sucesso em: ${appPaths}`)
  } catch (err) {
    console.error(`Erro ao empacotar aplicativo: ${err}`)
  }
}
const build = (async () => {
  await packageApp('.', 'darwin', 'x64', './src/assets/icon.ico', './dist')
})()
console.log(build)
