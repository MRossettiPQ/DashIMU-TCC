<template>
  <q-dialog ref="dialog" full-width full-height class="dialog">
    <q-card class="column full-height dialog-card">
      <dialog-header :id="id" idMsg="Medição nº" elseMsg="Sem sessão" :labelRightButton="!$q.platform.is.mobile ? 'Fechar' : null" />
      <q-separator/>
      <q-card-section class="col content-column">
        <q-table
          class="col"
          v-if="id"
          title="Treats"
          :data="dataTable"
          :columns="columns"
          row-key="id"
          :filter="filter"
          :loading="loading"
          flat
        >
          <template #top>
            <q-input
              v-model="filter"
              outlined
              borderless
              dense
              debounce="300"
              color="primary"
            >
              <template #append>
                <q-icon name="search"/>
              </template>
            </q-input>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script src="./HistoricoMedicao.js"/>

<style lang="stylus" scoped>
.div-header
  width 100%
  display flex
  justify-content space-between
</style>
