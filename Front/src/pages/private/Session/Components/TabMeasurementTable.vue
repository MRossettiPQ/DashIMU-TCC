<template>
  <q-table
    :columns="tableColumns"
    :data="data"
    :fullscreen="openedFullscreen"
    color="primary"
    flat
    bordered
  >
    <template #top-right>
      <q-btn
        :label="!$q.platform.is.mobile ? $t('session.export') : null"
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
              ? $t('session.close')
              : $t('session.fullscreen')
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
.custom-table >>> .q-table, .q-table__card {
  overflow-x: auto;
}
</style>
