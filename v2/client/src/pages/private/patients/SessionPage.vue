<template>
  <q-dialog no-refocus ref="dialog" full-height full-width>
    <q-card class="column">
      <dialog-header
        :id="id"
        :label-right-button="!isMobile ? 'Fechar' : null"
        id-msg="Medição nº"
        else-msg="Sem sessão"
      />
      <loading-screen v-if="fetchData.loading"/>
      <error-screen v-else-if="fetchData.hasError"/>
      <span>{{ fetchData.result }}</span>

    </q-card>
  </q-dialog>
</template>

<script src="./SessionPage.ts" lang="ts"/>

<style scoped>

</style>
