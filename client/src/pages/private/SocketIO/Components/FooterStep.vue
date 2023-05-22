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

    <q-btn-group
      v-if="syncSession.showCommandMenu"
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
        :disable="syncSession.disableStartBtn"
      >
        <q-menu fit>
          <q-list>
            <q-item>
              <q-form
                ref="mainForm"
                class="column form-lines form-lines__gap-sm"
                greedy
              >
<!--                <q-checkbox-->
<!--                  v-model="sessionConnection.useAlarm"-->
<!--                  :disable="sessionConnection.disableStartBtn"-->
<!--                  label="Usar limitador"-->
<!--                />-->
<!--                <q-input-->
<!--                  v-model="sessionConnection.alarmTime"-->
<!--                  :disable="sessionConnection.disableStartBtn"-->
<!--                  class="col"-->
<!--                  :rules="[$validators.notBlank]"-->
<!--                  filled-->
<!--                  label="Tempo máximo"-->
<!--                  suffix="segundos"-->
<!--                />-->
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
                :disable="syncSession.disableStartBtn"
                @click="syncSession.start()"
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
<!--      <q-btn-->
<!--        dense-->
<!--        color="primary"-->
<!--        size="md"-->
<!--        icon="done"-->
<!--        round-->
<!--        unelevated-->
<!--        :disable="disableAddMeasurement"-->
<!--        @click="addMeasurement()"-->
<!--      >-->
<!--        <q-tooltip>Concluir movimento</q-tooltip>-->
<!--      </q-btn>-->
    </q-btn-group>

    <q-btn
      dense
      round
      color="primary"
      :loading="syncSession.loading"
      :disable="syncSession.disableNext"
      :icon="syncSession.navigation.actualNextIcon"
      @click="syncSession.navigation.next()"
    />
  </div>
</template>

<script src="./FooterStep.js" />

<style lang="scss"  scoped>

</style>
