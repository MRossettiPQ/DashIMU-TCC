<template>
  <q-dialog ref="dialog" class="dialog" full-height full-width>
    <q-card class="column full-height dialog-card">
      <dialog-header
        :id="id"
        :label-right-button="!$q.platform.is.mobile ? 'Fechar' : null"
        else-msg="Sem sessão"
        id-msg="Variability center of session nº"
      />
      <q-card-section class="div-vc" v-if="dataLoaded">
        <div class="col chart" ref="eChart" id="eChart"></div>
        <div class="column div-values" v-if="values">
          <span>min_pitch:{{ values.min_pitch }}</span>
          <span>max_pitch:{{ values.max_pitch }}</span>
          <span>var_pitch:{{ values.var_pitch }}</span>
          <span>min_atorn:{{ values.min_atorn }}</span>
          <span>max_atorn:{{ values.max_atorn }}</span>
          <span>var_atorn:{{ values.var_atorn }}</span>
          <span>mean_rms_r_atorn:{{ values.mean_rms_r_atorn }}</span>
          <span>sd_rms_r_atorn:{{ values.sd_rms_r_atorn }}</span>
          <span>mean_rms_r_pitch_1p:{{ values.mean_rms_r_pitch_1p }}</span>
          <span>sd_rms_r_pitch_1p:{{ values.sd_rms_r_pitch_1p }}</span>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script src="./VariabilityCenter.js"/>

<style lang="stylus" scoped>
.div-header
  width 100%
  display flex
  justify-content space-between

.div-vc
  display grid
  grid-template-columns 70% 30%

.div-values
  padding 0 8px 0 8px

.chart
  width 100%
  height auto
</style>
