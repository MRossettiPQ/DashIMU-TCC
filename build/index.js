import { execSync } from "child_process";
import path from "path";

async function start() {
  try {
    //TODO primeira incialização
    await execSync("npm install -g yarn@latest electron-packager@latest", { stdio: "inherit" });
    //TODO instala dependencias do client
    await execSync(`yarn --cwd ../${process.env.TYPE}`, { stdio: "inherit" });
    await execSync(`yarn --cwd ../client`, { stdio: "inherit" });

    //TODO realiza o build da versão de produção do Front
    await execSync("yarn --cwd ../client build", { stdio: "inherit" });
    switch (process.platform) {
      case "linux":
        //TODO move os arquivos da pasta de build do quasar para a pasta public de distribuição do express
        await execSync(`mv -v ../client/dist/spa/* ../${process.env.TYPE}/src/public`, { stdio: "inherit" });
        break;
      case "win32":
        //TODO deleta a versão anterior do SPA presente na pasta de distribuição do server
        await execSync(`del /S /Q ${path.resolve(`../${process.env.TYPE}/src/public/*`)}`, { stdio: "inherit" });

        //TODO move os arquivos da pasta de build do quasar para a pasta public de distribuição do express
        await execSync(`move ${path.resolve("../client/dist/spa/*")} ${path.resolve(`../${process.env.TYPE}/src/public/`)}`, { stdio: "inherit" });
        break;
      default:
        console.log("Sistema não reconhecido para script de inicialização");
        break;
    }

    if (process.env.TYPE === "electron") {
      await execSync("yarn --cwd ../electron electron:server:build", { stdio: "inherit" });
    }

    console.log("Tudo certo!!!");
  } catch (e) {
    console.error('Error ao executar script "init.js"');
    console.error(e);
  }
}

start().then((r) => console.log("Fim: ", r));
