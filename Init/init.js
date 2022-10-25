import { execSync } from "child_process";
import path from "path";
import DotEnv from "dotenv";
import myIp from "quick-local-ip";

async function env() {
  let parsedEnv;
  if (process.env.NODE_ENV !== null) {
    parsedEnv = DotEnv.config({
      path: `./.env.${process.env.NODE_ENV}`,
    }).parsed;
  }

  for (let key in parsedEnv) {
    if (typeof parsedEnv[key] === "string") {
      parsedEnv[key] = JSON.stringify(parsedEnv[key]);
    }
  }
  return parsedEnv;
}

async function buildProject() {
  //TODO realiza o build da versão de produção do Front
  execSync("yarn --cwd ../Front build", { stdio: "inherit" });

  switch (process.platform) {
    case "linux":
      //TODO move os arquivos da pasta de build do quasar para a pasta public de distribuição do express
      execSync("mv -v ../Front/dist/spa/* ../Server/public");
      break;
    case "win32":
      //TODO deleta a versão anterior do SPA presente na pasta de distribuição do server
      execSync(`del /S ${path.basename("/Server/public/*")}`);

      //TODO move os arquivos da pasta de build do quasar para a pasta public de distribuição do express
      execSync("move ../Front/dist/spa/* ../Server/public/");
      break;
    default:
      console.log("Sistema não reconhecido para script de inicialização");
      break;
  }
  console.log("Tudo certo!!!");
  console.log("Servidor será iniciado!!!");

  //TODO inicializa servidor
  execSync("yarn --cwd ../Server dev", { stdio: "inherit" });
}

async function firstInit() {
  //TODO primeira incialização
  execSync("nvm install 16.5.0 && nvm use 16.5.0", { stdio: "inherit" });
  execSync("npm install -g yarn", { stdio: "inherit" });
  execSync("yarn global add @quasar/cli", { stdio: "inherit" });
  switch (process.platform) {
    case "linux":
      execSync(
        "sudo apt -y update && sudo apt -y install curl software-properties-common gnupg2 install mariadb-server",
        { stdio: "inherit" }
      );
      execSync("sudo mariadb-secure-installation", { stdio: "inherit" });
      break;
    case "win32":
      break;
    default:
      console.log(
        "Sistema não reconhecido para script de instalação de dependencias"
      );
      break;
  }
}

async function start() {
  console.log(myIp.getLocalIP4());
  try {
    switch (process.env.NODE_INIT_ENV) {
      case "inicialize":
        await buildProject();
        break;
      case "start":
        await firstInit();
        break;
    }
  } catch (e) {
    console.error('Error ao executar script "init.js"');
    console.error(e);
  }
}

start().then((r) => console.log("Fim: ", r));
