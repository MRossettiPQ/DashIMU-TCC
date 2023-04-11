<template>
  <q-dialog ref="dialog" class="dialog" full-height full-width>
    <q-card class="column full-height dialog-card">
      <dialog-header
        :id="id"
        :label-right-button="!isMobile ? 'Fechar' : null"
        id-msg="Importação"
      />
      <loading-screen v-if="fetchData?.loading" />
      <error-screen v-else-if="fetchData?.hasError" />
      <q-card-section
        v-else-if="fetchData?.dataLoaded && !!session?.values"
        class="column"
      >
        <q-form
          ref="mainForm"
          class="column"
          greedy
          style="display: flex; gap: 8px"
        >
          <q-select
            v-model="session.values.procedure"
            class="row"
            :options="session.procedures"
            emit-value
            dense
            filled
            :label="$t('import_example.procedure')"
            :rules="[$validators.notBlank]"
            option-label="articulation_name"
            option-value="value"
            @input="(value) => session.selectProcedure(value)"
          />
          <div
            v-if="session.procedureSelected"
            class="column"
            style="display: flex; gap: 8px"
          >
            <div
              v-for="(m, index) in session.values.movements"
              :key="index"
              class="info-card"
            >
              <div
                class="column w-100"
                style="display: flex; flex-direction: row; align-items: center"
              >
                <div class="col">
                  <div class="col column">
                    <q-select
                      v-model="m.type"
                      :options="session.getMovementsList"
                      emit-value
                      dense
                      filled
                      :label="$t('import_example.movement')"
                      :rules="[$validators.notBlank]"
                      option-label="movement_name"
                      option-value="value"
                      @input="(value) => selectMovement(value, index)"
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
                    @click="session.removeMovement(index)"
                  />
                </div>
              </div>
            </div>
            <q-btn
              class="col"
              unelevated
              outline
              dense
              :label="$t('import_example.add_movement')"
              @click="session.addMovement()"
            />
          </div>

          <div
            v-if="filteredNonNullMovements.length > 0"
            class="w-100"
            style="display: flex; flex-direction: column; gap: 8px"
          >
            <div
              v-for="(movimento, index) in filteredNonNullMovements"
              :key="index"
              class="col w-100 card-movement"
              style="display: flex; flex-direction: row; gap: 8px"
            >
              <div
                v-for="(sensor, index_sensor) in movimento.sensors"
                :key="index_sensor"
                class="w-100"
              >
                <sensor-line
                  class="row"
                  v-if="!!sensor?.sensorName"
                  :sensor.sync="
                    session.values.movements[index].sensors[index_sensor]
                  "
                  :session="session"
                />
              </div>
            </div>
          </div>

          <q-btn
            class="row"
            unelevated
            outline
            dense
            label="teste"
            @click="teste()"
          />
        </q-form>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          label="Salvar"
          color="primary"
          unelevated
          dense
          size="md"
          @click="save"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script src="./ImportExample.js" />

<style lang="scss" scoped>
@import "~src/css/mixins.scss";

.card-movement {
  padding: 16px;
  border-radius: 12px;
  border: $grey-10 solid 1px;
}

.search-div {
  display: flex;
  justify-content: space-between;
  padding: 0 !important;
  width: 100%;
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
