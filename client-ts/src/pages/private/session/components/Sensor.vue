<template>
  <q-card bordered flat class="row w-100 p-8 flex">
    <div class="col column gap-4">
      <span>Sensor {{ order }}</span>
      <span>Nome: {{ syncSensor.sensorName }}</span>
      <span>Id: {{ syncSensor.sensorSocketId }}</span>
      <span v-if="syncSensor.size > 0">
        Medições armazenadas: {{ syncSensor.size }}
      </span>
      <q-select
        v-model="syncSensor.position"
        :options="syncSession.bean.procedurePositionsWithMoreOptions"
        emit-value
        outlined
        dense
        :label="$t('session.positions')"
        :rules="[
          $rules.notBlankIf(syncSensor.inThisRoom),
          positionValidator(syncSensor),
        ]"
        option-label="label"
        option-value="value"
      />
    </div>

    <div class="flex column m-l-0 gap-4">
      <q-badge
        rounded
        :color="
          syncSensor.connected ? 'blue' : syncSensor.available ? 'green' : 'red'
        "
        :label="
          syncSensor.connected
            ? 'nesta sessão'
            : syncSensor.available
            ? 'disponível'
            : 'indisponível'
        "
      />
      <q-btn
        dense
        flat
        icon="done"
        color="primary"
        :disable="!syncSensor.available"
        aria-label="Conectar"
        round
        @click="syncSensor.connect()"
      />
      <q-btn
        dense
        flat
        icon="close"
        color="primary"
        :disable="!syncSensor.connected"
        round
        @click="syncSensor.disconnect()"
      />
      <q-btn
        dense
        flat
        icon="more_vert"
        color="primary"
        :disable="!syncSensor.connected"
      >
        <q-menu fit>
          <q-list class="column gap-8">
            <q-btn
              v-for="(option, indexOption) in menuSensor"
              :key="indexOption"
              dense
              flat
              :icon="option.icon"
              :label="option.label"
              color="primary"
              :disable="!syncSensor.connected"
              @click="syncSensor.calibrate()"
            />
          </q-list>
        </q-menu>
      </q-btn>
    </div>
  </q-card>
</template>

<script src="./Sensor.ts" lang="ts" />

<style lang="scss" scoped></style>
