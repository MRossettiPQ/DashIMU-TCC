<template>
  <q-dialog ref="dialog" class="dialog" full-height full-width>
    <q-card class="column full-height dialog-card">
      <dialog-header
        :id="id"
        :label-right-button="!$q.platform.is.mobile ? 'Fechar' : null"
        else-msg="Sem sessão"
        id-msg="Medição nº"
      />
      <q-card-section class="col content-column">
        <q-table
          v-if="id"
          :columns="columns"
          :data="pagination.list"
          :filter="filter"
          :loading="pagination.loading"
          class="col"
          flat
          row-key="id"
          title="Treats"
        >
          <template #top>
            <q-input
              v-model="filter"
              borderless
              color="primary"
              debounce="300"
              dense
              outlined
            >
              <template #append>
                <q-icon name="search" />
              </template>
            </q-input>
            <q-space />
            <q-btn
              :disable="loading"
              :loading="loading"
              :label="
                !$q.platform.is.mobile ? 'Calculation Variability Center' : null
              "
              color="primary"
              dense
              unelevated
              @click="getCalculationVariabilityCenter"
            />
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script src="./MeasurementHistory.js" />

<style lang="stylus" scoped>
.div-header
  width 100%
  display flex
  justify-content space-between
</style>
