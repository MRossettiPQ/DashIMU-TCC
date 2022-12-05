<template>
  <q-item class="item item__inactive" :class="{ connected: 'item__active' }">
    <q-item-section class="col">
      <q-item-label>{{ nameSensor }}</q-item-label>
      <q-item-label caption>
        {{ sensor.ip }}
      </q-item-label>
      <q-item-label v-if="measurementNumber > 0">
        Medições armazenadas: {{ measurementNumber }}
      </q-item-label>
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
    </q-item-section>
    <q-item-section class="col menu" style="margin-left: 0px !important">
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
    </q-item-section>
  </q-item>
</template>

<script src="./SensorAvailable.js" />
<style lang="scss" scoped>
.item {
  display: flex;
  flex-direction: row;
  gap: 6px;
  height: 160px;
  border-radius: 12px;
  border-width: 1px;

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
