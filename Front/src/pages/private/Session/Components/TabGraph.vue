<template>
  <div class="div-vc">
    <div class="chart" ref="eChart" id="eChart" />
  </div>
</template>

<script src="./TabGraph.js" />

<style lang="stylus" scoped>
.div-vc {
  display: flex;
}

.chart {
  width 100%;
  height calc(100vh - 450px)
  //height: calc(100vh - 400px);
}
</style>
