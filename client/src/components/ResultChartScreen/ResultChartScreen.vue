<template>
  <div class="run-procedure h-100 w-100">
    <q-tabs v-model="tabPanel" vertical class="text-grey" active-color="primary" indicator-color="primary">
      <q-tab v-for="(calc, index) in result" :key="index" class="custom-tab" icon="directions_run" :label="'Mov. ' + index" :name="`Movimento_${index}`" @click="selectMovement(calc.movement)" />
    </q-tabs>
    <q-tab-panels v-model="tabPanel" class="col w-100 h-100 data-content" animated>
      <q-tab-panel v-for="(calc, index) in result" :key="index" class="h-100 w-100 justify-center items-center flex" :name="`Movimento_${index}`" style="padding: 0 !important; gap: 8px">
        <q-tabs v-model="movTab" vertical class="text-grey" active-color="primary" indicator-color="primary">
          <q-tab class="custom-tab" icon="table_rows" label="Tabela" name="Tabela" />
          <q-tab class="custom-tab" icon="show_chart" label="Gráfico" name="Graph" />
        </q-tabs>
        <q-tab-panels v-model="movTab" class="col w-100 h-100 data-content" animated>
          <q-tab-panel class="h-100 w-100 justify-center items-center flex" name="Tabela" style="padding: 0 !important">
            <q-table :columns="columns" :data="pagination?.list" :filter="filter" :loading="pagination?.loading" class="col" flat :rows-per-page-options="[15]" virtual-scroll> </q-table>
          </q-tab-panel>
          <q-tab-panel class="h-100 w-100 justify-center items-center flex" name="Graph" style="padding: 0 !important">
            <div class="col h-100">
              <v-e-chart :values="calc.atorn" :loading="loading" :option="calc.chartOption"></v-e-chart>
            </div>
          </q-tab-panel>
        </q-tab-panels>
        <div v-if="!!calc?.atorn" class="col-2 computed column h-100 bg-white">
          <q-field filled label="type" dense readonly stack-label>
            {{ calc?.movement?.type }}
          </q-field>
          <q-field filled label="min_pitch" dense readonly stack-label>
            {{ calc?.values?.min_pitch }}
          </q-field>
          <q-field filled label="max_pitch" dense readonly stack-label>
            {{ calc?.values?.max_pitch }}
          </q-field>
          <q-field filled label="var_pitch" dense readonly stack-label>
            {{ calc?.values?.var_pitch }}
          </q-field>
          <q-field filled label="min_atorn" dense readonly stack-label>
            {{ calc?.values.min_atorn }}
          </q-field>
          <q-field filled label="max_atorn" dense readonly stack-label>
            {{ calc?.values?.max_atorn }}
          </q-field>
          <q-field filled label="var_atorn" dense readonly stack-label>
            {{ calc?.values?.var_atorn }}
          </q-field>
          <q-field filled label="mean_rms_r_atorn" dense readonly stack-label>
            {{ calc?.values?.mean_rms_r_atorn }}
          </q-field>
          <q-field filled label="mean_rms_r_atorn" dense readonly stack-label>
            {{ calc?.values?.mean_rms_r_atorn }}
          </q-field>
          <q-field filled label="sd_rms_r_atorn" dense readonly stack-label>
            {{ calc?.values?.sd_rms_r_atorn }}
          </q-field>
          <q-field filled label="mean_rms_r_pitch_1p" dense readonly stack-label>
            {{ calc?.values?.mean_rms_r_pitch_1p }}
          </q-field>
          <q-field filled label="sd_rms_r_pitch_1p" dense readonly stack-label>
            {{ calc?.values?.sd_rms_r_pitch_1p }}
          </q-field>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script src="./ResultChartScreen.js" />

<style lang="stylus" scoped>
.run-procedure {
  height: 100%;
  display: grid;
  grid-template-columns: min-content 1fr;
}

.data-content {
  display: flex;
  flex-direction: row;
  max-width: 100%;
  max-height: 100%;

  .computed {
    padding-right: 6px;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    gap: 12px;
    overflow-y: auto;
  }
}

.custom-tab {
  padding-right: 12px !important;
}
</style>
