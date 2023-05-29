<template>
  <section class="responsive-height">
    <div class="row responsive-content form-column form-column__padding-md">
      <q-table :columns="columns" :data="pagination.list" :filter="term" :loading="pagination.loading" bordered flat row-key="id" @row-click="openDialog" :rows-per-page-options="[0]" virtual-scroll>
        <template #top>
          <div class="flex justify-between gap-8 w-100 no-wrap">
            <q-btn :disable="loading" :label="!isTinyScreen ? 'Paciente' : null" color="primary" dense icon="add" unelevated outline @click="openDialog" />
            <q-input v-model="term" borderless class="col col-sm-5" color="primary" debounce="300" dense outlined>
              <template #append>
                <q-icon name="search" @click="search" />
              </template>
            </q-input>
          </div>
        </template>
      </q-table>
    </div>
  </section>
</template>

<script src="./Patients.js" />

<style lang="scss" scoped></style>
