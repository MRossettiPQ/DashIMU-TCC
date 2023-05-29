<template>
  <div class="row justify-between">
    <div class="row justify-between w-100">
      <div class="step-header">
        <span class="step-header__label">{{ syncSession.navigation.actualStepLabel }}</span>
        <!--        <span>{{ syncSession.navigation.actualStepLabel }}</span>-->
      </div>

      <div class="row gap-4">
        <q-btn
          round
          dense
          unelevated
          icon="archive"
          no-caps
        />
        <q-btn
          round
          dense
          unelevated
          icon="print"
          no-caps
          @click="syncSession.print()"
        />
        <q-btn
          v-if="syncSession.backEndSocket.connected"
          round
          dense
          unelevated
          :loading="syncSession.backEndSocket.loadingSensors"
          :icon="syncSession.backEndSocket.loadingSensors ? '' : 'refresh'"
          @click="syncSession.backEndSocket.requestAvailableSensors()"
        />
        <q-btn
          round
          unelevated
          :class="{
            'connected': syncSession.backEndSocket.connected,
            'disconnected': !syncSession.backEndSocket.connected,
          }"
          dense
          :icon="syncSession.backEndSocket.connected ? 'sensors' : 'sensors_off'"
        />
        <q-btn
          round
          dense
          unelevated
          icon="settings"
        >
          <q-menu fit>
            <q-list>
              <q-item>
                <!--                <q-select-->
                <!--                  v-model="syncedSession.running_movement"-->
                <!--                  class="col"-->
                <!--                  :options="syncedSession.addedMovements"-->
                <!--                  dense-->
                <!--                  label="Procedimento atual"-->
                <!--                  :rules="[$validators.notBlank]"-->
                <!--                  option-label="label"-->
                <!--                  option-value="index"-->
                <!--                />-->
              </q-item>
              <q-item>
                <q-btn
                  dense
                  unelevated
                  label="Resumo"
                  icon-right="settings"
                  color="primary"
                  no-caps
                />
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>
    </div>
    <div>

    </div>
  </div>
</template>

<script src="./HeaderStep.ts" lang="ts"/>

<style lang="scss" scoped>

.connected {
  color: $tertiary !important;
}

.disconnected {
  color: $primary;
}

.step-header {
  .step-header__label {
    font-weight: 600;
    font-size: 16px;
  }
}
</style>
