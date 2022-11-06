<template>
  <div class="div-vc">
    <div class="chart" ref="eChart" id="eChart" />
  </div>
</template>

<script src="./TabGraph.js" />

<style lang="stylus" scoped>
.div-vc {
  height: 100%;
  width: 100%
  display: flex;
  justify-content: center;
  align-items: center;
}

.chart {
  width 100%;
  height calc(100vh - 250px)
}
</style>
