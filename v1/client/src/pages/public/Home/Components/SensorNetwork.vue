<template>
  <q-card bordered flat class="p-8 column">
    <span class="text-center w-100">
      Para configurar os sensores para realizar as medições é necessário configurá los para sua rede wi-fi, conecte a rede wi-fi aberta geradas pelos sensores e no navegador siga para o endereço a
      seguir.
      <a href="http://192.168.4.1" target="_blank">Sensor manager.</a>
    </span>
    <span class="col text-center m-t-12"> IP DO SERVIDOR PARA CONFIGURAR O SENSOR </span>
    <span v-if="metadata?.socket_url" class="col text-black text-center f-xlarge" style="font-weight: bolder">
      {{ metadata?.socket_url }}
    </span>
  </q-card>
</template>

<script src="./SensorNetwork.js" />

<style lang="scss" scoped></style>
