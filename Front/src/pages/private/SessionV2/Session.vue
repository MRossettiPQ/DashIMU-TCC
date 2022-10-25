<template>
  <section class="responsive-height">
    <div class="row responsive-content">
      <q-stepper
        class="col"
        ref="stepper"
        v-model="step"
        active-color="deep-orange"
        done-color="secondary"
      >
        <q-step
          :name="1"
          title="Select procedure"
          icon="settings"
          :done="step > 1"
        >
          <div>
            <q-form v-if="!!metadata" class="form-lines form-lines__gap-sm">
              <q-select
                v-if="metadata.procedures.length"
                v-model="session.type"
                :options="metadata.procedures"
                emit-value
                filled
                label="Procedure"
                option-label="articulation_name"
                option-value="value"

              />

              <div class="info-card">
                <q-select
                  v-if="movements.length"
                  v-model="session.movement"
                  :options="movements"
                  emit-value
                  filled
                  label="Movement"
                  option-label="movement_name"
                  option-value="value"
                />

                <div class="img-center" v-show="!!session.movement">
                  <q-img
                    src="~assets/procedures/shoulder_-_flexion.jpg"
                    style="height: auto; width: 300px"
                  />
                </div>
              </div>

              <q-input
                v-model="session.weight"
                :rules="[$validators.notBlank]"
                class="row"
                filled
                label="Weight"
                type="text"
              />
            </q-form>
          </div>
        </q-step>

        <q-step
          :name="2"
          title="Run procedure"
          caption="Optional"
          icon="create_new_folder"
          :done="step > 2"
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
                <q-tab icon="leaderboard" label="Grafico" name="Tab_1" />
              </q-tabs>

              <q-tab-panels v-model="tabPanel" animated>
                <q-tab-panel name="Tab_1">
                  <TabGraph :data="session.sensors" label="Graph" />
                </q-tab-panel>

                <q-tab-panel
                  :name="'Tab_' + (index + 2)"
                  :key="index"
                  v-for="(sensor, index) in session.sensors"
                >
                  <TabMeasurementTable
                    :data="sensor.gyro_measurements"
                    :patient="patient"
                    :label="'Spreadsheet ' + (index + 1)"
                  />
                </q-tab-panel>
              </q-tab-panels>
            </div>
            <div class="col">
              <span>Test</span>
              <InfoSession />
              <SensorConnectionList @connectSensor="sendAddSensor($event)" />
            </div>
          </q-card>
        </q-step>

        <template #navigation>
          <q-stepper-navigation>
            <q-btn
              v-if="step > 1"
              flat
              color="deep-orange"
              @click="$refs.stepper.previous()"
              label="Back"
              class="q-ml-sm"
            />
            <q-btn
              @click="$refs.stepper.next()"
              color="deep-orange"
              :label="step === 2 ? 'Finish' : 'Continue'"
            />
          </q-stepper-navigation>
        </template>
      </q-stepper>
    </div>
  </section>
</template>

<script src="./Session.js" />

<style lang="stylus" scoped>
@import "~src/css/mixins.styl"
.img-center
  display flex
  justify-content center

.info-card
  display grid
  grid-template-columns 1fr 1fr
  align-items: center;

.grid-session
  padding 12px
  grid-template-columns 70% 30%
  display grid
  overflow auto
  +mobile-portrait()
    display block
    grid-auto-rows 1fr
</style>
