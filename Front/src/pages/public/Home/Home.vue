<template>
  <q-page class="home">
    <loading-screen v-if="fetchData.loading" />
    <error-screen v-else-if="fetchData.hasError"></error-screen>
    <div
      v-else-if="fetchData.result !== null"
      class="column justify-center content-center"
    >
      <span class="col text-center">
        Para configurar os sensores para realizar as medições é necessário
        configurá los para sua rede wi-fi, conecte a rede wi-fi aberta geradas
        pelos sensores e no navegador siga para o endereço a seguir.
        <a href="http://192.168.4.1" target="_blank">Sensor manager</a>
      </span>
      <div class="ip">
        <span class="col text-center m-t-25">
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
      <sensor-options :sensor="sensor" :connect-to-sensor="true" />
      <div class="ip" v-if="fetchData?.result?.listSensor?.length">
        <span class="col text-center m-t-25">IP DOS SENSORES DISPONÍVEIS</span>
        <div
          v-for="(sensor, index) in fetchData?.result?.listSensor"
          :key="index"
        >
          <sensor-options :sensor="sensor" />
        </div>
        <!--        <span-->
        <!--          v-for="(sensor, index) in fetchData?.result?.listSensor"-->
        <!--          :key="index"-->
        <!--          class="col text-black text-center"-->
        <!--          style="font-size: 36px; font-weight: bolder"-->
        <!--        >-->
        <!--          {{ sensor.nameSensor }} - -->
        <!--          <a :href="`http://${sensor.ip}`" target="_blank">{{ sensor.ip }}</a>-->
        <!--        </span>-->
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
