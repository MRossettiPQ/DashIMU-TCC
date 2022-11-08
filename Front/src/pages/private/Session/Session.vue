<template>
  <section class="column responsive-height">
    <div class="navigation-stepper" v-if="metadata">
      <div class="row step-header">
        <span class="step-header__label">{{ actualStep.label }}</span>
      </div>

      <transition class="col" name="slide-fade" mode="out-in">
        <Component
          :is="step"
          :session.sync="sessionBean"
          :positions.sync="positions"
          :sensors.sync="sensors"
          :metadata="metadata"
          :patient="bean"
          :number-of-connections.sync="numberOfConnections"
          :registred-sensor-id.sync="registredSensorId"
          :measurement-in-progress.sync="measurement_in_progress"
          :measurement-in-pause.sync="measurement_in_pause"
          :number-of-measurements.sync="numberOfMeasurements"
        />
      </transition>

      <div class="row navigation-options" v-if="!loading">
        <q-btn
          class="row"
          v-if="step !== 'init-session'"
          flat
          color="primary"
          @click="prev"
          :label="$t('session.previous')"
        />
        <q-btn
          class="row"
          v-if="step === 'init-session'"
          @click="next"
          color="primary"
          :label="$t('session.next')"
        />
        <q-btn
          class="row"
          v-else
          :disable="numberOfMeasurements === 0"
          @click="saveSession"
          color="primary"
          :label="$t('session.save')"
        />
      </div>
    </div>
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
  height: 100%;
  display: grid;
  grid-template-rows: min-content 1fr max-content;
  padding: 12px;
}
</style>
