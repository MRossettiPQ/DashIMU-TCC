<template>
  <q-table
    class="h-100 w-100 p-0"
    :columns="tableColumns"
    :data="dataTableMeasurement"
    color="primary"
    flat
    bordered
    :rows-per-page-options="[0]"
    virtual-scroll
  />
</template>

<script src="./TabMeasurementTable.js" />
