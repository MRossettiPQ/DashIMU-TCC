<template>
  <div class="custom-run">
    <div class="col">
      <div class="col">
        <q-tabs
          class="row text-grey"
          v-model="tabPanel"
          active-color="primary"
          align="justify"
          dense
          indicator-color="primary"
          narrow-indicator
        >
          <q-tab icon="leaderboard" :label="$t('session.tab')" name="Tab_1" />
          <q-tab
            v-for="(sensor, index) in sensorsData"
            icon="table_rows"
            :label="'Spreadsheet ' + sensor.id"
            :name="'Tab_' + (index + 2)"
            :key="index"
          />
        </q-tabs>
        <q-tab-panels v-model="tabPanel" animated>
          <q-tab-panel name="Tab_1">
            <tab-graph
              v-if="syncedNumberOfMeasurements > 0"
              :data="sensorsData"
              label="Graph"
            />
            <span v-else>
              {{ $t("session.graphic_temporarily_unavailable") }}
            </span>
          </q-tab-panel>

          <q-tab-panel
            v-for="(sensor, index) in sensorsData"
            :name="'Tab_' + (index + 2)"
            :key="index"
          >
            <tab-measurement-table
              :data="sensor.gyro_measurements"
              :patient="patient"
              :label="`${$t('session.spreadsheet')} ${sensor.id}`"
            />
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
    <run-menu
      class="col-all"
      :session.sync="syncedSession"
      :sensors.sync="syncedSensors"
      :positions.sync="syncedPositions"
      :registred-sensor-id.sync="syncedRegistredSensorId"
      :measurement-in-progress.sync="syncedMeasurementInProgress"
      :measurement-in-pause.sync="syncedMeasurementInPause"
      :number-of-connections="numberOfConnections"
      :metadata="metadata"
      :patient="patient"
      :number-of-measurements.sync="syncedNumberOfMeasurements"
    />
  </div>
</template>

<script src="./RunProcedure.js" />

<style lang="stylus" scoped>
@import "~src/css/mixins.styl"
.tab-table {
  background-color: red;

  .q-panel {
    background-color: red;
  }
}

.custom-run {
  display: grid;
  grid-template-columns: minmax(calc(100vw - 660px), 1fr) max-content;
  gap: 12px;
  overflow-y: hidden;
  overflow-x: hidden;
  +mobile-portrait() {
    display: flex;
    flex-direction: column;
    overflow-y: auto !important;
    height: 100% !important
  }
}
</style>
