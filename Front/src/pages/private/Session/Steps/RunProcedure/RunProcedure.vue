<template>
  <div class="run-procedure">
    <q-tabs
      v-model="tabPanel"
      vertical
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      narrow-indicator
    >
      <q-tab
        class="custom-tab"
        icon="leaderboard"
        name="GRAPH"
        :label="$t('session.tab')"
      />
      <q-tab
        v-for="(sensor, index) in sessionConnection.registeredSensorsList"
        :key="index"
        class="custom-tab"
        icon="table_rows"
        :label="'Tabela ' + sensor.device.id"
        :name="'Tab_' + sensor.device.id"
      />
    </q-tabs>
    <q-tab-panels v-model="tabPanel" class="row h-100" animated>
      <q-tab-panel class="h-100 w-100 justify-center items-center" name="GRAPH">
        <tab-graph
          v-if="sessionConnection.numberOfMeasurements > 0"
          :registered-sensors-list.sync="
            sessionConnection.registeredSensorsList
          "
          :is-tiny-screen="isTinyScreen"
          :session-state="sessionConnection"
        />
        <div v-else class="column div-lottie">
          <lottie-vue-player
            class="lottie"
            :src="'/lottie/chart-reports.json'"
            :autoplay="true"
            :loop="true"
            :speed="1"
          />
          <span class="text-black">
            {{ $t("session.graphic_temporarily_unavailable") }}
          </span>
        </div>
      </q-tab-panel>

      <q-tab-panel
        v-for="(sensor, index) in sessionConnection.registeredSensorsList"
        :key="index"
        class="h-100 w-100 justify-center items-center"
        :name="'Tab_' + sensor.device.id"
      >
        <tab-measurement-table
          :sensor="sensor"
          :all-sensor="sessionConnection.registeredSensorsList"
          :patient="patient"
          :label="`${$t('session.spreadsheet')} ${sensor.device.id}`"
          :table-columns="tableColumns"
        />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script src="./RunProcedure.js" />

<style lang="scss" scoped>
@import "~src/css/mixins.scss";
.run-procedure {
  display: grid;
  grid-template-columns: min-content 1fr;
}

.custom-tab {
  ::v-deep .q-tab__content,
  .self-stretch,
  .flex-center,
  .relative-position,
  .q-anchor--skip,
  .non-selectable,
  .column {
    padding-right: 12px;
  }
}

::v-deep .q-tab-panel {
  padding: 1px !important;
}

.div-lottie {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.lottie {
  width: 300px;
  height: 300px;
  background: transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
