<template>
  <div class="row justify-between">
    <q-btn
      dense
      round
      color="primary"
      :disable="syncSession.disablePrev"
      icon="arrow_back_ios_new"
      @click="syncSession.navigation.prev()"
    />

    <div v-if="syncSession.showCommandMenu">
      <q-btn-group rounded flat>
        <q-btn
          dense
          color="primary"
          size="md"
          unelevated
          round
          icon="play_arrow"
          :disable="syncSession.disableStartBtn"
          @click="syncSession.start()"
        />
        <q-btn
          dense
          color="primary"
          size="md"
          round
          icon="alarm"
          unelevated
          :disable="!syncSession.alarmTimer || syncSession.disableStartBtn"
          @click="menuRef.toggle()"
        />
        <q-btn
          dense
          color="primary"
          size="md"
          icon="stop"
          round
          unelevated
          :disable="syncSession.disableStopBtn"
          @click="syncSession.stop()"
        />
        <q-btn
          dense
          color="primary"
          size="md"
          round
          icon="restart_alt"
          unelevated
          :disable="syncSession.disableRestartBtn"
          @click="syncSession.restart()"
        >
          <q-tooltip v-if="!syncSession.disableRestartBtn">
            Reiniciar medições, apaga as medições que não foram adicionadas ao
            movimento
          </q-tooltip>
        </q-btn>
        <q-btn
          dense
          color="primary"
          size="md"
          icon="done"
          round
          unelevated
          :disable="syncSession.disableAddMeasurement"
          @click="addMeasurement()"
        />
      </q-btn-group>
      <q-popup-proxy ref="menuRef" :value="expanded" no-parent-event>
        <q-form
          ref="mainForm"
          class="column form-lines p-16 command-menu"
          greedy
        >
          <q-checkbox
            v-model="syncSession.useAlarm"
            :disable="syncSession.disableStartBtn"
            label="Usar limitador"
          />
          <div class="p-h-8 form-lines gap-4">
            <q-input
              type="number"
              v-model="syncSession.alarmTimer"
              :disable="!syncSession.alarmTimer || syncSession.disableStartBtn"
              :rules="[$rules.notBlankIf(syncSession.useAlarm)]"
              outlined
              dense
              label="Tempo máximo"
              suffix="segundos"
            />
            <q-btn
              dense
              color="primary"
              size="md"
              unelevated
              icon="play_arrow"
              :disable="syncSession.disableStartBtn"
              @click="syncSession.start()"
            />
          </div>
        </q-form>
        <q-tooltip> Temporizador</q-tooltip>
      </q-popup-proxy>
    </div>

    <q-btn
      dense
      round
      color="primary"
      :loading="syncSession.loading"
      :disable="syncSession.disableNext"
      :icon="syncSession.navigation.actualNextIcon"
      @click="syncSession.navigation.next(syncRefForm)"
    />
  </div>
</template>

<script src="./FooterStep.ts" lang="ts" />

<style lang="scss" scoped>
.command-menu {
  max-width: 193px;
  width: 100% !important;
}
</style>
