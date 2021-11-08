<template>
  <section name="sensor" class="responsive-height">
    <div class="row responsive-content grid-tela">
      <div class="col "/>
      <div class="col">
        <h2>Vue.js WebSocket Tutorial</h2>
        <!--        <button v-on:click="sendMessage('hello')">Send Message</button>-->
        <q-input
            filled
            label="IP Sensor 1"
            type="text"
            v-model="sensores[0].sensor.ip"
            class="col"
        />


        <div class="flex justify-between">
          <q-btn
              color="primary"
              unelevated
              label="Conectar"
              class="row btn"
              size="lg"
              @click="conectaSensor(0)"
          />

          <q-btn
              color="primary"
              unelevated
              label="Enviar msg"
              class="row btn"
              size="lg"
              @click="sendMessage('teste', 0)"
          />
        </div>

        <div class="scrollable overflow-auto flex-grow-1 flex-shrink-0">
          <div class="m-t-8" v-for="(lista, index) in sensores[0].tabela" :key="index">
            {{lista.tabela}}
          </div>
        </div>
      </div>
      <div class="col "/>
    </div>
  </section>
</template>

<script src="./WebSocket.js"/>

<style lang="stylus" scoped>

</style>