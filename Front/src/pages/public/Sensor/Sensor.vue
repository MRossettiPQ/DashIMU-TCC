<template>
  <section name="sensor" class="responsive-height">
    <div class="row responsive-content">
      <div class="col grid-tela">
        <div class="col"/>
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
              <q-tab name="Tab_1" label="Grafico" icon="leaderboard"/>
              <q-tab name="Tab_2" label="Grafico em Grid" icon="trending_up"/>
              <q-tab name="Tab_3" label="Tabela" icon="table_rows"/>
            </q-tabs>
            <q-separator/>
            <q-tab-panels v-model="tabGrande" animated>

              <q-tab-panel name="Tab_1">
                <tab-grafico label="Grafico" :options="options" :data="sensores[0].series"/>
              </q-tab-panel>

              <q-tab-panel name="Tab_2">
                <tab-grafico label="Grafico em grid" :options="options" :data="sensores[0].series"/>
              </q-tab-panel>

              <q-tab-panel name="Tab_3">
                <tab-table label="Tabela" :data="sensores[0].series.data"/>
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
                            name="Sensor_1"
                            label="Sensor 1"
                            icon="sensors"
                            :content-class="sensores[0].sensor.corTab"
                        />
                        <q-tab
                            name="Sensor_2"
                            label="Sensor 2"
                            icon="sensors"
                            :content-class="sensores[1].sensor.corTab"
                        />
                        <q-tab
                            name="Sensor_3"
                            label="Sensor 3"
                            icon="sensors"
                            :content-class="sensores[2].sensor.corTab"
                        />
                      </q-tabs>
                    </q-card-section>
                    <q-separator/>

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
                                v-if="!sensores[0].sensor.ativo"
                                :color="sensores[0].sensor.corBtn"
                                unelevated
                                label="Conectar"
                                class="row btn"
                                size="lg"
                                @click="conectaSensor(0)"
                            />

                            <q-btn
                                v-if="sensores[0].sensor.ativo"
                                :color="sensores[0].sensor.corBtn"
                                unelevated
                                label="Desconectar"
                                class="row btn"
                                size="lg"
                                @click="closeSocket(0)"
                            />

                            <q-btn
                                v-if="sensores[0].sensor.ativo"
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
                              v-if="!sensores[1].sensor.ativo"
                              :color="sensores[1].sensor.corBtn"
                              unelevated
                              label="Conectar"
                              class="row btn"
                              size="lg"
                              @click="conectaSensor(1)"
                          />

                          <q-btn
                              v-if="sensores[1].sensor.ativo"
                              :color="sensores[1].sensor.corBtn"
                              unelevated
                              label="Desconectar"
                              class="row btn"
                              size="lg"
                              @click="closeSocket(1)"
                          />

                          <q-btn
                              v-if="sensores[1].sensor.ativo"
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
                              v-if="!sensores[2].sensor.ativo"
                              :color="sensores[2].sensor.corBtn"
                              unelevated
                              label="Conectar"
                              class="row btn"
                              size="lg"
                              @click="conectaSensor(2)"
                          />


                          <q-btn
                              v-if="sensores[2].sensor.ativo"
                              :color="sensores[2].sensor.corBtn"
                              unelevated
                              label="Desconectar"
                              class="row btn"
                              size="lg"
                              @click="closeSocket(2)"
                          />

                          <q-btn
                              v-if="sensores[2].sensor.ativo"
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
              </q-list>
            </q-card-section>
          </div>
        </div>
        <div class="col"/>
      </div>
    </div>
  </section>
</template>

<script src="./Sensor.js"/>

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

</style>
