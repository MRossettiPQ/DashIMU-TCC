<template>
  <q-dialog ref="dialog" class="dialog" full-height full-width>
    <q-card class="column full-height dialog-card" v-if="dataLoaded">
      <dialog-header
        :id="id"
        :label-right-button="!$q.platform.is.mobile ? 'Fechar' : null"
        else-msg="Sem sessão"
        id-msg="Variability center of session nº"
      />
      <q-card-section class="col content-column">
        <Apexchart
          v-if="series[0].data.length"
          ref="graph"
          :series="graphData"
          :options="chartOptions"
          class="chart"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script src="./VariabilityCenter.js" />

<style lang="stylus" scoped>
.div-header
  width 100%
  display flex
  justify-content space-between

.chart
  width 100%
  height 100%
</style>
