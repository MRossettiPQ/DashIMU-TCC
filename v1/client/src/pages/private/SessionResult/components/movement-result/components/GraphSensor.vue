<template>
  <div class="column h-100 w-100 no-wrap">
    <span class="text-center f-bold">Gráfico dos sensores</span>
    <chart-visualizer :sensors="sensors" :table-columns="columns" :smooth="true" />
  </div>
</template>

<script src="./GraphSensor.js" />

<style lang="scss" scoped></style>
