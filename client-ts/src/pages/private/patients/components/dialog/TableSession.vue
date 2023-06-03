<template>
  <q-table
    :columns="columns"
    :data="pagination.list"
    :filter="term"
    :loading="pagination.loading"
    class="col"
    flat
    row-key="id"
    @row-click="open"
    :rows-per-page-options="[15]"
  >
    <template #top>
      <div class="form-column gap-8 w-100 justify-between">
        <div class="row gap-8">
          <q-btn
            :disable="loading"
            :label="!isTinyScreen ? 'Session' : null"
            color="primary"
            dense
            icon="add"
            unelevated
            @click="toMeasurement"
          />
          <q-btn
            :disable="true"
            :label="!isTinyScreen ? 'Importar' : null"
            color="primary"
            dense
            unelevated
            icon="publish"
            @click="open"
          />
        </div>
        <q-input
          v-model="term"
          borderless
          class="col col-sm-5"
          color="primary"
          debounce="300"
          unelevated
          dense
          outlined
        >
          <template #append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
    </template>
  </q-table>
</template>

<script src="./TableSession.ts" />

<style lang="scss" scoped>
::v-deep .q-table__top {
  padding: 0 !important;
}
</style>
