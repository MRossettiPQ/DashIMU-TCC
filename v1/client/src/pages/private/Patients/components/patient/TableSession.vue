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
      <div class="row gap-8 w-100 justify-between">
        <q-btn
          class="row"
          :disable="loading"
          :label="!isTinyScreen ? 'Session' : null"
          color="primary"
          dense
          icon="add"
          unelevated
          @click="session"
        />
        <q-input
          v-model="term"
          borderless
          class="col col-sm-7"
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

<script src="./TableSession.js" />

<style lang="scss" scoped>
::v-deep .q-table__top {
  padding: 0 !important;
}
</style>
