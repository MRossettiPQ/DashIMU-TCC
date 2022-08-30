<template>
  <q-table
    :columns="tabelaColumns"
    :data="dataTable"
    :fullscreen="openFullscreen"
    :title="label"
    bordered
    class="col"
    color="primary"
    flat
  >
    <template #top-right class="flex">
      <q-btn
        :label="!$q.platform.is.mobile ? 'Exportar' : null"
        class="col-2 m-r-5"
        color="primary"
        dense
        icon-right="archive"
        no-caps
        @click="exportTable"
      />
      <q-btn
        :icon="openFullscreen ? 'close_fullscreen' : 'width_full'"
        :label="
          !$q.platform.is.mobile
            ? openFullscreen
              ? 'Fechar'
              : 'Tela cheia'
            : null
        "
        class="col-2"
        color="primary"
        dense
        no-caps
        @click="openFullscren"
      />
    </template>
  </q-table>
</template>

<script src="./TabMeasurementTable.js" />

<style lang="stylus" scoped></style>
