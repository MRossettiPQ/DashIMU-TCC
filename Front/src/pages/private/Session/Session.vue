<template>
  <section ref="patientScreen" class="responsive-height">
    <div class="row responsive-content" v-if="metadata">
      <div class="navigation-stepper">
        <div class="row w-100">
          <span class="step-header__label">{{ actualStep.label }}</span>
        </div>

        <div class="row w-100">
          <transition name="slide-fade" mode="out-in">
            <Component
              :is="step"
              :actual-procedure="actualProcedure"
              :sensor-list.sync="listOfSensors"
              :session.sync="sessionBean"
              :positions.sync="positions"
              :sensors.sync="sensors"
              :metadata="metadata"
              :patient="bean"
              :tiny-screen="isTinyScreen"
              :connected-sensors="connectedSensors"
              :registered-sensor-id.sync="registeredSensorId"
              :measurement-in-progress.sync="measurement_in_progress"
              :measurement-in-pause.sync="measurement_in_pause"
              :number-of-measurements.sync="numberOfMeasurements"
              :number-of-valid-connection.sync="numberOfValidConnection"
            />
          </transition>
        </div>

        <div class="w-100 row navigation-options" v-if="!loading">
          <q-btn
            class="row"
            v-if="step !== 'init-session'"
            flat
            dense
            color="primary"
            @click="prev"
            :label="$t('session.previous')"
          />
          <q-btn
            class="row"
            dense
            v-if="step !== 'run-procedure'"
            @click="next"
            color="primary"
            :label="$t('session.next')"
          />
          <q-btn
            class="row"
            v-else
            dense
            :disable="numberOfMeasurements === 0"
            @click="saveSession"
            color="primary"
            :label="$t('session.save')"
          />
        </div>
      </div>
    </div>
    <div v-else />
  </section>
</template>

<script src="./Session.js" />

<style lang="stylus" scoped>
@import "~src/css/mixins.styl"
.step-header {
  padding-bottom: 12px;

  &__label {
    font-weight: 600;
    font-size: 16px
  }
}

.navigation-options {
  display: flex;
  padding-top: 12px;
  justify-content: space-between;
}


.navigation-stepper {
  display: grid;
  grid-template-rows: min-content 1fr min-content;
  height: 100%;
  padding: 24px;
  width: 100%;
  max-width: 100%
}
</style>
