<template>
  <q-table
    class="panels"
    :columns="tableColumns"
    :data="data"
    :fullscreen="openedFullscreen"
    :title="label"
    color="primary"
    flat
    bordered
  >
    <template #top-right class="flex">
      <q-btn
        :label="!$q.platform.is.mobile ? 'Export' : null"
        class="col-2 m-r-5"
        color="primary"
        dense
        icon-right="archive"
        no-caps
        @click="exportTable"
      />
      <q-btn
        :icon="openedFullscreen ? 'close_fullscreen' : 'width_full'"
        :label="
          !$q.platform.is.mobile
            ? openedFullscreen
              ? 'Close'
              : 'Fullscreen'
            : null
        "
        class="col-2"
        color="primary"
        dense
        no-caps
        @click="openFullscreen"
      />
    </template>
  </q-table>
</template>

<script src="./TabMeasurementTable.js" />

<style lang="stylus" scoped>
.panels
  height 100%
  display flex
  flex-grow 1
  align-items stretch
</style>
