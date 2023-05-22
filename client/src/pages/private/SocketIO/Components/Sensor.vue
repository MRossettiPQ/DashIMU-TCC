<template>
  <q-card bordered flat class="col p-8 flex">
    <div class="col column">
      <span>Sensor {{ order }}</span>
      <span>Nome: {{ syncSensor.sensorName }}</span>
      <span>Disponível: {{ syncSensor.available }}</span>
      <span>Ip: {{ syncSensor.ip }}</span>
      <span v-if="syncSensor.size > 0">Medições armazenadas: {{ syncSensor.size }}</span>
      <q-select
        v-model="syncSensor.position"
        class="col"
        :options="syncSession.bean.procedurePositionsWithMoreOptions"
        emit-value
        borderless
        dense
        :label="$t('session.positions')"
        :rules="[$validators.notBlank]"
        hint="Não pode ser nulo"
        option-label="label"
        option-value="value"
      />
    </div>

    <div class="flex column m-l-0 gap-4">
      <q-badge
        rounded
        :color="syncSensor.available ? 'green' : 'red'"
        :label="syncSensor.available ? 'conectado' : 'disponível'"
      />
      <q-btn
        dense
        flat
        icon="done"
        color="primary"
        :disable="syncSensor.connected"
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
      <q-btn dense flat icon="more_vert" color="primary" :disable="!syncSensor.connected">
        <q-menu fit>
          <q-list class="column" style="min-width: 100px; gap: 6px">
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

<script src="./Sensor.js"/>

<style lang="scss" scoped>

</style>
