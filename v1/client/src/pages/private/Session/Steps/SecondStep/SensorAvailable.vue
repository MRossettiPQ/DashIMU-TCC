<template>
  <q-card
    bordered
    flat
    class="p-12 gap-8 column item__inactive sensor"
    :class="{ connected: 'item__active' }"
  >
    <div class="row no-wrap gap-8 w-100 justify-between">
      <span v-if="connected">Conectado</span>
      <span class="f-bold">{{ sensor.sensorName || 'Sem nome' }}</span>
      <span class="f-bold">
        <a :href="`http://${sensor.ip}`" target="_blank">{{ sensor.ip }}</a>
      </span>
    </div>
    <q-separator size="lg" />
    <div class="row w-100 justify-between gap-8">
      <div class="column gap-8">
        <span>{{ sensor.ip }}</span>
        <span v-if="measurementNumber > 0"> Medições armazenadas: {{ measurementNumber }} </span>
        <q-select
          v-if="connected"
          v-model="sensor.position"
          class="col"
          :options="syncedSession.getPositions"
          emit-value
          borderless
          dense
          :label="$t('session.positions')"
          :rules="[$validators.notBlank]"
          option-label="label"
          option-value="value"
        />
      </div>
      <div class="column">
        <q-btn
          dense
          flat
          icon="done"
          color="primary"
          :disable="connected"
          aria-label="Conectar"
          @click="connect"
        />
        <q-btn dense flat icon="close" color="primary" :disable="!connected" @click="disconnect" />
      </div>
    </div>
  </q-card>
</template>

<script src="./SensorAvailable.js" />
<style lang="scss" scoped>
.sensor {
  flex: 1;
  flex-basis: 270px;
}

.item {
  .menu {
    display: flex;
    align-items: flex-end;
  }

  &__inactive {
    border-color: black;
    border-style: dashed;
  }

  &__active {
    border-color: $primary !important;
    border-style: solid !important;
  }
}
</style>
