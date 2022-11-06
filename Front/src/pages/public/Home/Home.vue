<template>
  <q-page class="home">
    <div class="column justify-center content-center" v-if="metadata !== null">
      <span class="col text-center">
        Para configurar os sensorer para realizar as medições é necessario
        configurá los para sua rede wi-fi, conecte a rede wi-fi aberta geradas
        pelos sensorer e no navegador siga para o endereço a seguir.
        <a href="http://192.168.4.1" target="_blank">Sensor manager</a>
      </span>
      <div class="ip">
        <span class="col text-center m-t-25">IP SERVIDOR PARA O SENSOR</span>
        <span
          class="col text-black text-center"
          style="font-size: 36px; font-weight: bolder"
        >
          {{ metadata.socket_url }}
        </span>
      </div>
      <div class="ip">
        <span class="col text-center m-t-25">IP SERVIDOR PARA O SENSOR</span>
        <span
          v-for="(sensor, index) in listSensor"
          :key="index"
          class="col text-black text-center"
          style="font-size: 36px; font-weight: bolder"
        >
          <a :href="`http://${sensor.ip}`" target="_blank">{{ sensor.ip }}</a>
        </span>
      </div>
    </div>
  </q-page>
</template>

<script src="./Home.js" />

<style lang="stylus" scoped>
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
