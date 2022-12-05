<template>
  <div class="w-100" style="display: flex; flex-direction: column; gap: 8px">
    <q-input
      v-model="syncedSensor.sensorName"
      class="row"
      disable
      filled
      :label="$t('import_example.sensor_name')"
    />
    <q-select
      v-model="syncedSensor.position"
      class="row"
      :options="session.getPositions"
      emit-value
      borderless
      disable
      dense
      :label="$t('import_example.positions')"
      option-label="label"
      option-value="value"
    />
    <q-file
      class="row"
      v-model="syncedSensor.file"
      :label="$t('import_example.select_file')"
      filled
      accept=".csv"
      :rules="[$validators.notBlank]"
    />
  </div>
</template>

<script src="./SensorLine.js" />

<style lang="scss" scoped></style>
