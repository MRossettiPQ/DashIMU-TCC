<template>
  <q-table
    class="col"
    :fullscreen="openFullscreen"
    :title="label"
    :columns="tabelaColumns"
    :rows="data"
    color="primary"
    bordered
    flat
  >
    <template #top-right>
      <q-btn
        class="m-r-5"
        color="primary"
        icon-right="archive"
        label="Export to csv"
        no-caps
        @click="exportTable"
      />
      <q-btn
        color="primary"
        :label="openFullscreen ? 'Fechar tabela' : 'Abrir em tela cheia'"
        no-caps
        @click="openFullscren"
      />
    </template>
  </q-table>
</template>

<script src="./TabTable.js" />

<style lang="stylus" scoped></style>
