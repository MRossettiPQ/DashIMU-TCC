<template>
  <section name="sensor" class="responsive-height">
    <div class="row responsive-content form-column form-column__padding">
      <q-card bordered flat class="col grid-conteudo">
        <div class="col">
          <q-tabs
            v-model="tabGrande"
            dense
            class="col text-grey"
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
          <q-tab-panels class="col" v-model="tabGrande" animated>
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
              <tab-table label="Tabela" :data="sensores[0].data"/>
            </q-tab-panel>
          </q-tab-panels>
        </div>
        <div class="col">
          <q-card-section class="col form-column form-column__gap" v-if="numeroConexoes >= 2">
            <div class="col form-lines form-lines__gap form-lines__no-padding">
              <q-btn
                color="primary"
                label="Iniciar"
                class="col"
                size="md"
                @click="sendStart"
                unelevated
              />
              <q-btn
                color="primary"
                label="Pausar"
                class="col"
                size="md"
                @click="sendStop"
                unelevated
              />
            </div>
            <div class="col form-lines form-lines__gap form-lines__no-padding">
              <q-btn
                color="primary"
                label="Reinicia"
                class="col"
                size="md"
                @click="sendRestart"
                unelevated
              />
              <q-btn
                color="primary"
                label="Guardar"
                class="col"
                size="md"
                @click="sendSave"
                unelevated
              />
            </div>
          </q-card-section>
          <q-card-section class="col">
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

                  <q-separator/>

                  <q-tab-panels v-model="tab" animated>
                    <q-tab-panel
                      v-for="(lista, index) in sensores"
                      :key="index"
                      :name="lista.tab_name"
                    >
                      <div class="text-h6">{{ lista.label }}</div>
                      <q-form>
                        <div class="row form-lines form-lines__gap">
                          <q-select
                            filled
                            v-model="lista.sensor.ip"
                            :options="sensoresDisponiveis"
                            option-value="ip"
                            option-label="ip"
                            emit-value
                            label="Sensores disponiveis"
                          />
                          <q-input
                            class="row"
                            v-model="lista.sensor.ip"
                            filled
                            :label="'IP Sensor ' + lista.tab_label"
                            type="text"
                          />

                          <q-btn
                            class="row"
                            v-if="!lista.sensor.ativo"
                            :color="lista.sensor.corBtn"
                            unelevated
                            label="Conectar"
                            size="lg"
                            @click="conectaSensor(index)"
                          />

                          <q-btn
                            class="row"
                            v-if="lista.sensor.ativo"
                            :color="lista.sensor.corBtn"
                            unelevated
                            label="Desconectar"
                            size="lg"
                            @click="closeSocket(index)"
                          />
                        </div>
                      </q-form>
                    </q-tab-panel>
                  </q-tab-panels>
                </q-card>
              </q-expansion-item>

              <paciente-expasion :bean="bean"/>
            </q-list>
          </q-card-section>
        </div>
      </q-card>
    </div>
  </section>
</template>

<script src="./Sensor.js"/>

<style lang="stylus" scoped>
@import "~src/css/mixins.styl"
.grid-conteudo
  padding 16px
  grid-template-columns 75% 25%
  display grid
  +mobile-portrait()
    display block
    grid-auto-rows 1fr


</style>
