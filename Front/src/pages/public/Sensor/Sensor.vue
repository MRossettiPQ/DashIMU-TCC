<template>
  <section class="responsive-height">
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
            <q-tab name="Tab_2" label="Tabela" icon="table_rows"/>
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
              <sensor-expasion :tab="tab" :sensores="sensores" @conectarSensor="conectarSensor($event)"  @desconectarSensor="desconectarSensor($event)" />
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
