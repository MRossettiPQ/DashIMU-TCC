<template>
  <div class="third-step h-100">
    <div class="h-100 overflow-auto">
      <q-tabs
        v-model="tabPanel"
        :vertical="!isTinyScreen"
        class="text-grey"
        active-color="primary"
      >
        <q-tab
          class="custom-tab"
          icon="leaderboard"
          name="GRAPH"
          :label="$t('session.tab')"
        />
        <q-tab
          v-for="(sensor, index) in syncSession.sockets?.registeredSensorsList"
          :key="index"
          class="custom-tab"
          icon="table_rows"
          :label="sensor.sensorName"
          :name="'Tab_' + sensor.sensorName"
        />
      </q-tabs>
    </div>

    <q-tab-panels v-model="tabPanel" class="row h-100" animated>
      <q-tab-panel
        class="h-100 w-100 justify-center p-4 items-center"
        name="GRAPH"
      >
        <chart-visualizer
          :sensors="syncSession.sockets.registeredSensorsList"
          :table-columns="tableColumns"
          :smooth="syncSession.smooth"
        />
      </q-tab-panel>

      <q-tab-panel
        v-for="(sensor, index) in syncSession.sockets.registeredSensorsList"
        :key="index"
        class="h-100 w-100 justify-center items-center p-4"
        :name="'Tab_' + sensor.sensorName"
      >
        <measurement-table
          :measurements="sensor.gyro_measurements"
          :table-columns="tableColumns"
        />
        <!--        <tab-measurement-table-->
        <!--          :sensor="sensor"-->
        <!--          :all-sensor="sessionConnection.registeredSensorsList"-->
        <!--          :patient="patient"-->
        <!--          :label="`${$t('session.spreadsheet')} ${sensor.device.id}`"-->
        <!--          :table-columns="tableColumns"-->
        <!--        />-->
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script src="./ThirdStep.ts" lang="ts" />

<style lang="scss" scoped>
@import 'src/css/mixins.scss';
.third-step {
  display: grid;
  grid-template-columns: min-content 1fr;

  @include md() {
    grid-template-columns: none;
    grid-template-rows: min-content 1fr;
  }
}
</style>
