<template>
  <section name="sensor" class="responsive-height">
    <div class="row responsive-content">
      <div class="col grid-tela">
        <div class="col" />
        <div class="col grid-conteudo">
          <div class="col">
            <q-tabs
              v-model="tabGrande"
              dense
              class="text-grey"
              active-color="primary"
              indicator-color="primary"
              align="justify"
              narrow-indicator
            >
              <q-tab name="Tab_1" label="Grafico" icon="leaderboard" />
              <q-tab name="Tab_2" label="Grafico em Grid" icon="trending_up" />
              <q-tab name="Tab_3" label="Tabela" icon="table_rows" />
            </q-tabs>
            <q-separator />
            <q-tab-panels v-model="tabGrande" animated>
              <q-tab-panel name="Tab_1">
                <tab-grafico
                  label="Grafico"
                  :options="options"
                  :data="renderRows"
                />
              </q-tab-panel>

              <q-tab-panel name="Tab_2">
                <tab-grafico
                  label="Grafico em grid"
                  :options="options"
                  :data="renderRows"
                />
              </q-tab-panel>

              <q-tab-panel name="Tab_3">
                <tab-table label="Tabela" :data="sensores[0].data" />
              </q-tab-panel>
            </q-tab-panels>
          </div>
          <div class="col">
            <q-card-section class="column no-wrap scroll">
              <div class="row">
                <q-btn
                  color="primary"
                  label="Iniciar"
                  class="col btn"
                  size="md"
                  @click="sendStart"
                />
                <q-btn
                  color="primary"
                  label="Pausar"
                  class="col btn"
                  size="md"
                  @click="sendStop"
                />
              </div>
              <div class="row">
                <q-btn
                  color="primary"
                  label="Reinicia"
                  class="col btn"
                  size="md"
                  @click="sendRestart"
                />
                <q-btn
                  color="primary"
                  label="Guardar"
                  class="col btn"
                  size="md"
                  @click="sendSave"
                />
              </div>
            </q-card-section>
            <q-card-section>
              <q-list bordered class="rounded-borders">
                <q-expansion-item
                  expand-separator
                  icon="sensor_window"
                  label="Sensor"
                >
                  <q-card>
                    <q-card-section>
                      <q-tabs
                        v-model="tab"
                        dense
                        class="text-grey"
                        active-color="primary"
                        indicator-color="primary"
                        align="justify"
                        narrow-indicator
                      >
                        <q-tab
                          v-for="(lista, index) in sensores"
                          :key="index"
                          :name="lista.tab_name"
                          :label="lista.tab_label"
                          icon="sensors"
                          :content-class="sensores[index].sensor.corTab"
                        />
                      </q-tabs>
                    </q-card-section>

                    <q-separator />

                    <q-tab-panels v-model="tab" animated>
                      <q-tab-panel
                        v-for="(lista, index) in sensores"
                        :key="index"
                        :name="lista.tab_name"
                      >
                        <div class="text-h6">{{ lista.label }}</div>
                        <q-form>
                          <div class="row">
                            <q-input
                              v-model="lista.sensor.ip"
                              filled
                              :label="'IP Sensor ' + lista.tab_label"
                              type="text"
                              class="col m-t-16"
                            />

                            <q-btn
                              v-if="!lista.sensor.ativo"
                              :color="lista.sensor.corBtn"
                              unelevated
                              label="Conectar"
                              class="row btn"
                              size="lg"
                              @click="conectaSensor(index)"
                            />

                            <q-btn
                              v-if="lista.sensor.ativo"
                              :color="lista.sensor.corBtn"
                              unelevated
                              label="Desconectar"
                              class="row btn"
                              size="lg"
                              @click="closeSocket(index)"
                            />
                          </div>
                        </q-form>
                      </q-tab-panel>
                    </q-tab-panels>
                  </q-card>
                </q-expansion-item>

                <q-expansion-item
                  expand-separator
                  icon="perm_identity"
                  label="Paciente"
                >
                  <q-card>
                    <q-card-section>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Quidem, eius reprehenderit eos corrupti commodi magni
                      quaerat ex numquam, dolorum officiis modi facere maiores
                      architecto suscipit iste eveniet doloribus ullam aliquid.
                    </q-card-section>
                  </q-card>
                </q-expansion-item>
              </q-list>
            </q-card-section>
          </div>
        </div>
        <div class="col" />
      </div>
    </div>
  </section>
</template>

<script src="./Sensor.js" />

<style lang="stylus" scoped>
.btn
  width 100%
  height 45px
  margin 2px 2px 2px 2px

.grid-conteudo
  height 100%
  width 100%
  grid-template-columns 75% 25%
  display grid
  flex-direction column
  flex-wrap wrap
</style>
