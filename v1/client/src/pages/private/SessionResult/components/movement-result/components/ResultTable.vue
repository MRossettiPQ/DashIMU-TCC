<template>
  <div class="form-lines gap-8">
    <span class="text-center f-bold">Variação</span>
    <div class="form-column gap-8" v-if="calculation">
      <q-input
        v-model="calculation.min_pitch"
        outlined
        dense
        label="Min pitch"
        :readonly="true"
        stack-label
      />
      <q-input
        v-model="calculation.max_pitch"
        outlined
        dense
        label="Max pitch"
        :readonly="true"
        stack-label
      />
      <q-input
        v-model="calculation.min_atorn"
        outlined
        dense
        label="Min atorn"
        :readonly="true"
        stack-label
      />
      <q-input
        v-model="calculation.max_atorn"
        outlined
        dense
        label="Max atorn"
        :readonly="true"
        stack-label
      />
      <q-input
        v-model="calculation.var_pitch"
        outlined
        dense
        label="Var pitch"
        :readonly="true"
        stack-label
      />
      <q-input
        v-model="calculation.mean_rms_r_atorn"
        outlined
        dense
        label="Mean rms_r atorn"
        :readonly="true"
        stack-label
      />
      <q-input
        v-model="calculation.sd_rms_r_atorn"
        outlined
        dense
        label="Sd rms_r atorn"
        :readonly="true"
        stack-label
      />
      <q-input
        v-model="calculation.mean_rms_r_pitch_1p"
        outlined
        dense
        label="Mean rms_r pitch_1p"
        :readonly="true"
        stack-label
      />
      <q-input
        v-model="calculation.sd_rms_r_pitch_1p"
        outlined
        dense
        label="Sd rms_r pitch_1p"
        :readonly="true"
        stack-label
      />
    </div>
    <span class="text-center f-bold">Abertura</span>
    <div class="form-column gap-8" v-if="calculation">
      <q-input
        v-model="calculation.angles.mean"
        outlined
        dense
        label="Média"
        :readonly="true"
        stack-label
      />
      <q-input
        v-model="calculation.angles.max"
        outlined
        dense
        label="Max"
        :readonly="true"
        stack-label
      />
      <q-input
        v-model="calculation.angles.min"
        outlined
        dense
        label="Min"
        :readonly="true"
        stack-label
      />
      <q-input
        v-model="calculation.angles.std"
        outlined
        dense
        label="Desvio padrão"
        :readonly="true"
        stack-label
      />
    </div>
  </div>
</template>

<script src="./ResultTable.js" />

<style lang="scss" scoped></style>
