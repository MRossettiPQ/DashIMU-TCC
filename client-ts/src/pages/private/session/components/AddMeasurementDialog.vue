<template>
  <q-dialog ref="dialog" full-height full-width>
    <q-card class="column p-12 gap-4">
      <q-card class="row justify-between no-wrap">
        <div class="text-h6 clamp-lines-1">Adicionar medições a movimento</div>
        <q-btn v-close-popup icon="close" dense flat size="md" />
      </q-card>
      <q-card class="column no-wrap gap-12">
        <div class="column gap-12">
          <span class="text-h6 text-center">
            Estão disponíveis para serem colocadas na sessão.
          </span>
          <div class="row gap-4 justify-center">
            <div class="row" v-for="(item, index) in temp" :key="index">
              <div class="column data rounded-borders">
                <span>{{ item.sensorName }}</span>
                <span>{{ item.size }} medições</span>
              </div>
            </div>
          </div>
          <span class="text-h6 text-center">
            A qual procedimento e movimento que essas medições pertencem?
          </span>
        </div>
        <q-table
          class="h-100"
          :data="data"
          :columns="columns"
          selection="single"
          :selected.sync="selected"
        />
      </q-card>
      <q-card class="row w-100 justify-end no-wrap">
        <q-btn
          label="Adicionar"
          color="primary"
          dense
          unelevated
          @click="hide({ ok: 'sim' })"
        />
      </q-card>
    </q-card>
  </q-dialog>
</template>

<script src="./AddMeasurementDialog.ts" lang="ts" />

<style lang="scss" scoped>
.data {
  padding: 16px;
  text-align: center;
  border: solid 1px $primary;
}
.swiper-transition {
  transition: fade 1000s;
}
.swiper-container {
  width: 100%;
}
</style>
