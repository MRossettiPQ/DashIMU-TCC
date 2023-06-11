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

    <q-btn-group v-if="navigation?.actualStepValue === 'third-step'" rounded flat>
      <q-btn
        dense
        color="primary"
        size="md"
        unelevated
        round
        icon="play_arrow"
        :disable="connection.disableStartBtn"
        @click="connection.start()"
      />
      <q-btn
        dense
        color="primary"
        size="md"
        round
        icon="alarm"
        unelevated
        :disable="connection.disableStartBtn"
      >
        <q-menu fit>
          <q-list style="min-width: 100px">
            <q-item>
              <q-form ref="mainForm" class="column form-lines form-lines__gap-sm" greedy>
                <q-checkbox
                  v-model="connection.useAlarm"
                  :disable="connection.disableStartBtn"
                  label="Usar limitador"
                />
                <q-input
                  v-model="connection.alarmTime"
                  :disable="connection.disableStartBtn"
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
                :disable="connection.disableStartBtn"
                @click="connection.start()"
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
        :disable="connection.disableStopBtn"
        @click="connection.stop()"
      />
      <q-btn
        dense
        color="primary"
        size="md"
        round
        icon="restart_alt"
        unelevated
        :disable="connection.disableRestartBtn"
        @click="connection.restart()"
      >
        <q-tooltip v-if="!connection.disableRestartBtn">
          Reiniciar medições, apaga as medições que não foram adicionadas ao movimento
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
      :icon="navigation?.actualStepValue !== 'third-step' ? 'arrow_forward_ios' : 'save'"
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
