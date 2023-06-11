<template>
  <div class="column no-wrap">
    <div class="row navigation-header w-100">
      <div class="row no-wrap">
        <span class="step-header__label">{{ navigation.actualStepLabel }}</span>
        <span v-if="showActualMovement" class="step-header__label">
          : {{ syncedSession.actualRunningMovement?.label }}
        </span>
      </div>

      <div class="notification">
        <q-btn
          round
          dense
          unelevated
          class="row icon-primary"
          icon="add"
          @click="sessionConnection.addTestReading()"
        />
        <q-btn
          class="row icon-primary"
          round
          dense
          unelevated
          :loading="sessionConnection.loadingRequest"
          :icon="sessionConnection?.loadingRequest ? '' : 'refresh'"
          @click="sessionConnection?.requestAvailableSensors()"
        />
        <q-btn
          class="row disconnected"
          round
          unelevated
          :class="{ connected: 'connected' }"
          dense
          :icon="connected ? 'sensors' : 'sensors_off'"
        />
        <q-btn round dense unelevated size="md" class="row icon-primary" icon="settings">
          <q-menu fit>
            <q-list style="min-width: 250px">
              <q-item v-if="!!syncedSession.values.movements[0]?.type">
                <q-select
                  v-model="syncedSession.running_movement"
                  class="col"
                  :options="syncedSession.addedMovements"
                  dense
                  label="Procedimento atual"
                  :rules="[$validators.notBlank]"
                  option-label="label"
                  option-value="index"
                />
              </q-item>
              <q-item>
                <q-btn
                  dense
                  unelevated
                  label="Resumo"
                  :disable="sessionConnection.numberOfMeasurements === 0"
                  class="col"
                  icon-right="settings"
                  color="primary"
                  no-caps
                  @click="openCheckMeasurements"
                />
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>
    </div>
    <running-info
      v-if="navigation.actualStepValue === 'run-procedure'"
      :session-connection="sessionConnection"
    />
  </div>
</template>

<script src="./StepperHeader.js" />

<style lang="scss" scoped>
.connected {
  color: $tertiary !important;
}
.icon-primary {
  color: $primary;
}

.disconnected {
  color: $primary;
}

.notification {
  display: flex;
  flex-direction: row;
  gap: 12px;
}

.navigation-header {
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
}

.step-header {
  padding-bottom: 12px;

  &__label {
    font-weight: 600;
    font-size: 16px;
  }
}
</style>
