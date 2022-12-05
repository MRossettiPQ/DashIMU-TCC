<template>
  <div class="run-procedure">
    <q-tabs
      v-model="tabPanel"
      vertical
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      narrow-indicator
    >
      <q-tab
        v-if="inDev"
        class="custom-tab"
        icon="table_rows"
        label="Tabela"
        name="Tab_index"
      />
      <q-tab
        v-for="(calc, index) in dataLoaded"
        :key="index"
        class="custom-tab"
        icon="table_rows"
        :label="'Tabela ' + index"
        :name="`Tab_${index}`"
      />
    </q-tabs>
    <q-tab-panels v-model="tabPanel" class="row h-100" animated>
      <q-tab-panel
        v-if="inDev"
        class="h-100 w-100 justify-center items-center"
        name="Tab_index"
      >
        <div style="height: 100%; width: 100%; background-color: red"></div>
      </q-tab-panel>
      <q-tab-panel
        v-for="(calc, index) in dataLoaded"
        :key="index"
        class="h-100 w-100 justify-center items-center"
        :name="`Tab_${index}`"
      >
        <div class="col">
          <v-e-chart :values="calc?.atorn" :option="calc?.chartOption" />
        </div>
        <div v-if="!!calc?.atorn" class="col-2 computed column">
          <q-field filled label="min_pitch" dense readonly stack-label>
            {{ values?.min_pitch }}
          </q-field>
          <q-field filled label="max_pitch" dense readonly stack-label>
            {{ values?.max_pitch }}
          </q-field>
          <q-field filled label="var_pitch" dense readonly stack-label>
            {{ values?.var_pitch }}
          </q-field>
          <q-field filled label="min_atorn" dense readonly stack-label>
            {{ values.min_atorn }}
          </q-field>
          <q-field filled label="max_atorn" dense readonly stack-label>
            {{ values?.max_atorn }}
          </q-field>
          <q-field filled label="var_atorn" dense readonly stack-label>
            {{ values?.var_atorn }}
          </q-field>
          <q-field filled label="mean_rms_r_atorn" dense readonly stack-label>
            {{ values?.mean_rms_r_atorn }}
          </q-field>
          <q-field filled label="mean_rms_r_atorn" dense readonly stack-label>
            {{ values?.mean_rms_r_atorn }}
          </q-field>
          <q-field filled label="sd_rms_r_atorn" dense readonly stack-label>
            {{ values?.sd_rms_r_atorn }}
          </q-field>
          <q-field
            filled
            label="mean_rms_r_pitch_1p"
            dense
            readonly
            stack-label
          >
            {{ values?.mean_rms_r_pitch_1p }}
          </q-field>
          <q-field filled label="sd_rms_r_pitch_1p" dense readonly stack-label>
            {{ values?.sd_rms_r_pitch_1p }}
          </q-field>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script src="./OnSave.js" />

<style lang="scss" scoped>
.run-procedure {
  display: grid;
  grid-template-columns: min-content 1fr;
}

.custom-tab {
  ::v-deep .q-tab__content,
  .self-stretch,
  .flex-center,
  .relative-position,
  .q-anchor--skip,
  .non-selectable,
  .column {
    padding-right: 12px;
  }
}

::v-deep .q-tab-panel {
  padding: 1px !important;
}

.div-lottie {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.lottie {
  width: 300px;
  height: 300px;
  background: transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
