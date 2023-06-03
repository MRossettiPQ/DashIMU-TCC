<template>
  <section class="responsive-height p-8">
    <q-card bordered flat class="row responsive-content form-column p-8">
      <q-table
        :columns="columns"
        :data="pagination.list"
        :filter="term"
        :loading="pagination.loading"
        bordered
        flat
        row-key="id"
        @row-click="open"
        :rows-per-page-options="[0]"
        virtual-scroll
      >
        <template #top>
          <div class="flex justify-between gap-8 w-100 no-wrap">
            <q-btn
              :disable="loading"
              :label="!isTinyScreen ? 'Paciente' : null"
              color="primary"
              dense
              icon="add"
              unelevated
              outline
              @click="open"
            />
            <q-input
              v-model="term"
              borderless
              class="col col-sm-5"
              color="primary"
              debounce="300"
              dense
              outlined
            >
              <template #append>
                <q-icon name="search" @click="search" />
              </template>
            </q-input>
          </div>
        </template>
      </q-table>
    </q-card>
  </section>
</template>

<script lang="ts" src="./PatientsPage.ts" />

<style scoped>
::v-deep .q-table__top {
  padding: 0 !important;
}
</style>
