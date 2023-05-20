<template>
  <q-card bordered flat class="column p-8">
    <span>Sensor {{ order }}</span>
    <span>Nome: {{ syncSensor.nameSensor }}</span>
    <span>Disponivel: {{ syncSensor.available }}</span>
    <span>Ip: {{ syncSensor.ip }}</span>
    <span v-if="measurementNumber > 0">Medições armazenadas: {{ measurementNumber }}</span>
    <q-select
      v-model="syncSensor.position"
      class="col"
      :options="syncSensor?.getPositions"
      emit-value
      borderless
      dense
      :label="$t('session.positions')"
      :rules="[$validators.notBlank]"
      hint="Não pode ser nulo"
      option-label="label"
      option-value="value"
      @input="(value) => update(value)"
    />

    <div class="col m-l-0">
      <q-btn
        dense
        flat
        icon="done"
        color="primary"
        :disable="connected"
        aria-label="Conectar"
        round
        @click="connect"
      />
      <q-btn
        dense
        flat
        icon="close"
        color="primary"
        :disable="!connected"
        round
        @click="disconnect"
      />
      <q-btn dense flat icon="more_vert" color="primary" :disable="!connected">
        <q-menu>
          <q-list class="column" style="min-width: 100px; gap: 6px">
            <q-btn
              v-for="(option, indexOption) in menuSensor"
              :key="indexOption"
              dense
              flat
              :icon="option.icon"
              :label="option.label"
              color="primary"
              :disable="!connected"
              @click="calibrate"
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
