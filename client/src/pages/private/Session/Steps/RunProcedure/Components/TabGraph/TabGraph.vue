<template>
  <div class="column h-100 w-100">
    <div class="column h-100 w-100 div-vc">
      <div id="eChart" ref="eChart" class="chart" />
    </div>
  </div>
</template>

<script src="./TabGraph.js" />

<style lang="scss" scoped>
.div-vc {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .chart {
    height: calc(100vh - 205px);
    width: 100%;
  }
}
</style>
