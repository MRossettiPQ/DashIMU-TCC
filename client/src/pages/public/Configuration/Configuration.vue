<template>
  <q-page class="flex justify-center w-100">
    <q-card flat class="flex w-100">
      <q-form ref="mainForm" class="col w-100" greedy>
        <q-card-section class="form-lines w-100">
          <h3 class="title col">Settings</h3>

          <div class="column">
            <span>development - {{ environment?.development }}</span>
            <span>just_api - {{ environment?.just_api }}</span>
            <span>secret - {{ environment?.secret }}</span>
            <span>electron - {{ environment?.electron }}</span>

            <div v-if="environment.host">
              <span>host: </span>
              <div class="row">
                <div class="col-1" />
                <div class="col column">
                  <span>port - {{ environment.host?.port }}</span>
                  <span>port_socket - {{ environment.host?.port_socket }}</span>

                  <div v-if="environment.host?.cors">
                    <span>cors: </span>
                    <div class="row">
                      <div class="col-1" />
                      <div class="col column">
                        <span>allowedHeaders - {{ environment.host.cors?.allowedHeaders }}</span>
                        <span>origin - {{ environment.host.cors?.origin }}</span>
                        <span>methods - {{ environment.host.cors?.methods }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="environment.database">
              <span>database: </span>
              <div class="row">
                <div class="col-1" />
                <div class="col column">
                  <span>dialect - {{ environment.database?.dialect }}</span>

                  <span>sequelize:</span>
                  <div class="row">
                    <div class="col-1" />
                    <div class="col">
                      <span>sqlite: </span>
                      <div v-if="environment.database?.sequelize">
                        <div class="row">
                          <div class="col-1" />
                          <div class="col column">
                            <span>storage - {{ environment.database.sequelize.sqlite?.storage }}</span>
                            <span>dialect - {{ environment.database.sequelize.sqlite?.dialect }}</span>
                            <span>logging - {{ environment.database.sequelize.sqlite?.logging }}</span>
                            <span>benchmark - {{ environment.database.sequelize.sqlite?.benchmark }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h3 class="title col">Env</h3>
          {{ env }}
        </q-card-section>
      </q-form>
    </q-card>
  </q-page>
</template>

<script src="./Configuration.js" />

<style lang="scss" scoped>
.title {
  text-align: center;
  font-weight: bold;
  font-size: 32px;
  color: $dark;
}

.lembrar-senha {
  color: $faded;
  width: 100%;
  display: flex;
  justify-content: flex-start;
}

.recuperacao-senha {
  color: $faded;
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.cadastre-se {
  color: $faded;
  width: 100%;
  text-align: center;
  margin-top: 8px;
  margin-bottom: 0;

  a {
    font-weight: bold;
    color: $dark;
  }
}
</style>
