<template>
  <q-table
    class="h-100 w-100 p-0"
    :columns="columns"
    :data="sensor.gyro_measurements"
    bordered
    flat
    :rows-per-page-options="[0]"
    virtual-scroll
  />
</template>

<script src="./TableMeasurements.js" />

<style lang="scss" scoped></style>
