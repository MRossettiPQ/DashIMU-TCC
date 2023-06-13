<template>
  <div class="column p-2 running-info no-wrap">
    <span class="timer-title no-wrap">
      {{ $t('session.number_of_measurements') }}:
      <span class="timer-value">
        {{ connection?.numberOfMeasurements }}
      </span>
      - Ângulo: {{ angle }}
    </span>
    <span v-if="connection?.time" class="timer-title no-wrap">
      {{ $t('session.runtime') }}:
      <div class="timer no-wrap">
        <q-icon size="xs" :name="connection.useAlarm ? 'timer' : 'schedule'" color="primary" />
        <span class="timer-value">{{ connection?.timeRunning }}</span>
      </div>
    </span>
  </div>
</template>

<script src="./RunningInfo.js" />

<style lang="scss" scoped>
.running-info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  vertical-align: center;

  .timer {
    margin-left: 2px;
    background-color: #f5f5f5;
    border: #565353 solid 1px;
    display: flex;
    flex-direction: row;
    gap: 2px;
    align-items: center;
    padding: 0 4px 0 4px;
    border-radius: 3px;
  }

  .timer-title {
    font-weight: 400;
    font-size: 1rem;
    display: flex;
    align-items: center;

    .timer-value {
      font-weight: 600;
    }
  }
}
</style>
