<template>
  <div class="column justify-between">
    <div class="row justify-between w-100">
      <div class="step-header column">
        <span class="step-header__label">
          {{ syncSession.navigation.actualStepLabel }}
        </span>
        <running-info :session.sync="syncSession" />
      </div>

      <div>
        <div ref="htmlRef" class="row gap-4">
          <!--          <q-btn-->
          <!--            round-->
          <!--            dense-->
          <!--            unelevated-->
          <!--            icon="print"-->
          <!--            no-caps-->
          <!--            @click="syncSession.print()"-->
          <!--          />-->
          <q-btn
            v-if="syncSession.sockets.connected"
            round
            dense
            unelevated
            :loading="syncSession.sockets.loadingSensors"
            :icon="syncSession.sockets.loadingSensors ? '' : 'refresh'"
            @click="syncSession.sockets.requestAvailableSensors()"
          />
          <q-btn
            round
            unelevated
            :class="{
              connected: syncSession.sockets.connected,
              disconnected: !syncSession.sockets.connected,
            }"
            dense
            :icon="syncSession.sockets.connected ? 'sensors' : 'sensors_off'"
          />
          <q-btn round dense unelevated icon="settings" @click="toggleMenu()" />
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./HeaderStep.ts" lang="ts" />

<style lang="scss" scoped>
.command-menu {
  max-width: 210px;
  width: 100% !important;
}
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
