<template>
  <section class="responsive-height">
    <div class="row responsive-content form-column form-column__padding">
      <q-card bordered flat class="col grid-session">
        <div class="col">
          <q-tabs
            v-model="tabPanel"
            active-color="primary"
            align="justify"
            class="col text-grey"
            dense
            indicator-color="primary"
            narrow-indicator
          >
            <q-tab icon="leaderboard" label="Grafico" name="Tab_1" />
            <q-tab
              icon="table_rows"
              :label="'Spreadsheet ' + (index + 1)"
              :name="'Tab_' + (index + 2)"
              :key="index"
              v-for="(sensor, index) in sensors"
            />
          </q-tabs>
          <q-separator />

          <q-tab-panels v-model="tabPanel" animated>
            <q-tab-panel name="Tab_1">
              <tab-graph :data="renderRows" :options="options" label="Graph" />
            </q-tab-panel>

            <q-tab-panel
              :name="'Tab_' + (index + 2)"
              :key="index"
              v-for="(sensor, index) in sensors"
            >
              <tab-measurement-table
                :data="sensor.measurements"
                :patient="bean"
                :label="'Spreadsheet ' + (index + 1)"
              />
            </q-tab-panel>
          </q-tab-panels>
        </div>
        <div class="col">
          <q-card-section
            class="col form-column form-column__gap"
            v-show="numberOfConnections >= 2"
          >
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
            </div>
          </q-card-section>
          <q-card-section class="col">
            <q-list bordered class="rounded-borders">
              <sensor-expansion
                :sensors="sensors"
                @addSensor="addSensor"
                @connectSensor="connectSensor($event)"
                @disconnectSensor="disconnectSensor($event)"
              />
              <patient-expansion :bean="bean" />
              <complete-session-expansion
                :session-bean="sessionBean"
                @saveSession="saveSession"
                :number-of-measurements="numberOfMeasurements"
                :loading-save="loadingSave"
              />
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
              label="Force save  ..."
              size="md"
              unelevated
              @click="saveSession"
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
.grid-session
  padding 16px
  grid-template-columns 70% 30%
  display grid
  overflow auto
  +mobile-portrait()
    display block
    grid-auto-rows 1fr

.q-tab-panels
  display block
  height calc(100% - 60px)
  max-height 750px
  overflow auto
</style>
