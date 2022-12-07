<template>
  <q-page class="home">
    <loading-screen v-if="fetchData.loading" />
    <error-screen v-else-if="fetchData.hasError"></error-screen>
    <div
      v-else-if="fetchData.result !== null"
      class="column justify-center content-center"
      style="gap: 12px"
    >
      <div class="flex justify-end">
        <q-btn
          class="row"
          color="primary"
          dense
          label="Recarregar lista"
          size="sm"
          @click="fetchData.loadAll()"
          :loading="fetchData.loading"
        />
      </div>
      <span class="col text-center">
        Para configurar os sensores para realizar as medições é necessário
        configurá los para sua rede wi-fi, conecte a rede wi-fi aberta geradas
        pelos sensores e no navegador siga para o endereço a seguir.
        <a href="http://192.168.4.1" target="_blank">Sensor manager</a>
      </span>
      <div class="ip">
        <span class="col text-center m-t-12">
          IP DO SERVIDOR PARA CONFIGURAR O SENSOR
        </span>
        <span
          v-if="fetchData?.result?.metadata"
          class="col text-black text-center"
          style="font-size: 36px; font-weight: bolder"
        >
          {{ fetchData?.result?.metadata?.socket_url }}
        </span>
      </div>
      <sensor-options :sensor="baseSensor" :connect-to-sensor="true" :suggestion="fetchData?.result?.metadata?.socket_url" />
      <div class="ip" v-if="fetchData?.result?.listSensor?.length">
        <span class="col text-center m-t-20 m-b-12">IP DOS SENSORES DISPONÍVEIS</span>
        <div
          v-for="(sensor, index) in fetchData?.result?.listSensor"
          :key="index"
        >
          <sensor-options :sensor="sensor" :connect-to-sensor="false" :suggestion="fetchData?.result?.metadata"/>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script src="./Home.js" />

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  padding: 16px;
  height: 100%;
}

.ip {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}
</style>
