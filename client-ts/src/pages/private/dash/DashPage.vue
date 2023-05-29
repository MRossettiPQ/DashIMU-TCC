<template>
  <div class="p-8 h-100 w-100 ">
    <loading-screen v-if="fetchData.loading"/>
    <error-screen v-else-if="fetchData.hasError"/>
    <q-card v-else-if="!fetchData.isNull" bordered flat class="column h-100 p-8 gap-4">
      <div class="flex justify-between w-100 p-r-4">
        <span class="text-center f-bold">PAINEL DE CONFIGURAÇÃO</span>
        <q-btn
          icon-right="refresh"
          color="primary"
          dense
          label="Lista"
          size="sm"
          @click="fetchData.fetchAll()"
          :loading="fetchData.loading"
        />
      </div>
      <div class="col column h-100 overflow-auto gap-8 p-r-4">
        <sensor-network :metadata="fetchData?.result?.metadata"/>
        <div class="column col no-wrap h-100 gap-8">
          <span class="text-center f-bold">PARA CONFIGURAR</span>
          <sensor-available
            :sensor.sync="baseSensor"
            :suggestion="fetchData.result?.metadata"
            :init="true"
          />
          <span class="text-center f-bold">IP DOS SENSORES DISPONÍVEIS</span>
          <div class=" column col no-wrap h-100">
            <sensor-available
              v-for="(sensor, index) in fetchData.result?.listSensor"
              :key="index"
              :sensor.sync="fetchData.result.listSensor[index]"
              :suggestion="fetchData.result?.metadata"
            />
          </div>
        </div>
      </div>
    </q-card>
  </div>
</template>

<script lang="ts" src="./DashPage.ts"/>

<style lang="scss" scoped>

</style>
