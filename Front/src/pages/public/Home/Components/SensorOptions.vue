<template>
  <q-item
    class="item item__inactive"
    :class="{ connected: 'item__active' }"
    v-if="loaded"
  >
    <q-item-section class="col">
      <q-item-label>{{ sensor.nameSensor || "Sem nome" }}</q-item-label>
      <q-item-label caption>
        <a :href="`http://${sensor.ip}`" target="_blank">{{ sensor.ip }}</a>
      </q-item-label>
    </q-item-section>
    <q-form
      ref="mainForm"
      class="col form-lines form-lines__gap form-lines__gap-sm"
    >
      <q-select
        v-model="config.ssid"
        class="col"
        :options="config.wifiList"
        emit-value
        filled
        dense
        label="Lista de wi-fi disponiveis"
        option-label="ssid"
        option-value="ssid"
      />
      <q-input
        v-model="config.ssid"
        :rules="[$validators.notBlank]"
        class="row"
        dense
        filled
        label="SSID"
        type="text"
      />
      <q-input
        v-model="config.password"
        :rules="[$validators.notBlank]"
        class="row"
        dense
        filled
        label="Password"
        type="password"
      />
      <q-input
        v-model="config.backend"
        :rules="[$validators.notBlank]"
        class="row"
        filled
        dense
        label="Backend IP"
      />
      <q-input
        v-model="config.backendPort"
        :rules="[$validators.notBlank]"
        dense
        class="row"
        filled
        label="Backend Port"
      />
      <q-input
        v-model="config.nameSensor"
        :rules="[$validators.notBlank]"
        dense
        class="row"
        filled
        label="Backend Port"
      />
      <q-btn
        color="primary"
        label="Salvar"
        size="lg"
        dense
        unelevated
        @click="postSensorConfig"
        :loading="loading"
      />
    </q-form>
  </q-item>
</template>

<script src="./SensorOptions.js" />

<style lang="scss" scoped>
.item {
  display: flex;
  flex-direction: row;
  gap: 6px;
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
