<template>
  <div class="column h-100 w-100">
    <div id="chart" ref="chart" class="vue-chart"/>
  </div>
</template>

<script src="./VEChart.js" />

<style lang="stylus" scoped>
.vue-chart {
  height: 100%;
  width: 100%;
  max-width: calc(100% - 10px);
  overflow-y: clip
}
</style>
