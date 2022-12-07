<template>
  <div class="column div-step">
    <q-form
      ref="mainForm"
      class="column"
      greedy
      style="display: flex; gap: 8px"
    >
      <q-select
        v-model="syncedSession.values.procedure"
        class="row"
        :options="syncedSession.procedures"
        emit-value
        dense
        filled
        :label="$t('session.procedure')"
        :rules="[$validators.notBlank]"
        option-label="articulation_name"
        option-value="value"
        @input="(value) => session.selectProcedure(value)"
      />
      <div
        v-if="syncedSession.procedureSelected"
        class="row column w-100"
        style="display: flex; gap: 8px"
      >
        <div
          v-for="(m, index) in syncedSession.values.movements"
          :key="index"
          class="column info-card w-100"
        >
          <div
            class="col items-center"
            style="display: flex; flex-direction: row"
          >
            <div class="col">
              <div class="col column">
                <q-select
                  v-model="m.type"
                  :options="session.getMovementsList"
                  emit-value
                  dense
                  filled
                  :label="$t('session.movement')"
                  :rules="[$validators.notBlank]"
                  option-label="movement_name"
                  option-value="value"
                  @input="(value) => session.selectMovement(value, index)"
                />
                <span v-if="m">{{ m.description }}</span>
              </div>

              <div v-if="!!m.image" class="col img-center">
                <q-img class="img-div" :src="m.image" />
              </div>
            </div>
            <div>
              <q-btn
                size="md"
                flat
                round
                icon="delete"
                color="red"
                unelevated
                @click="syncedSession.removeMovement(index)"
              />
            </div>
          </div>
        </div>
        <q-btn
          class="col"
          unelevated
          outline
          dense
          label="Adicionar movimento"
          @click="syncedSession.addMovement()"
        />
      </div>
    </q-form>
  </div>
</template>

<script src="./InitSession.js" />

<style lang="scss" scoped>
@import "~src/css/mixins.scss";
.div-step {
  display: flex;
  height: 100%;
  overflow-y: auto;
}

.info-card {
  display: flex;
  flex-direction: row;
  gap: 8px;
  @include mobile-portrait() {
    display: flex;
    flex-direction: column;
  }
}

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
