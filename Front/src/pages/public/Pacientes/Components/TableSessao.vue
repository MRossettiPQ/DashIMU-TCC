<template>
  <q-table
    class="col"
    v-if="id"
    title="Treats"
    :data="dataTable"
    :columns="columns"
    row-key="id"
    :filter="filter"
    :loading="loading"
    @row-click="openDialog"
    flat
  >
    <template #top class="form-column form-column__no-padding">
      <q-btn
        color="primary"
        :disable="loading"
        icon="add"
        :label="!$q.platform.is.mobile && 'Sessão'"
        @click="toMedicao"
      />
      <q-space />
      <q-input
        class="col-5"
        v-model="filter"
        outlined
        borderless
        dense
        debounce="300"
        color="primary"
      >
        <template #append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>
  </q-table>
</template>

<script src="./TableSessao.js" />

<style scoped>

</style>
