<template>
  <div class="column p-2 running-info">
    <span class="timer-title" v-if="syncSession.sockets?.measurements">
      {{ $t('session.number_of_measurements') }}:
      <span class="timer-value">
        {{ syncSession.sockets?.measurements }}
      </span>
    </span>
    <span v-if="syncSession.runTimer" class="timer-title">
      {{ $t('session.runtime') }}:
      <span class="timer">
        <q-icon
          size="xs"
          :name="syncSession.useAlarm ? 'timer' : 'schedule'"
          color="primary"
        />
        <span class="timer-value">{{ syncSession.timeRunning }}</span>
      </span>
    </span>
  </div>
</template>

<script src="./RunningInfo.ts" lang="ts" />

<style lang="scss" scoped>
.running-info {
  display: flex;
  flex-direction: column;
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
