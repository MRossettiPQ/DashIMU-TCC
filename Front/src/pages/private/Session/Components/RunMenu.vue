<template>
  <div class="col menu">
    <q-list>
      <q-card-section
        v-if="syncedNumberOfConnections > 0 || syncedNumberOfMeasurements > 0"
        class="column"
      >
        <span class="timer-title">
          {{ $t("session.number_of_measurements") }}:
          <span class="timer-value">{{ syncedNumberOfMeasurements }}</span>
        </span>
        <span class="timer-title">
          {{ $t("session.runtime") }}:
          <span class="timer-value">{{ timerRunning }}</span>
        </span>
      </q-card-section>

      <q-btn-group flat>
        <q-btn
          color="primary"
          :label="$t('session.start')"
          :disable="
            syncedMeasurementInProgress ||
            (syncedMeasurementInProgress && !syncedMeasurementInPause)
          "
          size="md"
          unelevated
          icon="play_arrow"
          @click="sendStart"
        />
        <q-btn
          color="primary"
          :label="$t('session.restart')"
          size="md"
          :disable="!syncedMeasurementInProgress"
          icon="restart_alt"
          unelevated
          @click="sendRestart"
        />
        <q-btn
          color="primary"
          :label="$t('session.stop')"
          size="md"
          :disable="!syncedMeasurementInProgress || syncedMeasurementInPause"
          icon="stop"
          unelevated
          @click="sendStop"
        />
      </q-btn-group>

      <patient-expansion :bean="patient" />

      <q-btn
        v-if="syncedNumberOfMeasurements > 0"
        :disable="syncedNumberOfMeasurements === 0"
        color="primary"
        class="col"
        label="Export all"
        size="md"
        unelevated
        @click="exportAll"
        style="width: 100%"
      />

      <q-btn
        v-if="inDev"
        color="primary"
        label="add leitura (APENAS EM DEV)"
        size="md"
        unelevated
        @click="addTestReading"
        style="width: 100%"
      />
    </q-list>
  </div>
</template>

<script src="./RunMenu.js" />

<style lang="stylus" scoped>
@import "~src/css/mixins.styl"
.menu {
  height: 100%;
  overflow-y: auto;
  width: 100%;
  max-width: 313px;
  margin-right: 10px;
  +mobile-portrait() {
    max-width: none;
  }
}

.q-btn-group {
  display: flex;
  justify-content: center;
}

.timer-title {
  font-weight: 400;
  font-size: 1.1rem;

  .timer-value {
    font-weight: 600;
  }
}

.q-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
