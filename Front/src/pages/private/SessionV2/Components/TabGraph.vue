<template>
  <div class="div-vc" v-if="graphDataLength">
    <span>teste</span>
    <div class="col chart" ref="eChart" id="eChart"></div>
  </div>
</template>

<script src="./TabGraph.js" />

<style lang="stylus" scoped>

.div-vc
  display grid

.chart
  width 100%
  height 580px
</style>
