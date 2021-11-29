<template>
  <div class="scrollable overflow-auto flex-grow-1 flex-shrink-0">
    <q-table
        :title="label"
        :columns="tabelaColumns"
        :pagination="data"
        color="primary"
    >
      <template v-slot:top-right>
        <q-btn
            color="primary"
            icon-right="archive"
            label="Export to csv"
            no-caps
            @click="exportTable"
        />
      </template>
    </q-table>
  </div>
</template>

<script src="./TabTable.js" />

<style lang="stylus" scoped>
.grafico
  width 100%
  height 100%
</style>