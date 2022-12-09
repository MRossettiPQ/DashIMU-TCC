<template>
  <q-dialog ref="dialog" full-height full-width>
    <q-card class="column">
      <q-card class="dialog-header">
        <div class="text-h6">Relação de movimentos e medições realizadas</div>
        <q-btn v-close-popup icon="close" dense flat size="md" />
      </q-card>
      <q-table
        :columns="columns"
        :data="sessionData"
        :loading="loading"
        class="col"
        flat
      />
      <q-card
        class="dialog-actions flex"
        style="padding: 12px; justify-content: flex-end"
      >
        <q-btn label="Alterar" color="primary" dense unelevated />
      </q-card>
    </q-card>
  </q-dialog>
</template>

<script src="./CheckMeasurementsDialog.js" />

<style lang="scss" scoped>
.dialog-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 14px;
}
</style>
