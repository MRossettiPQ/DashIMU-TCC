<template>
  <q-card bordered flat class="p-8 column gap-4">
    <span>Movimento {{ order }}</span>
    <div class="flex gap-8 flex-wrap w-100">
      <q-select
        class="col w-100 ellipsis"
        v-model="syncMovement.movement"
        :options="syncProcedure.movementsOptions"
        emit-value
        dense
        outlined
        fill-input
        :label="$t('session.procedure')"
        :rules="[$validators.notBlank]"
        option-label="movement_name"
        option-value="value"
        @input="syncMovement.selectMovement($event, syncProcedure.movementsOptions)"
      />
      <q-input
        class="col w-100"
        v-model="syncMovement.observation"
        dense
        outlined
        label="Observação"
        placeholder="Observação"
        type="text"
      />
      <div>
        <q-btn
          dense
          round
          flat
          color="primary"
          icon="eject"
          @click="syncProcedure.removeMovement(syncMovement.uuid)"
        />
      </div>
    </div>
    <div v-if="!!syncMovement.image" class="col img-center">
      <q-img class="img-div" :src="syncMovement.image"/>
      <span v-if="syncMovement.movement">{{ syncMovement.description }}</span>
    </div>
  </q-card>
</template>

<script src="./Movement.js"/>

<style lang="scss" scoped>
@import "~src/css/mixins.scss";
.q-input, .q-select {
  min-width: 150px;
}

.img-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .img-div {
    width: 225px;
    height:225px;
  }
}
</style>
