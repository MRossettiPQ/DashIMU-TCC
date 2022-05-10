# DashIMU-TCC
Front:

Sensor:
-Desenvolvido utilizando o PlatformIO no VSCode

Server:
-Primeiro instale as dependencias
    npm install


APOS BUILD DO FRONT ADICIONAR OS ARQUIVOS DE DIST->SPA em PUBLIC do server


-Primeiro passo: https://github.com/nvm-sh/nvm#install--update-script
instalar gerenciador de versão para o node
```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```
ou
```sh
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```
```sh
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

-Segundo passo:
instalar node em versão superior a 10
```sh
nvm install node
```
ou exemplo de direcionamento de versão para o node 16.5.0
```sh
nvm install 16.5.0
```

-Terceiro passo:
instalar yarn
```sh
npm install -g yarn
```

-Quarto passo:
instalar pacote CLI do quasar, para rodar versão de dev ou para realizar build
```sh
yarn global add @quasar/cli
```
-Quinto passo:
instalar banco de dados MySql
```sh
sudo apt -y update
```
```sh
sudo apt -y install curl software-properties-common gnupg2
```
```sh
sudo apt-get install default-mysql-server
```

Configurar banco de dados 
```sh
sudo mariadb-secure-installation

NOTE: RUNNING ALL PARTS OF THIS SCRIPT IS RECOMMENDED FOR ALL MariaDB
      SERVERS IN PRODUCTION USE!  PLEASE READ EACH STEP CAREFULLY!

In order to log into MariaDB to secure it, we'll need the current
password for the root user. If you ve just installed MariaDB, and
haven t set the root password yet, you should just press enter here.

Enter current password for root (enter for none): 
OK, successfully used password, moving on...

Setting the root password or using the unix_socket ensures that nobody
can log into the MariaDB root user without the proper authorisation.

You already have your root account protected, so you can safely answer 'n'.

Switch to unix_socket authentication [Y/n] n
Enabled successfully!
Reloading privilege tables..
 ... Success!


You already have your root account protected, so you can safely answer 'n'.

Change the root password? [Y/n] y
New password: 
Re-enter new password: 
Password updated successfully!
Reloading privilege tables..
 ... Success!


By default, a MariaDB installation has an anonymous user, allowing anyone
to log into MariaDB without having to have a user account created for
them.  This is intended only for testing, and to make the installation
go a bit smoother.  You should remove them before moving into a
production environment.

Remove anonymous users? [Y/n] y
 ... Success!

Normally, root should only be allowed to connect from 'localhost'.  This
ensures that someone cannot guess at the root password from the network.

Disallow root login remotely? [Y/n] y
 ... Success!

By default, MariaDB comes with a database named 'test' that anyone can
access.  This is also intended only for testing, and should be removed
before moving into a production environment.

Remove test database and access to it? [Y/n] y
 - Dropping test database...
 ... Success!
 - Removing privileges on test database...
 ... Success!

Reloading the privilege tables will ensure that all changes made so far
will take effect immediately.

Reload privilege tables now? [Y/n] y
 ... Success!

Cleaning up...

All done!  If you ve completed all of the above steps, your MariaDB
installation should now be secure.

Thanks for using MariaDB!
```
criar DATABASE
```sh
mysql
```
```sh
CREATE DATABASE IF NOT EXISTS database_dashimu;
```
criar usuario: ServerOperator, lembrar da senha para utilização posterior no servidor
```sh
CREATE USER 'OperatorDash'@localhost IDENTIFIED BY 'OperatorDash1060';
```
```sh
GRANT ALL PRIVILEGES ON database_dashimu.* TO 'OperatorDash'@localhost;
```
```sh
FLUSH PRIVILEGES;
```
```sh
INSERT INTO funcao (idFuncao,nomeFuncao) VALUES (1,'FISIO'),(2,'ADMIN');
```
```sh
INSERT INTO funcao (idFuncao,nomeFuncao) VALUES (1,'FISIO'),(2,'ADMIN');
```