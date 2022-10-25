<template>
  <section class="responsive-height navigation-stepper">
    <q-stepper
      class="col"
      ref="stepper"
      v-model="step"
      active-color="deep-orange"
      done-color="secondary"
      style="height: 100%"
      v-if="!loading"
      flat
    >
      <q-step
        :name="1"
        :title="$t('session.select_procedure')"
        icon="settings"
        :done="step > 1"
      >
        <q-form v-if="!!metadata" class="form-lines form-lines__gap-sm">
          <q-select
            v-if="metadata.procedures.length"
            v-model="sessionBean.procedure"
            :options="metadata.procedures"
            emit-value
            filled
            :label="$t('session.procedure')"
            :rules="[$validators.notBlank]"
            option-label="articulation_name"
            option-value="value"
          />

          <div class="info-card" v-if="sessionBean.procedure !== null">
            <div class="column">
              <q-select
                v-model="sessionBean.movement"
                :options="getMovements"
                emit-value
                filled
                :label="$t('session.movement')"
                :rules="[$validators.notBlank]"
                option-label="movement_name"
                option-value="value"
              />
              <span v-if="movement">{{ movement.description }}</span>
            </div>

            <div class="img-center" v-if="!!sessionBean.movement">
              <q-img :src="getMovementImg" style="height: auto; width: 300px" />
            </div>
          </div>

          <q-input
            v-model="sessionBean.weight"
            class="row"
            filled
            :label="$t('session.weight')"
            type="text"
          />
        </q-form>
      </q-step>

      <q-step
        :name="2"
        :title="$t('session.run_procedure')"
        icon="create_new_folder"
        :done="step > 2"
      >
        <div
          style="height: calc(100vh - 244px)"
          class="row responsive-content form-column form-column__padding"
        >
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
                <q-tab
                  icon="leaderboard"
                  :label="$t('session.tab')"
                  name="Tab_1"
                />
                <q-tab
                  v-for="(sensor, index) in sensors"
                  icon="table_rows"
                  :label="'Spreadsheet ' + (index + 1)"
                  :name="'Tab_' + (index + 2)"
                  :key="index"
                />
              </q-tabs>
              <q-separator />

              <q-tab-panels v-model="tabPanel" animated>
                <q-tab-panel name="Tab_1">
                  <tab-graph
                    v-if="numberOfMeasurements > 0"
                    :data="sensorsData"
                    label="Graph"
                  />
                  <span v-else>Gráfico temporarimente indisponivel</span>
                </q-tab-panel>

                <q-tab-panel
                  :name="'Tab_' + (index + 2)"
                  :key="index"
                  v-for="(sensor, index) in sensors"
                >
                  <tab-measurement-table
                    :data="sensor.gyro_measurements"
                    :patient="bean"
                    :label="`${$t('session.spreadsheet')} ${index + 1}`"
                  />
                </q-tab-panel>
              </q-tab-panels>
            </div>
            <div class="col">
              <q-card-section
                class="col form-column form-column__gap"
                v-if="numberOfConnections > 0"
              >
                <span class="timer">Tempo de execução: {{ timerRunning }}</span>
              </q-card-section>
              <q-card-section
                class="col form-column form-column__gap"
                v-if="numberOfConnections > 0"
              >
                <q-btn-group class="col">
                  <q-btn
                    class="col"
                    color="primary"
                    :label="$t('session.start')"
                    size="md"
                    unelevated
                    icon="play_arrow"
                    @click="sendStart"
                  />
                  <q-btn
                    class="col"
                    color="primary"
                    :label="$t('session.restart')"
                    size="md"
                    icon="restart_alt"
                    unelevated
                    @click="sendRestart"
                  />
                  <q-btn
                    class="col"
                    color="primary"
                    :label="$t('session.stop')"
                    size="md"
                    icon="stop"
                    unelevated
                    @click="sendStop"
                  />
                </q-btn-group>
              </q-card-section>
              <q-card-section class="col">
                <q-list bordered class="rounded-borders">
                  <sensor-expansion
                    :sensors="sensors"
                    :metadata="metadata"
                    :positions="positions"
                    @addSensor="addSensor"
                    @removeSensor="removeSensor($event)"
                    @connectSensor="connectSensor($event)"
                    @disconnectSensor="disconnectSensor($event)"
                    @calibrateSensor="calibrateSensor($event)"
                  />
                  <patient-expansion :bean="bean" />
                </q-list>
              </q-card-section>

              <q-card-section v-if="numberOfMeasurements > 0">
                <q-btn
                  :disable="numberOfMeasurements === 0"
                  color="primary"
                  class="col"
                  label="Export all"
                  size="md"
                  unelevated
                  @click="exportAll"
                  style="width: 100%"
                />
              </q-card-section>

              <q-card-section v-if="inDev">
                <q-btn
                  color="primary"
                  label="add leitura (APENAS EM DEV)"
                  size="md"
                  unelevated
                  @click="addLeituraTeste"
                  style="width: 100%"
                />
              </q-card-section>
            </div>
          </q-card>
        </div>
      </q-step>
    </q-stepper>
    <div class="navigation-control" v-if="!loading">
      <q-btn
        v-if="step > 1"
        flat
        color="primary"
        @click="$refs.stepper.previous()"
        :label="$t('session.previous')"
      />
      <q-btn
        v-if="step < 2"
        @click="next"
        color="primary"
        :label="$t('session.next')"
      />
      <q-btn
        v-else
        :disable="numberOfMeasurements === 0"
        @click="saveSession"
        color="primary"
        :label="$t('session.save')"
      />
    </div>
  </section>
</template>

<script src="./Session.js" />

<style lang="stylus" scoped>
@import "~src/css/mixins.styl"
.q-stepper--horizontal .q-stepper__step-inner
  padding 1px !important

.navigation-control
  display flex
  justify-content space-between
  padding 12px

.navigation-stepper
  display grid
  grid-template-rows 1fr max-content

.info-card
  display grid
  grid-template-columns 1fr 1fr
  align-items center
  gap 12px

.img-center {
  display: flex;
  justify-content: center;
}

.timer {
  font-size: 20px;
  color: red;
  font-weight: bold;
}

.grid-session
  height 100%
  padding 6px
  grid-template-columns 70% 30%
  display grid
  overflow auto
  +mobile-portrait()
    display block
    grid-auto-rows 1fr

.q-tab-panels
  display block
  height calc(100% - 60px)
</style>
