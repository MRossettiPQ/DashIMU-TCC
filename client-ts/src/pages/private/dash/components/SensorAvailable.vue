<template>
  <q-card flat bordered class="p-8 w-100">
    <!--    <span>{{ sensorSync }}</span>-->
    <div v-if="loading" class="w-100 flex justify-center">
      <q-spinner size="lg"/>
    </div>
    <div v-else-if="loaded" class="column w-100 gap-4">
      <div class="row w-100 justify-between">
        <span class="f-bold">{{ sensorSync.sensorName || "Sem nome" }}</span>
        <span class="f-bold">
            <a :href="`http://${sensorSync.ip}`" target="_blank">{{ sensorSync.ip }}</a>
        </span>
      </div>
      <q-separator size="lg"/>
      <div class="row gap-8">
        <div class="row">
          <div class="column h-100 justify-between">
            <span class="f-bold">Medições</span>
            <div class="column ">
              <span>Roll: {{ measurement.Roll }}</span>
              <span>Pitch: {{ measurement.Pitch }}</span>
              <span>Yaw: {{ measurement.Yaw }}</span>
            </div>
            <q-btn
              color="primary"
              dense
              label="Medição"
              size="sm"
              @click="getSensorMeasurement()"
              :loading="loadingMeasurement"
            />
          </div>
        </div>
        <q-form
          ref="mainForm"
          class="col column w-100 gap-8"
          greedy
        >
          <span class="f-bold">Config</span>
          <div class="form-column gap-8">
            <q-input
              v-model="config.ssid"
              :rules="[$rules.notBlank]"
              dense
              outlined
              label="SSID"
              type="text"
            />
            <q-input
              v-model="config.password"
              :rules="[$rules.notBlank]"
              dense
              outlined
              label="Password"
              type="password"
            />
          </div>
          <div class="form-column gap-8">
            <q-input
              v-model="config.backend"
              :rules="[$rules.notBlank]"
              :placeholder="suggestion.url"
              outlined
              dense
              label="Backend IP"
            />
            <q-input
              v-model="config.backendPort"
              :rules="[$rules.notBlank]"
              dense
              :placeholder="suggestion.port"
              outlined
              label="Backend Port"
            />
          </div>
          <q-input
            v-model="config.sensorName"
            :rules="[$rules.notBlank]"
            dense
            outlined
            label="Nome do sensor"
          />
          <q-btn
            color="primary"
            label="Configurar"
            size="sm"
            dense
            unelevated
            @click="postSensorConfig"
            :loading="loadingSave"
          />
        </q-form>
      </div>
    </div>
    <div v-if="!loaded && !loading" class="column">
      <span class="text-center f-bold ">Não está conectado a rede de um sensor</span>
    </div>
  </q-card>
</template>

<script lang="ts" src="./SensorAvailable.ts"/>

<style lang="scss" scoped>

</style>
