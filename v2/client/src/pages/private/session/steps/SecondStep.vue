<template>
  <div class="h-100 w-100 flex column gap-4 no-wrap">
    <div class="w-100 column p-b-16 gap-4">
      <span> Mínimo de sensores: {{ syncSession.bean.minSensorText }} </span>
      <span>
        Sensores conectados: {{ syncSession.numberOfValidConnection }}
      </span>
    </div>
    <div class="w-100 scroll column gap-4 h-100 no-wrap">
      <sensor
        v-for="(p, index) in syncSession.sockets.availableSensorsList"
        :key="index"
        :socket.sync="syncSession.sockets"
        :sensor.sync="syncSession.sockets.availableSensorsList[index]"
        :session.sync="syncSession"
        :order="index"
      />
    </div>
  </div>
</template>

<script src="./SecondStep.ts" lang="ts" />

<style lang="scss" scoped></style>
