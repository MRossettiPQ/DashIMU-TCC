<template>
  <section class="responsive-height">
    <div class="row responsive-content form-column form-column__padding">
      <q-card bordered class="col grid-conteudo" flat>
        <div class="col">
          <q-tabs
            v-model="tabGrande"
            active-color="primary"
            align="justify"
            class="col text-grey"
            dense
            indicator-color="primary"
            narrow-indicator
          >
            <q-tab icon="leaderboard" label="Grafico" name="Tab_1" />
            <q-tab icon="table_rows" label="Tabela" name="Tab_2" />
          </q-tabs>
          <q-separator />
          <q-tab-panels v-model="tabGrande" animated class="col">
            <q-tab-panel name="Tab_1">
              <tab-graph
                :data="renderRows"
                :options="options"
                label="Grafico"
              />
            </q-tab-panel>

            <q-tab-panel name="Tab_2">
              <tab-measurement-table
                :data="sensores[0].data"
                :paciente="bean"
                label="Tabela"
              />
            </q-tab-panel>
          </q-tab-panels>
        </div>

        <div class="col">
          <q-card-section class="col form-column form-column__gap">
            <div class="col form-lines form-lines__gap form-lines__no-padding">
              <q-btn
                class="col"
                color="primary"
                label="Iniciar"
                size="md"
                unelevated
                @click="sendStart"
              />
              <q-btn
                class="col"
                color="primary"
                label="Pausar"
                size="md"
                unelevated
                @click="sendStop"
              />
            </div>
            <div class="col form-lines form-lines__gap form-lines__no-padding">
              <q-btn
                class="col"
                color="primary"
                label="Reinicia"
                size="md"
                unelevated
                @click="sendRestart"
              />
              <q-btn
                class="col"
                color="primary"
                label="Guardar"
                size="md"
                unelevated
                @click="sendSave"
              />
            </div>
          </q-card-section>
          <q-card-section class="col">
            <q-list bordered class="rounded-borders">
              <sensor-expansion
                :sensores="sensores"
                :tab="tab"
                @addSensor="addSensor"
                @conectarSensor="conectarSensor($event)"
                @desconectarSensor="desconectarSensor($event)"
              />
              <patient-expasion :bean="bean" />
            </q-list>
          </q-card-section>
          <q-card-section>
            <q-btn
              color="primary"
              label="add leitura"
              size="md"
              unelevated
              @click="addLeituraTeste"
            />

            <q-btn
              color="primary"
              label="get central ..."
              size="md"
              unelevated
              @click="postCentralVariabilidadeSalto"
            />
          </q-card-section>
        </div>
      </q-card>
    </div>
  </section>
</template>

<script src="./Session.js" />

<style lang="stylus" scoped>
@import "~src/css/mixins.styl"
.grid-conteudo
  padding 16px
  grid-template-columns 70% 30%
  display grid
  +mobile-portrait()
    display block
    grid-auto-rows 1fr
</style>
