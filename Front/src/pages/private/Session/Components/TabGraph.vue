<template>
  <div class="col">
    <div class="row">
      <apexchart
        :options="chartOptions"
        :series="graphData"
        class="chart"
        type="line"
      />
    </div>
  </div>
</template>

<script src="./TabGraph.js" />

<style lang="stylus" scoped>
.chart
  width 100%
  height 100%
</style>
