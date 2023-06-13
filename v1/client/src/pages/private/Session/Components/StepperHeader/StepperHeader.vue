<template>
  <div class="column no-wrap">
    <div class="row justify-between items-center content-center w-100">
      <div class="row no-wrap">
        <span class="f-bold f-medium">{{ navigation.actualStepLabel }}</span>
        <span v-if="showActualMovement" class="f-bold f-medium">
          : {{ syncedSession.actualRunningMovement?.label }}
        </span>
      </div>

      <div class="row gap-12">
        <q-btn
          class="row icon-primary"
          round
          dense
          unelevated
          :loading="syncedConnection.loadingRequest"
          :icon="syncedConnection?.loadingRequest ? '' : 'refresh'"
          @click="syncedConnection?.requestAvailableSensors()"
        />
        <q-btn
          class="row disconnected"
          round
          unelevated
          :class="{ connected: 'connected' }"
          dense
          :icon="connected ? 'sensors' : 'sensors_off'"
        />
        <q-btn
          v-if="!syncedSession.emptyMovements"
          round
          dense
          unelevated
          size="md"
          class="row icon-primary"
          icon="settings"
          @click="openDrawer"
        />
      </div>
    </div>
    <running-info
      v-if="navigation.actualStepValue === 'third-step'"
      :connection="syncedConnection"
    />
  </div>
</template>

<script src="./StepperHeader.js" />

<style lang="scss" scoped>
.connected {
  color: $tertiary !important;
}

.disconnected {
  color: $primary;
}
</style>
