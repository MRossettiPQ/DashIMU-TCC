<template>
  <div ref="chartVisualizer" class="h-100 w-100 p-relative overflow-auto">
    <div v-show="numberOfMeasurements" class="h-100 w-100 z-index-1 chart-container">
      <div id="chartElement" ref="chartElement" class="h-100 w-100 chart" />
      <q-resize-observer @resize="resize" />
    </div>
    <div
      v-if="!numberOfMeasurements"
      class="p-absolute z-index-10 w-100 h-100 bg-white"
      style="top: 0"
    >
      <div class="column div-lottie bg-white">
        <lottie-vue-player
          class="lottie"
          :src="'/lottie/chart-reports.json'"
          :autoplay="true"
          :loop="true"
          :speed="1"
        />
        <span class="text-weight-bold">
          {{ $t('session.graphic_temporarily_unavailable') }}
        </span>
      </div>
    </div>
  </div>
</template>

<script src="./ChartVisualizer.js" />

<style lang="scss" scoped>
@import 'src/css/mixins.scss';
.chart-container {
  transition: width 1s ease-in-out, height 1s ease-in-out;
}

.div-lottie {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.lottie {
  width: 300px;
  height: 300px;
  background: transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @include md() {
    width: 200px;
    height: 200px;
  }
}
</style>
