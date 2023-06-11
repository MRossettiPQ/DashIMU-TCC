<template>
  <q-page class="flex column p-8 div-session">
    <loading-screen v-if="fetchData.loading" />
    <error-screen v-else-if="fetchData.hasError" />
    <q-card
      bordered
      flat
      v-else-if="fetchData.hasResult && sessionControl.sockets.connected"
      class="gap-4 h-100 w-100 p-8 div-component"
    >
      <header-step :session.sync="sessionControl" :menu.sync="rightDrawer" />

      <div class="scroll">
        <q-drawer
          ref="menuRef"
          behavior="mobile"
          bordered
          :value="rightDrawer"
          side="right"
          @hide="rightDrawer = false"
          overlay
          content-class="bg-grey-1 column justify-between no-wrap"
        >
          <right-menu :session.sync="sessionControl" />
        </q-drawer>
        <q-form ref="refForm" greedy class="h-100">
          <transition name="slide-fade" mode="out-in">
            <Component
              :is="sessionControl.navigation.actualStepValue"
              :session.sync="sessionControl"
            />
          </transition>
        </q-form>
      </div>

      <footer-step :session.sync="sessionControl" :ref-form.sync="refForm" />
    </q-card>
    <q-card
      bordered
      flat
      v-else-if="fetchData.hasResult && !sessionControl.sockets.connected"
      class="gap-4 h-100 w-100 p-8"
    >
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
