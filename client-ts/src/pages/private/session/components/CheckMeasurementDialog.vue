<template>
  <q-dialog ref="dialog" full-height full-width>
    <q-card class="column p-12 gap-4 h-100">
      <q-card class="row w-100 justify-between no-wrap">
        <div class="text-h6 clamp-lines-1">
          Relação de movimentos e medições realizadas
        </div>
        <q-btn v-close-popup icon="close" dense flat size="md" />
      </q-card>
      <q-card class="column no-wrap w-100 h-100">
        <q-table
          class="column no-wrap w-100 h-100"
          :columns="columns"
          :data="data"
          flat
        />
      </q-card>
    </q-card>
  </q-dialog>
</template>

<script src="./CheckMeasurementDialog.ts" lang="ts" />

<style lang="scss" scoped></style>
