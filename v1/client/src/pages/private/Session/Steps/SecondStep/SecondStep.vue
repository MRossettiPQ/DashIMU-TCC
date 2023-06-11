<template>
  <div class="column select-sensor h-100 w-100">
    <div class="column p-b-16 gap-8">
      <span> Mínimo de sensores: {{ syncedSession.minSensor }} </span>
      <span> Sensores conectados: {{ connection.numberOfValidConnection }} </span>
    </div>
    <div class="row sensor-list w-100">
      <sensor-available
        v-for="(sensor, index) in connection.filterSensorsConnected"
        :key="`available-${index}`"
        class="col sensor-available"
        :sensor="sensor"
        :registered-sensors-list.sync="connection.registeredSensorsList"
        :is-tiny-screen="isTinyScreen"
        :session-connection="connection"
        :session.sync="syncedSession"
        @connect="connection.connect($event)"
        @disconnect="connection.disconnect($event)"
        @calibrate="connection.calibrate($event)"
        @remove="connection.remove($event)"
      />
      <sensor-registered
        v-for="(sensor, index) in connection.registeredSensorsList"
        :key="`connected-${index}`"
        class="col sensor-available"
        :registered-sensors-list.sync="connection.registeredSensorsList"
        :sensor="sensor"
        :is-tiny-screen="isTinyScreen"
        :session.sync="syncedSession"
        :session-connection="connection"
        @connect="connection.connect($event)"
        @disconnect="connection.disconnect($event)"
        @calibrate="connection.calibrate($event)"
        @remove="connection.remove($event)"
      />
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
    overflow-y: auto;
    gap: 12px;
    padding-right: 3px;
  }
}

.sensor-available {
  min-width: 280px;
}
</style>
