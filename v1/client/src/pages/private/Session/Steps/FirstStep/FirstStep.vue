<template>
  <div class="column h-100 no-wrap overflow-auto">
    <q-form ref="mainForm" class="column h-100 gap-8 no-wrap overflow-auto p-r-4" greedy>
      <q-card flat bordered class="row w-100 gap-8 p-8">
        <q-select
          class="col"
          v-model="syncedSession.values.procedure"
          :options="syncedSession.procedures"
          emit-value
          dense
          filled
          :label="$t('session.procedure')"
          :rules="[$validators.notBlank]"
          option-label="articulation_name"
          option-value="value"
          @input="(value) => syncedSession.selectProcedure(value)"
        />
        <div class="col">
          <q-btn
            v-if="syncedSession.procedureSelected"
            class="w-100"
            style="height: 40px"
            unelevated
            outline
            dense
            icon="las la-plus"
            label="Movimento"
            @click="syncedSession.addMovement()"
          />
        </div>
      </q-card>
      <div v-if="syncedSession.procedureSelected" class="row column h-100 w-100 gap-8 no-wrap">
        <movement
          v-for="(movement, index) in syncedSession.values.movements"
          :key="index"
          :movement.sync="syncedSession.values.movements[index]"
          :order="index"
          :session.sync="syncedSession"
        />
      </div>
    </q-form>
  </div>
</template>

<script src="./FirstStep.js" />

<style lang="scss" scoped></style>
