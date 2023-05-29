<template>
  <q-page class="flex column p-8 div-session">
    <loading-screen v-if="fetchData.loading" />
    <error-screen v-else-if="fetchData.hasError" />
    <q-card
      bordered
      flat
      v-else-if="fetchData.result !== null && sessionControl.backEndSocket.connected"
      class="gap-4 h-100 w-100 p-8 div-component"
    >
      <header-step
        :session.sync="sessionControl"
      />

      <div class="scroll">
        <transition name="slide-fade" mode="out-in">
          <Component
            :is="sessionControl.navigation.actualStepValue"
            :session.sync="sessionControl"
          />
        </transition>
      </div>

      <footer-step
        :session.sync="sessionControl"
      />
    </q-card>
    <q-card bordered flat v-else-if="fetchData.result !== null && !sessionControl.backEndSocket.connected" class="gap-4 h-100 w-100 p-8">
      <span>Não está conectado ao servidor</span>
    </q-card>
  </q-page>
</template>

<script lang="ts" src="./SessionPage.ts" />

<style lang="scss" scoped>
.div-session {
  height: 100%;
  width: 100%;
  max-width: 100vw;
  max-height: 100vh;

  .div-component {
    display: grid;
    grid-template-rows: min-content 1fr min-content;
  }
}
</style>
