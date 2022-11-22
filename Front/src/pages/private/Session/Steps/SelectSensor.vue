<template>
  <div class="column w-100" style="gap: 12px">
    <div class="column" style="gap: 6px">
      <span> Minimo de sensores: {{ minSensor }} </span>
      <span> Sensores conectados: {{ syncedNumberOfValidConnection }} </span>
    </div>
    <div class="sensor-list">
      <sensor-item
        v-for="(sensor, index) in syncedSensorAvailableList"
        :sensor="sensor"
        :connect="() => connect(index)"
        :disconnect="() => disconnect(index)"
        :calibrate="() => calibrate(index)"
        :sensors-connected="syncedSensors"
        :menu="menuSensor"
        :key="index"
        :sensor-index="index"
      />
    </div>
  </div>
</template>

<script src="./SelectSensor.js" />

<style lang="stylus" scoped>
@import "~src/css/mixins.styl"
.sensor-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr))
  gap: 12px;
}
</style>
