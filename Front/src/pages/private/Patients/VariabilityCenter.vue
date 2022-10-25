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
          <div class="info-div">
            <span class="info-title">min_pitch:</span>
            <span class="info-value">{{ values.min_pitch }}</span>
          </div>
          <div class="info-div">
            <span class="info-title">max_pitch:</span>
            <span class="info-value">{{ values.max_pitch }}</span>
          </div>
          <div class="info-div">
            <span class="info-title">var_pitch:</span>
            <span class="info-value">{{ values.var_pitch }}</span>
          </div>
          <div class="info-div">
            <span class="info-title">var_pitch:</span>
            <span class="info-value">{{ values.var_pitch }}</span>
          </div>
          <div class="info-div">
            <span class="info-title">min_atorn:</span>
            <span class="info-value">{{ values.min_atorn }}</span>
          </div>
          <div class="info-div">
            <span class="info-title">max_atorn:</span>
            <span class="info-value">{{ values.max_atorn }}</span>
          </div>
          <div class="info-div">
            <span class="info-title">var_atorn:</span>
            <span class="info-value">{{ values.var_atorn }}</span>
          </div>
          <div class="info-div">
            <span class="info-title">mean_rms_r_atorn:</span>
            <span class="info-value">{{ values.mean_rms_r_atorn }}</span>
          </div>
          <div class="info-div">
            <span class="info-title">sd_rms_r_atorn:</span>
            <span class="info-value">{{ values.sd_rms_r_atorn }}</span>
          </div>
          <div class="info-div">
            <span class="info-title">mean_rms_r_pitch_1p:</span>
            <span class="info-value">{{ values.mean_rms_r_pitch_1p }}</span>
          </div>
          <div class="info-div">
            <span class="info-title">sd_rms_r_pitch_1p:</span>
            <span class="info-value">{{ values.sd_rms_r_pitch_1p }}</span>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script src="./VariabilityCenter.js" />

<style lang="stylus" scoped>
.info-div {
  display: flex;
  font-size 1rem;
  gap: 8px;
  padding: 8px 0 8px 0px;
}

.info-title {
  font-weight: 600;
}

.info-value {
  font-weight: 400;
}

.div-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.div-vc {
  display: grid;
  grid-template-columns: 70% 30%;
  gap: 12px;
}

.div-values {
  padding: 0 8px 0 8px;
}

.chart {
  width: 100%;
  height: auto;
}
</style>
