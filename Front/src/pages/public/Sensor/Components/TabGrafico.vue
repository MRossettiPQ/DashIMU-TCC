<template>
  <div class="column">
    <div class="text-h6">{{ label }}</div>
    <div class="row">
      <apexchart
        class="grafico"
        type="line"
        :options="options"
        :series="data"
      />
    </div>
  </div>
</template>

<script src="./TabGrafico.js" />

<style lang="stylus" scoped>
.grafico
  width 100%
  height 100%
</style>
