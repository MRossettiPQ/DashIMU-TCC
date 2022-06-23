<template>
  <q-table
    v-if="dataTable"
    class="col"
    :fullscreen="openFullscreen"
    :title="label"
    :columns="tabelaColumns"
    :rows="dataTable"
    color="primary"
    bordered
    flat
  >
    <template #top-right class="flex">
      <q-btn
        class="col-2 m-r-5"
        dense
        color="primary"
        icon-right="archive"
        :label="!$q.platform.is.mobile ? 'Exportar' : null"
        no-caps
        @click="exportTable"
      />
      <q-btn
        class="col-2"
        dense
        color="primary"
        :icon="openFullscreen ? 'close_fullscreen': 'width_full'"
        :label="!$q.platform.is.mobile ? (openFullscreen ? 'Fechar' : 'Tela cheia') : null"
        no-caps
        @click="openFullscren"
      />
    </template>
  </q-table>
</template>

<script src="./TabTable.js"/>

<style lang="stylus" scoped></style>
