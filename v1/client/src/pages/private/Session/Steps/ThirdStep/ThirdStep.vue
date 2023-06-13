<template>
  <div class="run-procedure h-100 w-100 gap-4 overflow-auto">
    <q-tabs
      v-model="tabPanel"
      vertical
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
    >
      <q-tab icon="leaderboard" name="GRAPH" :label="$t('session.tab')" />
      <q-tab
        v-for="(sensor, index) in syncedConnection.registeredSensorsList"
        :key="index"
        icon="table_rows"
        :label="'Tabela ' + sensor.sessionId"
        :name="'Tab_' + sensor.sessionId"
      />
    </q-tabs>
    <q-tab-panels v-model="tabPanel" class="row h-100" animated>
      <q-tab-panel class="h-100 w-100 justify-center items-center p-0" name="GRAPH">
        <chart-visualizer
          :sensors="syncedConnection.registeredSensorsList"
          :table-columns="graphColumns"
          :smooth="true"
        />
      </q-tab-panel>

      <q-tab-panel
        v-for="(sensor, index) in syncedConnection.registeredSensorsList"
        :key="index"
        class="h-100 w-100 justify-center items-center p-0"
        :name="'Tab_' + sensor.sessionId"
      >
        <tab-measurement-table :sensor="sensor" :table-columns="tableColumns" />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script src="./ThirdStep.js" />

<style lang="scss" scoped>
@import '~src/css/mixins.scss';
.run-procedure {
  display: grid;
  grid-template-columns: min-content 1fr;
}
</style>
