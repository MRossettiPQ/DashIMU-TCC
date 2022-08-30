<template>
  <div class="column">
    <div class="text-h6">{{ label }}</div>
    <div class="row">
      <apexchart
        :options="options"
        :series="data"
        class="grafico"
        type="line"
      />
    </div>
  </div>
</template>

<script src="./TabGraph.js" />

<style lang="stylus" scoped>
.grafico
  width 100%
  height 100%
</style>
