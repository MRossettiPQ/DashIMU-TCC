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
              <q-tab name="Tab_4" label="Processado" icon="fact_check" />
            </q-tabs>
            <q-separator />
            <q-tab-panels v-model="tabGrande" animated>
              <q-tab-panel name="Tab_1">
                <div class="text-h6">Graficos</div>
                <div class="row">
                  <apexchart
                    class="grafico"
                    type="line"
                    :options="options"
                    :series="series"
                  />
                </div>
              </q-tab-panel>

              <q-tab-panel name="Tab_2">
                <div class="text-h6">Graficos em Grid</div>
                <div class="row"></div>
              </q-tab-panel>

              <q-tab-panel name="Tab_3">
                <div class="scrollable overflow-auto flex-grow-1 flex-shrink-0">
                  <q-table
                    title="Tabela"
                    :data="tabelaData"
                    :columns="tabelaColumns"
                    color="primary"
                    row-key="name"
                  >
                    <template v-slot:top-right>
                      <q-btn
                        color="primary"
                        icon-right="archive"
                        label="Export to csv"
                        no-caps
                        @click="exportTable"
                      />
                    </template>
                  </q-table>
                </div>
              </q-tab-panel>

              <q-tab-panel name="Tab_4">
                <div class="text-h6">Processado</div>
                <div class="row"></div>
              </q-tab-panel>
            </q-tab-panels>
          </div>
          <div class="col">
            <q-card-section class="column no-wrap scroll">
              <div class="row ">
                <q-btn
                  color="primary"
                  label="Iniciar"
                  class="col btn"
                  size="md"
                  @click="opcao"
                />
                <q-btn
                  color="primary"
                  label="Pausar"
                  class="col btn"
                  size="md"
                  @click="opcao"
                />
              </div>
              <div class="row">
                <q-btn
                  color="primary"
                  label="Reinicia"
                  class="col btn"
                  size="md"
                  @click="opcao"
                />
                <q-btn
                  color="primary"
                  label="Guardar"
                  class="col btn"
                  size="md"
                  @click="opcao"
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
                          name="Sensor_1"
                          label="Sensor 1"
                          icon="sensors"
                          class="text-green"
                        />
                        <q-tab
                          name="Sensor_2"
                          label="Sensor 2"
                          icon="sensors"
                          class="text-green"
                        />
                        <q-tab
                          name="Sensor_3"
                          label="Sensor 3"
                          icon="sensors"
                          class="text-red"
                        />
                      </q-tabs>
                    </q-card-section>
                    <q-separator />

                    <q-tab-panels v-model="tab" animated>
                      <q-tab-panel name="Sensor_1">
                        <div class="text-h6">Conectar Sensor 1</div>
                        <q-form>
                          <div class="row">
                            <q-input
                              filled
                              label="IP Sensor 1"
                              type="text"
                              v-model="sensores[0].sensor.ip"
                              class="col m-t-16"
                            />

                            <q-btn
                              color="primary"
                              unelevated
                              label="Conectar"
                              class="row btn"
                              size="lg"
                              @click="conectaSensor(0)"
                            />

                            <q-btn
                                v-if="sensores[0].tabela !== null"
                                color="primary"
                                unelevated
                                label="Print"
                                class="row btn"
                                size="lg"
                                @click="printLeitura(0)"
                            />
                          </div>
                        </q-form>
                      </q-tab-panel>

                      <q-tab-panel name="Sensor_2">
                        <div class="text-h6">Conectar Sensor 2</div>
                        <div class="row">
                          <q-input
                            filled
                            label="IP Sensor 2"
                            type="text"
                            v-model="sensores[1].sensor.ip"
                            class="col m-t-16"
                          />

                          <q-btn
                            color="primary"
                            unelevated
                            label="Conectar"
                            class="row btn"
                            size="lg"
                            @click="conectaSensor(1)"
                          />

                          <q-btn
                              v-if="sensores[1].tabela !== null"
                              color="primary"
                              unelevated
                              label="Print"
                              class="row btn"
                              size="lg"
                              @click="printLeitura(1)"
                          />
                        </div>
                      </q-tab-panel>

                      <q-tab-panel name="Sensor_3">
                        <div class="text-h6">Conectar Sensor 3</div>
                        <div class="row">
                          <q-input
                            filled
                            label="IP Sensor 3"
                            type="text"
                            v-model="sensores[2].sensor.ip"
                            class="col m-t-16"
                          />

                          <q-btn
                            color="primary"
                            unelevated
                            label="Conectar"
                            class="row btn"
                            size="lg"
                            @click="conectaSensor(2)"
                          />

                          <q-btn
                              v-if="sensores[2].tabela !== null"
                              color="primary"
                              unelevated
                              label="Print"
                              class="row btn"
                              size="lg"
                              @click="printLeitura(2)"
                          />
                        </div>
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

                <q-expansion-item
                  expand-separator
                  icon="perm_identity"
                  label="Medição"
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
  height 70vh
  width 100%
  grid-template-columns 75% 25%
  display grid
  flex-direction column
  flex-wrap wrap

.grafico
  width 100%
  height 100%
</style>
