<template>
  <section ref="patientScreen" class="responsive-height">
    <div class="row responsive-content form-column form-column__padding">
      <q-table
        :columns="columns"
        :data="pagination.list"
        :filter="term"
        :loading="pagination.loading"
        bordered
        flat
        row-key="id"
        @row-click="openDialog"
        :rows-per-page-options="[0]"
        virtual-scroll
      >
        <template #top>
          <q-btn
            :disable="loading"
            :label="!$q.platform.is.mobile ? 'Paciente' : null"
            color="primary"
            dense
            icon="add"
            unelevated
            @click="openDialog"
          />
          <q-space />
          <q-input
            v-model="term"
            borderless
            class="col-5"
            color="primary"
            debounce="300"
            dense
            outlined
          >
            <template #append>
              <q-icon name="search" @click="search" />
            </template>
          </q-input>
        </template>
      </q-table>
    </div>
  </section>
</template>

<script src="./Patients.js" />

<style lang="scss" scoped></style>
