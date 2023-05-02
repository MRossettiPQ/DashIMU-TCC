<template>
  <q-table :columns="columns" :data="pagination.list" :filter="filter" :loading="pagination.loading" class="col" flat row-key="id" @row-click="openDialog" :rows-per-page-options="[15]">
    <template #top>
      <div class="table-header">
        <q-btn :disable="loading" :label="!isMobile ? 'Session' : null" color="primary" dense icon="add" unelevated @click="toMeasurement" />
        <q-btn :disable="loading" :label="!isMobile ? 'Importar' : null" color="primary" dense unelevated icon="publish" @click="openImportExample" />
        <q-space />
        <q-input v-model="filter" borderless class="col-5" color="primary" debounce="300" unelevated dense outlined>
          <template #append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
    </template>
  </q-table>
</template>

<script src="./TableSession.js" />

<style lang="scss" scoped>
.table-header {
  gap: 12px;
  display: flex;
  flex-direction: row;
  width: 100%;
  padding-bottom: 2px;
}
::v-deep .q-table__top,
.relative-position,
.row,
.items-center {
  padding: 0 !important;
}
</style>
