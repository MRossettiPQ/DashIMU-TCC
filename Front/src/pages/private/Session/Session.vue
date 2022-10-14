<template>
  <section class="responsive-height">
    <div class="row responsive-content form-column form-column__padding">
      <q-stepper
        ref="stepper"
        v-model="step"
        active-color="deep-orange"
        done-color="secondary"
      >
        <q-step
          :name="1"
          title="Select campaign settings"
          icon="settings"
          :done="step > 1"
        >
          For each ad campaign that you create, you can control how much you're
          willing to spend on clicks and conversions, which networks and
          geographical locations you want your ads to show on, and more.
        </q-step>

        <q-step
          :name="2"
          title="Create an ad group"
          caption="Optional"
          icon="create_new_folder"
          :done="step > 2"
        >
          An ad group contains one or more ads which target a shared set of
          keywords.
        </q-step>

        <q-step :name="3" title="Create an ad" icon="add_comment">
          Try out different ad text to see what brings in the most customers,
          and learn how to enhance your ads using features like ad extensions.
          If you run into any problems with your ads, find out how to tell if
          they're running and how to resolve approval issues.
        </q-step>

        <template #navigation>
          <q-stepper-navigation>
            <q-btn
              @click="$refs.stepper.next()"
              color="deep-orange"
              :label="step === 3 ? 'Finish' : 'Continue'"
            />
            <q-btn
              v-if="step > 1"
              flat
              color="deep-orange"
              @click="$refs.stepper.previous()"
              label="Back"
              class="q-ml-sm"
            />
          </q-stepper-navigation>
        </template>
      </q-stepper>
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
              <tab-graph :data="sensorsData" label="Graph" />
            </q-tab-panel>

            <q-tab-panel
              :name="'Tab_' + (index + 2)"
              :key="index"
              v-for="(sensor, index) in sensors"
            >
              <tab-measurement-table
                :data="sensor.gyro_measurements"
                :patient="bean"
                :label="'Spreadsheet ' + (index + 1)"
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
            </div>
          </q-card-section>
          <q-card-section class="col">
            <q-list bordered class="rounded-borders">
              <sensor-expansion
                :sensors="sensors"
                @addSensor="addSensor"
                @connectSensor="connectSensor($event)"
                @disconnectSensor="disconnectSensor($event)"
                @calibrateSensor="calibrateSensor($event)"
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
              v-if="inDev"
              color="primary"
              label="add leitura"
              size="md"
              unelevated
              @click="addLeituraTeste"
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
