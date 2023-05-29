<template>
  <q-card bordered class="p-8 column gap-4">
    <span>Procedimento {{ order }}</span>
    <div class="flex gap-8 w-100">
      <div class="column col gap-8">
        <q-select
          v-model="syncProcedure.procedure"
          :options="syncSession.metadata.procedures"
          emit-value
          dense
          outlined
          label="Movimento"
          :rules="[$rules.notBlank]"
          option-label="articulation_name"
          option-value="value"
          @input="syncProcedure.selectProcedure($event, syncSession.metadata.procedures)"
        />

        <div v-if="syncProcedure.notNull" class="column gap-4">
          <q-input
            v-model="syncProcedure.observation"
            dense
            outlined
            label="Observação"
            placeholder="Observação"
            type="text"
          />
          <movement
            v-for="(m, index) in syncProcedure.movements"
            :session.sync="syncSession"
            :movement.sync="syncProcedure.movements[index]"
            :procedure.sync="syncProcedure"
            :key="index"
            :order="index"
          />
        </div>
      </div>
      <div class="column row gap-8 justify-between">
        <q-btn
          dense
          round
          color="primary"
          icon="delete"
          @click="syncSession.bean.removeProcedure(syncProcedure.uuid)"
        />
        <q-btn
          v-if="syncProcedure.notNull"
          dense
          round
          color="primary"
          icon="add_circle"
          @click="syncProcedure.addMovement()"
        />
      </div>
    </div>
  </q-card>
</template>

<script src="./Procedure.ts" lang="ts"/>

<style lang="scss" scoped>
.q-input, .q-select {
  min-width: 150px;
}

</style>
