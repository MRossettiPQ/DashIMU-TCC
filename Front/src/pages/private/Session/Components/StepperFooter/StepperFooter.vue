<template>
  <div class="w-100 row navigation-footer">
    <q-btn
      class="row"
      dense
      round
      color="primary"
      :disable="disablePrevButton"
      icon="arrow_back_ios_new"
      @click="navigation.prev()"
    />

    <q-btn-group
      v-if="navigation?.actualStepValue === 'run-procedure'"
      rounded
      flat
    >
      <q-btn
        dense
        color="primary"
        size="md"
        unelevated
        round
        icon="play_arrow"
        :disable="sessionConnection.disableStartBtn"
        @click="sessionConnection.start()"
      />
      <q-btn
        dense
        color="primary"
        size="md"
        round
        icon="alarm"
        unelevated
        :disable="sessionConnection.disableStartBtn"
      >
        <q-menu fit>
          <q-list style="min-width: 100px">
            <q-item>
              <q-form
                ref="mainForm"
                class="column form-lines form-lines__gap-sm"
                greedy
              >
                <q-checkbox
                  v-model="sessionConnection.useAlarm"
                  :disable="sessionConnection.disableStartBtn"
                  label="Usar limitador"
                />
                <q-input
                  v-model="sessionConnection.alarmTime"
                  :disable="sessionConnection.disableStartBtn"
                  class="col"
                  :rules="[$validators.notBlank]"
                  filled
                  label="Tempo máximo"
                  suffix="segundos"
                />
              </q-form>
            </q-item>
            <q-item>
              <q-btn
                class="col"
                dense
                color="primary"
                size="md"
                unelevated
                icon="play_arrow"
                :disable="sessionConnection.disableStartBtn"
                @click="sessionConnection.start()"
              />
            </q-item>
          </q-list>
        </q-menu>
        <q-tooltip> Temporizador</q-tooltip>
      </q-btn>
      <q-btn
        dense
        color="primary"
        size="md"
        icon="stop"
        round
        unelevated
        :disable="sessionConnection.disableStopBtn"
        @click="sessionConnection.stop()"
      />
      <q-btn
        dense
        color="primary"
        size="md"
        round
        icon="restart_alt"
        unelevated
        :disable="sessionConnection.disableRestartBtn"
        @click="sessionConnection.restart()"
      >
        <q-tooltip v-if="!sessionConnection.disableRestartBtn">
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
        :disable="disableAddMeasurement"
        @click="addMeasurement()"
      >
        <q-tooltip>Concluir movimento</q-tooltip>
      </q-btn>
    </q-btn-group>

    <q-btn
      class="row"
      dense
      round
      color="primary"
      :loading="loadingSave"
      :disable="disableNextButton"
      :icon="
        navigation?.actualStepValue !== 'run-procedure'
          ? 'arrow_forward_ios'
          : 'save'
      "
      @click="navigation.next()"
    />
  </div>
</template>

<script src="./StepperFooter.js" />

<style lang="scss" scoped>
.navigation-footer {
  display: flex;
  justify-content: space-between;
}
</style>
