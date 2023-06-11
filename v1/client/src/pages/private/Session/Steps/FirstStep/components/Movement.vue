<template>
  <q-card bordered flat class="p-8 no-wrap gap-8 row">
    <div class="col gap-4">
      <div class="col column gap-4">
        <q-select
          v-model="syncedMovement.type"
          :options="syncedSession.getMovementsList"
          emit-value
          dense
          outlined
          :label="$t('session.movement')"
          :rules="[$validators.notBlank]"
          option-label="movement_name"
          option-value="value"
          @input="(value) => syncedSession.selectMovement(value, order)"
        />
        <span v-if="syncedMovement">{{ syncedMovement.description }}</span>
      </div>
      <div v-if="!!syncedMovement.image" class="col img-center">
        <q-img class="img-div" :src="syncedMovement.image" />
      </div>
    </div>
    <div class="column justify-center">
      <q-btn
        size="md"
        flat
        round
        icon="delete"
        color="red"
        unelevated
        @click="syncedSession.removeMovement(order)"
      />
    </div>
  </q-card>
</template>

<script src="./Movement.js" />

<style lang="scss" scoped>
@import '~src/css/mixins.scss';
.img-center {
  display: flex;
  flex-direction: row;
  justify-content: center;

  .img-div {
    width: 100%;
    height: auto;
    max-width: 225px;
    @include mobile-portrait() {
      width: 225px;
      height: 225px;
    }
  }
}
</style>
