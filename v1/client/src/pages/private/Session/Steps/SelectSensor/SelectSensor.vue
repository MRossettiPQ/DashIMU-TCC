<template>
  <div class="column select-sensor h-100 w-100">
    <div class="column p-b-16 gap-8">
      <span> Mínimo de sensores: {{ syncedSession.minSensor }} </span>
      <span> Sensores conectados: {{ sessionConnection.numberOfValidConnection }} </span>
    </div>
    <div class="row sensor-list w-100">
      <sensor-available
        v-for="(sensor, index) in sessionConnection.filterSensorsConnected"
        :key="`available-${index}`"
        class="col sensor-available"
        :sensor="sensor"
        :registered-sensors-list.sync="sessionConnection.registeredSensorsList"
        :is-tiny-screen="isTinyScreen"
        :session-connection="sessionConnection"
        :session.sync="syncedSession"
        @connect="sessionConnection.connect($event)"
        @disconnect="sessionConnection.disconnect($event)"
        @calibrate="sessionConnection.calibrate($event)"
        @remove="sessionConnection.remove($event)"
      />
      <sensor-registered
        v-for="(sensor, index) in sessionConnection.registeredSensorsList"
        :key="`connected-${index}`"
        class="col sensor-available"
        :registered-sensors-list.sync="sessionConnection.registeredSensorsList"
        :sensor="sensor"
        :is-tiny-screen="isTinyScreen"
        :session.sync="syncedSession"
        :session-connection="sessionConnection"
        @connect="sessionConnection.connect($event)"
        @disconnect="sessionConnection.disconnect($event)"
        @calibrate="sessionConnection.calibrate($event)"
        @remove="sessionConnection.remove($event)"
      />
    </div>
  </div>
</template>

<script src="./SelectSensor.js" />

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
    overflow-y: auto;
    gap: 12px;
    padding-right: 3px;
  }
}

.sensor-available {
  min-width: 280px;
}
</style>
