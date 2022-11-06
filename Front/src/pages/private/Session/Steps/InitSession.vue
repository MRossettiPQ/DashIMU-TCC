<template>
  <q-form
    v-if="!!metadata.procedures"
    class="column form-lines form-lines__gap-md"
  >
    <q-select
      class="row"
      v-model="syncedSession.procedure"
      :options="metadata.procedures"
      emit-value
      filled
      :label="$t('session.procedure')"
      :rules="[$validators.notBlank]"
      option-label="articulation_name"
      option-value="value"
    />

    <div class="info-card" v-if="getProcedure">
      <div class="row column">
        <q-select
          v-model="syncedSession.movement"
          :options="getMovementsList"
          emit-value
          filled
          :label="$t('session.movement')"
          :rules="[$validators.notBlank]"
          option-label="movement_name"
          option-value="value"
        />
        <span v-if="movement">{{ movement.description }}</span>
      </div>

      <div class="row img-center" v-if="!!getMovementImg">
        <q-img class="img-div" :src="getMovementImg" />
      </div>
    </div>

    <q-input
      class="row"
      v-model="syncedSession.weight"
      filled
      :label="$t('session.weight')"
      type="text"
    />
  </q-form>
</template>

<script src="./InitSession.js" />

<style lang="stylus" scoped>
@import "~src/css/mixins.styl"

.info-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
}

.img-center {
  display: flex;
  justify-content: center;

  .img-div {
    width: 100%;
    height: auto;
    max-width: 225px;
    +mobile-portrait() {
      width: 225px;
      height: 225px;
    }
  }
}
</style>
