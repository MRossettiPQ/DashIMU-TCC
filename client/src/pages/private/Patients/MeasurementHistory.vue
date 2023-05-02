<template>
  <q-dialog no-refocus ref="dialog" class="dialog" full-height full-width>
    <q-card class="column full-height dialog-card">
      <dialog-header :id="id" :label-right-button="!isMobile ? 'Fechar' : null" else-msg="Sem sessão" id-msg="Medição nº" />
      <loading-screen v-if="fetchData.loading" />
      <error-screen v-else-if="fetchData.hasError" />
      <q-card-section v-else-if="fetchData.result !== null" style="padding: 0 12px 12px 12px !important">
        <result-chart-screen :result="fetchData.result.procedure" :loading="fetchData.loading" :session-id="id" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script src="./MeasurementHistory.js" />

<style lang="scss" scoped>
.run-procedure {
  display: grid;
  grid-template-columns: min-content 1fr;
  height: 100%;
  width: 100%;
}
</style>
