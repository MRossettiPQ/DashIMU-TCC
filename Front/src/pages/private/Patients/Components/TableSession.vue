<template>
  <q-table
    v-if="id"
    :columns="columns"
    :data="pagination.list"
    :filter="filter"
    :loading="loading"
    class="col"
    flat
    row-key="id"
    title="Treats"
    @row-click="openDialog"
  >
    <template #top class="form-column form-column__no-padding">
      <q-btn
        :disable="loading"
        :label="!$q.platform.is.mobile ? 'Session' : null"
        color="primary"
        icon="add"
        @click="toMeasurement"
      />
      <q-space />
      <q-input
        v-model="filter"
        borderless
        class="col-5"
        color="primary"
        debounce="300"
        dense
        outlined
      >
        <template #append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>
  </q-table>
</template>

<script src="./TableSession.js" />

<style scoped></style>
