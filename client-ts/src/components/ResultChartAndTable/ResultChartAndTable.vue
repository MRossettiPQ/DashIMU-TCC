<template>
  <q-card bordered flat class="form-lines gap-8">
    <span>Result chart and table</span>
    <div
      v-for="(procedure, index) in session?.procedures"
      :key="index"
    >
      <span>{{ procedure.id }} - {{ index }}</span>
    </div>
  </q-card>
</template>

<script lang="ts" src="./ResultChartAndTable.ts"/>

<style lang="scss" scoped>

</style>
