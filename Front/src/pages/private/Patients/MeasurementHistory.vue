<template>
  <q-dialog ref="dialog" class="dialog" full-height full-width>
    <q-card class="column full-height dialog-card">
      <dialog-header
        :id="id"
        :label-right-button="!$q.platform.is.mobile ? 'Fechar' : null"
        else-msg="Sem sessão"
        id-msg="Medição nº"
      />
      <q-card-section class="column">
        <q-table
          class="col w-100"
          v-if="id"
          :columns="columns"
          :data="pagination.list"
          :filter="filter"
          :loading="pagination.loading"
          flat
          row-key="id"
          title="Treats"
        >
          <template #top>
            <div class="search-div w-100">
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
              <q-btn
                :disable="loading"
                :loading="loading"
                :label="
                  !$q.platform.is.mobile
                    ? 'Calculation Variability Center'
                    : null
                "
                color="primary"
                dense
                unelevated
                @click="getCalculationVariabilityCenter"
              />
            </div>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script src="./MeasurementHistory.js" />

<style lang="stylus" scoped>
.search-div {
  display: flex;
  justify-content: space-between;
}
</style>
