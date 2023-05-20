<template>
  <q-item
    class="item item__inactive"
    :class="{ connected: 'item__active' }"
  >
    <div class="w-100">
      <div class="w-100 flex justify-center" v-if="loading">
        <q-spinner size="lg"/>
      </div>
      <div class="internal w-100" v-if="loaded">
        <q-item-section class="row">
          <q-item-label>{{ sensor.nameSensor || "Sem nome" }}</q-item-label>
          <q-item-label caption>
            <a :href="`http://${sensor.ip}`" target="_blank">{{ sensor.ip }}</a>
          </q-item-label>
          <div class="column" style="padding-top: 12px">
            <span>Roll: {{ measurement.Roll }}</span>
            <span>Pitch: {{ measurement.Pitch }}</span>
            <span>Yaw: {{ measurement.Yaw }}</span>
            <q-btn
              class="row"
              color="primary"
              dense
              label="Medição"
              size="sm"
              @click="getSensorMeasurement()"
              :loading="loadingMeasurement"
            />
          </div>
        </q-item-section>
        <q-form
          ref="mainForm"
          class="column w-100"
        >
          <div
            class="row w-100 items-end"
            style="display: flex ; flex-direction: row; gap: 12px"
          >
            <div
              class="col"
              style="display: flex ;flex-direction: column; gap: 12px; align-content: flex-end"
            >
<!--              <q-select-->
<!--                v-model="config.ssid"-->
<!--                class="w-100"-->
<!--                :options="config.wifiList"-->
<!--                emit-value-->
<!--                filled-->
<!--                dense-->
<!--                label="Lista de wi-fi disponiveis"-->
<!--                option-label="ssid"-->
<!--                option-value="ssid"-->
<!--                @input="changeSSID()"-->
<!--              />-->
              <q-input
                v-model="config.ssid"
                :rules="[$validators.notBlank]"
                class="w-100"
                dense
                filled
                label="SSID"
                type="text"
              />
            </div>
            <div
              class="col"
              style="height: 60px"
            >
              <q-input
                v-model="config.password"
                :rules="[$validators.notBlank]"
                class="row w-100"
                dense
                filled
                label="SSID"
                type="password"
              />
            </div>
          </div>
          <div class="row w-100" style="display: flex ; flex-direction: row; gap: 12px">
            <q-input
              v-model="config.backend"
              :rules="[$validators.notBlank]"
              class="col"
              :placeholder="suggestion.url"
              filled
              dense
              label="Backend IP"
            />
            <q-input
              v-model="config.backendPort"
              :rules="[$validators.notBlank]"
              dense
              class="col"
              :placeholder="suggestion.port"
              filled
              label="Backend Port"
            />
          </div>
          <q-input
            v-model="config.nameSensor"
            :rules="[$validators.notBlank]"
            dense
            class="row"
            filled
            label="Nome do sensor"
          />
          <q-btn
            color="primary"
            label="Salvar"
            size="sm"
            dense
            unelevated
            @click="postSensorConfig"
            :loading="loadingSave"
          />
        </q-form>
      </div>
      <div
        class="w-100 flex justify-center items-center"
        style="vertical-align: center; height: 100%; font-weight: 600"
        v-if="!loading && !loaded && connectToSensor"
      >
        <span class="text-center">Não está conectado a rede de um sensor</span>
      </div>
    </div>
  </q-item>
</template>

<script src="./SensorOptions.js"/>

<style lang="scss" scoped>
.internal {
  display: grid;
  grid-template-columns: min-content 1fr;
  width: 100%;
  gap: 12px
}

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
