<template>
  <div class="h-100 w-100 flex column gap-4">
    <div class="column p-b-16 gap-4">
      <span> Mínimo de sensores: {{ syncSession.bean.minSensor }} </span>
      <span>
        Sensores conectados: {{ syncSession.numberOfValidConnection }}
      </span>
    </div>
    <div  class="col w-100 scroll">
      <sensor
        v-for="(p, index) in syncSession.backEndSocket.availableSensorsList"
        :key="index"
        :socket.sync="syncSession.backEndSocket"
        :sensor.sync="syncSession.backEndSocket.availableSensorsList[index]"
        :session.sync="syncSession"
        :order="index"
      />
    </div>
  </div>
</template>

<script src="./SecondStep.ts" lang="ts"/>

<style lang="scss" scoped>

</style>
