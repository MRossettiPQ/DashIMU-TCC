<template>
  <div class="column select-sensor h-100 w-100">
    <div class="column p-b-16 gap-8">
      <span> Mínimo de sensores: {{ syncedSession.minSensor }} </span>
      <span> Sensores conectados: {{ syncedConnection.numberOfValidConnection }} </span>
    </div>
    <div class="column">
      <div class="row sensor-list">
        <sensor-available
          v-for="(sensor, index) in syncedConnection.filterSensorsConnected"
          :key="`available-${index}`"
          class="col sensor-available"
          :sensor="sensor"
          :registered-sensors-list.sync="syncedConnection.registeredSensorsList"
          :connection.sync="syncedConnection"
          :session.sync="syncedSession"
        />
        <sensor-available
          v-for="(sensor, index) in syncedConnection.registeredSensorsList"
          :key="`connected-${index}`"
          class="col sensor-available"
          :sensor="sensor"
          :registered-sensors-list.sync="syncedConnection.registeredSensorsList"
          :connection.sync="syncedConnection"
          :session.sync="syncedSession"
        />
      </div>
    </div>
  </div>
</template>

<script src="./SecondStep.js" />

<style lang="scss" scoped>
@import '~src/css/mixins.scss';
.select-sensor {
  display: grid;
  grid-template-rows: min-content 1fr;
  max-height: calc(100vh - (80px + 80px));

  .sensor-list {
    display: flex;
    flex-direction: row;
    align-content: flex-start;
    flex-wrap: wrap;
    gap: 12px;
  }
}

.sensor-available {
  max-width: 50%;
}
</style>
