<template>
  <div class="div-result gap-8 h-100 w-100" v-if="fetchData.hasResult">
    <div class="tabs gap-4 h-100 justify-between overflow-auto">
      <div class="tabs gap-4">
        <q-btn
          unelevated
          :text-color="tab !== `RESULT` ? 'primary' : ''"
          :color="tab === `RESULT` ? 'primary' : ''"
          icon="las la-chart-line"
          @click="selectTab('RESULT')"
        />
        <q-btn
          unelevated
          :text-color="tab !== `RESULT_ANGLES` ? 'primary' : ''"
          :color="tab === `RESULT_ANGLES` ? 'primary' : ''"
          icon="las la-chart-line"
          @click="selectTab('RESULT_ANGLES')"
        />
        <!--        <q-btn-->
        <!--          unelevated-->
        <!--          :text-color="tab !== `VIEW_IN_AR` ? 'primary' : ''"-->
        <!--          :color="tab === `VIEW_IN_AR` ? 'primary' : ''"-->
        <!--          icon="view_in_ar"-->
        <!--          @click="selectTab('VIEW_IN_AR')"-->
        <!--        />-->
        <q-btn
          unelevated
          :text-color="tab !== `RESULT_TABLE` ? 'primary' : ''"
          :color="tab === `RESULT_TABLE` ? 'primary' : ''"
          icon="las la-project-diagram"
          @click="selectTab('RESULT_TABLE')"
        />
        <q-btn
          unelevated
          :text-color="tab !== `GRAPH` ? 'primary' : ''"
          :color="tab === `GRAPH` ? 'primary' : ''"
          icon="las la-chart-area"
          @click="selectTab('GRAPH')"
        />
        <q-btn
          v-for="(sensor, index) in movement?.sensors"
          :key="index"
          unelevated
          :text-color="tab !== `SENSOR_${sensor.id}` ? 'primary' : ''"
          :color="tab === `SENSOR_${sensor.id}` ? 'primary' : ''"
          icon="las la-table"
          @click="selectTab(`SENSOR_${sensor.id}`)"
        />
      </div>

      <q-btn unelevated color="primary" icon="las la-file-csv" @click="exportCSV()" />
    </div>
    <q-tab-panels v-model="tab" class="row h-100 p-0" animated>
      <q-tab-panel class="h-100 w-100 justify-center items-center p-0" name="RESULT">
        <graph-result :movement="movement" :calculation="fetchData.result?.calculation" />
      </q-tab-panel>
      <q-tab-panel class="h-100 w-100 justify-center items-center p-0" name="RESULT_ANGLES">
        <graph-angles :movement="movement" :calculation="fetchData.result?.calculation" />
      </q-tab-panel>
      <q-tab-panel class="h-100 w-100 justify-center items-center p-0" name="RESULT_TABLE">
        <result-table :movement="movement" :calculation="fetchData.result?.calculation" />
      </q-tab-panel>
      <q-tab-panel class="h-100 w-100 justify-center items-center p-0" name="VIEW_IN_AR">
        <div class="p-relative h-100 w-100">
          <three-visualizer class="col" />
        </div>
      </q-tab-panel>
      <q-tab-panel class="h-100 w-100 justify-center items-center p-0" name="GRAPH">
        <graph-sensor
          :movement="movement"
          :columns="columns"
          :sensors="fetchData.result.movement?.sensors"
        />
      </q-tab-panel>
      <q-tab-panel
        v-for="(sensor, index) in fetchData.result.movement?.sensors"
        :key="index"
        class="h-100 w-100 p-0"
        :name="`SENSOR_${sensor.id}`"
      >
        <table-measurements :sensor="sensor" :columns="columns" />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script src="./MovementResult.js" />

<style lang="scss" scoped>
@import '~src/css/mixins.scss';

::v-deep .q-tab-panel {
  padding: 0 !important;
}

.tabs {
  display: flex;
  flex-direction: column;
  padding: 0 2px 0 0;
  @include md() {
    padding: 0 0 2px 0;
    flex-direction: row;
  }
}

.div-result {
  display: grid;
  grid-template-columns: min-content 1fr;
  width: 100%;
  height: 100%;
  @include md() {
    grid-template-columns: 1fr;
    grid-template-rows: min-content 1fr;
  }
}
</style>
