<template>
  <q-table
    class="h-100 w-100"
    :columns="tableColumns"
    :data="measurements"
    color="primary"
    flat
    virtual-scroll
    bordered
  />
</template>

<script lang="ts" src="./MeasurementTable.ts" />

<style lang="scss" scoped></style>
