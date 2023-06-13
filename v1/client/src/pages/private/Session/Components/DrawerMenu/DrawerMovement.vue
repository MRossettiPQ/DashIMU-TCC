<template>
  <q-card bordered flat class="column no-wrap p-8">
    <span>{{ name }}</span>
    <span v-if="movement.observation">{{ movement.observation }}</span>

    <table class="w-100" v-if="movement.sensors.length">
      <tr>
        <th>Sensor</th>
        <th>Medições</th>
      </tr>
      <tr v-for="(sensor, index) in movement.sensors" :key="index">
        <th>{{ sensor.sensorName }}</th>
        <th>{{ sensor.gyro_measurements.length }}</th>
      </tr>
    </table>
    <span v-else> Nenhum dado aplicado até o momento </span>
  </q-card>
</template>

<script src="./DrawerMovement.js" />

<style lang="scss" scoped>
table {
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
</style>
